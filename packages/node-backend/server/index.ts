import { db } from "../db";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { accounts } from "../db/schema";
import { eq } from "drizzle-orm";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
const appRouter = router({
  userList: publicProcedure.query(async () => {
    // Retrieve users from a datasource, this is an imaginary database
    const userAccounts = await db.query.accounts.findMany();

    return userAccounts;
  }),
  userById: publicProcedure.input(z.string()).query(async ({ input }) => {
    // Retrieve the user with the given ID
    const user = await db.query.accounts.findFirst({
      where: eq(accounts.id, input),
    });

    return user;
  }),
  userCreate: publicProcedure
    .input(
      z.object({ familyId: z.string(), name: z.string(), email: z.string() })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      // Create a new user in the database
      const user = await db
        .insert(accounts)
        .values({
          familyId: input.familyId,
          name: input.name,
          email: input.email,
        });
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
