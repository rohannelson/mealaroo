import { trpc } from "api";

const user = await trpc.userById.query(4);
console.log("user:", user);
const createdUser = await trpc.userCreate.mutate({
  name: "Bobby",
  age: 64,
  email: "Bobby@bobby.com",
});
console.log("Created User: ", createdUser);
