export default function mergeAdjacentTextNodes(parentNodes: HTMLElement[]) {
  for (let parentNode of parentNodes) {
    const walker = document.createTreeWalker(
      parentNode,
      NodeFilter.SHOW_TEXT,
      null,
    );
    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    for (let i = 0; i < textNodes.length - 1; i++) {
      const current = textNodes[i];
      const next = textNodes[i + 1];

      if (current.nextSibling === next && next.nodeType === Node.TEXT_NODE) {
        if (current.textContent) current.textContent += next.textContent;
        next?.parentNode?.removeChild(next);
        textNodes.splice(i + 1, 1);
        i--; // Recheck the newly merged node
      }
    }
  }
}
