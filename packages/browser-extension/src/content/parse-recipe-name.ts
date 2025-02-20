export default function parseRecipeName() {
  const headingNode = document.querySelector("h1");
  return headingNode?.innerText;
}
