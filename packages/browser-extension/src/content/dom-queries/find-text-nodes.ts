export default function findTextNodes(parentNodes: HTMLElement[]) {
  const textNodesArray: Node[][] = [];
  for (let parentNode of parentNodes) {
    const textNodes: Node[] = [];
    pushTextNodes(parentNode, textNodes);
    textNodesArray.push(textNodes);
  }
  return textNodesArray;
}

function pushTextNodes(node: Node, textNodes: Node[]) {
  if (
    node.nodeType === Node.TEXT_NODE &&
    (node?.nodeValue?.trim()?.length ?? 0) > 0
  ) {
    textNodes.push(node);
  } else {
    node.childNodes.forEach((node) => pushTextNodes(node, textNodes));
  }
}
