import { db } from "../db";
import { z } from "zod";
import { publicProcedure } from "./trpc";
import { accounts } from "../db/schema";
import { eq } from "drizzle-orm";

export const userList = publicProcedure.query(async () => {
  // Retrieve users from a datasource, this is an imaginary database
  const userAccounts = await db.query.accounts.findMany();

  return userAccounts;
});

export const userById = publicProcedure
  .input(z.string())
  .query(async ({ input }) => {
    // Retrieve the user with the given ID
    const user = await db.query.accounts.findFirst({
      where: eq(accounts.id, input),
    });

    return user;
  });

export const userCreate = publicProcedure
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
      })
      .onConflictDoNothing()
      .returning();
    return user;
  });
