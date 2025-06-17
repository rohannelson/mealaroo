import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { schema, accounts, families } from "./schema";

export const db = drizzle(process.env.DATABASE_URL!, { schema });

async function main() {
  const family: typeof families.$inferInsert & { id: string } = {
    id: "8f6c274e-82d2-4a59-a3f6-6a9c73093f25",
  };

  const user: typeof accounts.$inferInsert = {
    id: "d81bb4fd-9a6a-4905-bcfc-bdc6edaa66f3",
    name: "John",
    email: "john@example.com",
    familyId: family.id,
  };

  await db.insert(families).values(family).onConflictDoNothing();
  console.log("New family created!");

  await db
    .insert(accounts)
    .values(user)
    .onConflictDoUpdate({ target: accounts.id, set: { name: user.name } });
  console.log("New user created!");

  const users = await db.select().from(accounts);
  console.log("Getting all users from the database: ", users);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(accounts)
    .set({
      name: "Joe",
    })
    .where(eq(accounts.email, user.email));
  console.log("User info updated!");
}

main();
