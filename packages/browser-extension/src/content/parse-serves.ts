export default function parseServes(keyNodes: Node[][]): string[] {
  const htmlElements = document.querySelectorAll(
    "[class*='servings'],[class*='serves']",
  );
  console.log("htmlElements", htmlElements);
  if (htmlElements.length > 0) {
    return Array.from(htmlElements)
      .filter((el): el is HTMLElement => el instanceof HTMLElement)
      .map((el) => el.innerText);
  } else {
    console.log("keyNodes", keyNodes.flat());
  }
  //if no matches, try text blocks that just contain the word serves?
  const servesNodes: string[] = [];
  for (const node of keyNodes.flat()) {
    if (node.textContent) {
      new RegExp(`^serv`, "i").test(node.textContent.trim()) &&
        servesNodes.push(node.textContent);
    }
  }
  return [...new Set(servesNodes)];
}
