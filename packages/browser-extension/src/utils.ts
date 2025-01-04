//Sometimes code is copied and pasted into background.ts or content.ts - keep master version here and keep it up to date
export function isType<T>(message: unknown): message is T {
  return typeof message === "object" && message !== null && "action" in message;
}
