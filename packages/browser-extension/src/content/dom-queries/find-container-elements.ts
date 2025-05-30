export default function findContainerElements(
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
    return findContainerNode(parent, initialText);
  }
  return parent;
}
