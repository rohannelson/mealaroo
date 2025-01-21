export function parseDivText(text: string) {
  const items = text.split("\n").filter((item) => item);
  return items;
}
