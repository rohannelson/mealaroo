import { trpc } from "api";

const user = await trpc.userById.query("d81bb4fd-9a6a-4905-bcfc-bdc6edaa66f3");
console.log("user:", user);
const createdUser = await trpc.userCreate.mutate({
  familyId: "8f6c274e-82d2-4a59-a3f6-6a9c73093f25",
  name: "Bobby",
  email: "Bobby@bobby.com",
});
console.log("Created User: ", createdUser);
