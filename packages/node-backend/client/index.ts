import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const apiUrl = process.env.API_URL ?? "http://localhost:3000";
console.log(apiUrl);
export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: apiUrl,
    }),
  ],
});
export type Trpc = typeof trpc;
