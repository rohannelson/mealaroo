export default function findKeyElements(parentNodes: HTMLElement[]) {
  for (let parentNode of parentNodes) {
    const walker = createWalker(parentNode);
    traverse(walker);
  }
}

function traverse(walker: TreeWalker) {
  if (walker.currentNode.nodeType !== Node.TEXT_NODE) {
    console.log("walker node:", walker.currentNode);
    const next = walker.nextSibling();
    if (next) {
      return traverse(walker);
    } else {
      const next = walker.parentNode();
      if (next) {
        return traverse(walker);
      } else return;
    }
  } else {
    console.log("walker node", walker.currentNode);
  }
}

function createWalker(parentNode: HTMLElement) {
  return document.createTreeWalker(
    parentNode,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          ["LI", "P", "H1", "H2", "H3", "H4", "H5", "H6"].includes(
            (node as Element).tagName,
          )
        ) {
          return NodeFilter.FILTER_ACCEPT;
        }
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim() !== "") {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      },
    },
  );
}
