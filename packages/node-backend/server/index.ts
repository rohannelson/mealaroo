import { router } from "./trpc";
import { userList, userById, userCreate } from "./accounts";
import { recipeCreate } from "./recipes";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
const appRouter = router({
  userList,
  userById,
  userCreate,
  recipeCreate,
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
