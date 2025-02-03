export default function findContainerNodes(
  topicHeadings: HTMLElement[],
): HTMLElement[] {
  const containerNodes = topicHeadings
    .map((heading) => {
      const initialText = heading.innerText;
      return findContainerNode(heading, initialText);
    })
    .filter((e) => e instanceof HTMLElement);
  return containerNodes;
}

function findContainerNode(
  heading: HTMLElement,
  initialText: string,
): HTMLElement | undefined {
  const parent = heading.parentElement;
  if (!parent || parent === document.documentElement) return undefined;
  if (parent.innerText === initialText) {
    console.log("Recurring");
    return findContainerNode(parent, initialText);
  }
  console.log("about to return parent:", parent.innerText);
  return parent;
}
