export default function parseRecipeName(): string {
  const headingNode = document.querySelector("h1");
  return headingNode?.innerText ?? "";
}
