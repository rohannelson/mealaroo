import { trpc } from "api";

const user = await trpc.userById.query(4);
console.log("user:", user);
const createdUser = await trpc.userCreate.mutate({
  name: "Bobbo",
  age: 63,
  email: "Bobbo@bobbo.com",
});
console.log("Created User: ", createdUser);
