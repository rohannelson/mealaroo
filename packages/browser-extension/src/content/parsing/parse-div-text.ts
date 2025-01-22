export function parseDivText(text: string) {
  const items = text
    .split("\n")
    .filter((item) => item)
    .map((val) => {
      return { text: val };
    });
  return items;
}
