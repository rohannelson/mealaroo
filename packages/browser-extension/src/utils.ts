export function isType<T>(message: unknown): message is T {
  return typeof message === "object" && message !== null && "action" in message;
}
