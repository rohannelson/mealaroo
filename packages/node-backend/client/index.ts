import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

const user = await trpc.userById.query(4);
console.log("user:", user);
const createdUser = await trpc.userCreate.mutate({
  name: "sachinraja",
  age: 61,
  email: "string@string.com",
});
console.log("Created User: ", createdUser);
