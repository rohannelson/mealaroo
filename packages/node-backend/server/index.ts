import { db } from "../db";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
const appRouter = router({
  userList: publicProcedure.query(async () => {
    // Retrieve users from a datasource, this is an imaginary database
    const users = await db.query.users.findMany();

    return users;
  }),
  userById: publicProcedure.input(z.number()).query(async ({ input }) => {
    // Retrieve the user with the given ID
    const user = await db.query.users.findFirst({
      where: eq(usersTable.id, input),
    });

    return user;
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string(), age: z.number(), email: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      // Create a new user in the database
      const user = await db
        .insert(usersTable)
        .values({ name: input.name, age: input.age, email: input.email });
      return user;
    }),
});
// Export type router type signature,
// NOT the router itself.
const server = createHTTPServer({
  router: appRouter,
});

const port = parseInt(process.env.PORT ?? "3000");
const host = process.env.HOST ?? "0.0.0.0";

server.listen(port, host);
console.log(`tRPC server is running on http://${host}:${port}`);

export type AppRouter = typeof appRouter;
