export default function removeCommentNodes(parentNodes: HTMLElement[]) {
  for (let parentNode of parentNodes) {
    const walker = document.createTreeWalker(
      parentNode,
      NodeFilter.SHOW_COMMENT,
    );

    const comments = [];

    while (walker.nextNode()) {
      comments.push(walker.currentNode);
    }
    comments.forEach((comment) => comment?.parentNode?.removeChild(comment));
  }
}
