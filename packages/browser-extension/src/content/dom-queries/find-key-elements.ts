export default function findKeyElements(parentNodes: HTMLElement[]) {
  const selectedNodesArray: Node[][] = [];
  for (let parentNode of parentNodes) {
    let selectedNodes: Node[] = [];
    traverseNodes(parentNode, selectedNodes);
    selectedNodesArray.push(selectedNodes);
  }
  return selectedNodesArray;
}

function traverseNodes(node: Node, selectedNodes: Node[]) {
  if (node.nodeType === Node.TEXT_NODE) {
    selectedNodes.push(node);
    return;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const tag = (node as HTMLElement).tagName;

    if (["LI", "P", "H1", "H2", "H3", "H4", "H5", "H6"].includes(tag)) {
      selectedNodes.push(node);
      return; // Don't go deeper inside these elements
    }

    for (let child of node.childNodes) {
      traverseNodes(child, selectedNodes);
    }
  }
}
