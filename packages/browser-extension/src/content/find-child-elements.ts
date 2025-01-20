//Something here isn't quite right...

type PreferredSelectors = { selector: string; all?: boolean }[];

export default function findChildElements(
  topicHeadings: Element[],
  elementTypes: string | PreferredSelectors
): Element[] {
  const childElements = topicHeadings
    .map((topicHeading) => {
      return findSubElements(topicHeading as HTMLElement);
    }) // Not sure how to parse at this point.
    .filter((val) => val !== undefined);
  return childElements.flat();

  //handle string ElementType
  function findSubElements(node: HTMLElement): Element[] {
    const parent = node.parentElement;
    if (!parent || parent === document.documentElement) return [];
    const subElements =
      typeof elementTypes === "string"
        ? [parent.querySelector(elementTypes)].filter((e) => e !== null)
        : findPreferredSubElements(elementTypes, parent);
    if (!subElements) {
      return findSubElements(parent);
    } else {
      console.log("subElements", subElements);
      return subElements;
    }
  }
  //handle Array of ElementTypes
  function findPreferredSubElements(
    elementTypes: PreferredSelectors,
    parent: HTMLElement
  ): Element[] {
    for (let elementType of elementTypes) {
      console.log("querying element type", elementType);
      const subElements = elementType.all
        ? Array.from(parent.querySelectorAll(elementType.selector))
        : [parent.querySelector(elementType.selector)];
      const elements = subElements.filter((e) => e !== null);
      //Should add a typeGuard...
      return elements; //NEED TO ADD A CHECK TO SEE IF OUTPUT IS VALID/DESIRED
    }
    return []; // just keeping TypeScript happy...
  }
}
