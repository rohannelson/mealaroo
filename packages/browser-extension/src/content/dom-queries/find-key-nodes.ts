export default function findKeyNodes(parentNodes: HTMLElement[]) {
  const selectedNodesArray: Node[][] = [];
  for (let parentNode of parentNodes) {
    let selectedNodes: Node[] = [];
    traverseNodes(parentNode, selectedNodes);
    selectedNodesArray.push(selectedNodes);
  }
  return selectedNodesArray;
}

function traverseNodes(node: Node, selectedNodes: Node[]) {
  if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "") {
    selectedNodes.push(node);
    return;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const tag = (node as HTMLElement).tagName;
    const className = (node as HTMLElement).className;

    if (["HEADER", "FOOTER"].includes(tag)) {
      console.log("keyNodes, skip header/footer");
      return;
    }

    if (
      ["sidebar", "newsletter", "ad", "subscribe", "promo", "comments"].some(
        (term) => new RegExp(`\\b${term}\\b`).test(className),
      )
    ) {
      //console.log("node filtered", node);
      return;
    }

    if (["LI", "P", "H1", "H2", "H3", "H4", "H5", "H6"].includes(tag)) {
      selectedNodes.push(node);
      return; // Don't go deeper inside these elements
    }

    for (let child of node.childNodes) {
      traverseNodes(child, selectedNodes);
    }
  }
}
