//Succesfully returning inner text from div with <br/>

type PreferredSelectors = { selector: string; all?: boolean }[];

export default function findChildElements(
  topicHeadings: HTMLElement[],
  elementTypes: string | PreferredSelectors,
) {
  const childElements = topicHeadings
    .map((topicHeading) => {
      return findSubElements(topicHeading, topicHeading.innerText);
    })
    .filter((val) => val !== undefined);
  return childElements.flat();

  //handle string ElementType
  function findSubElements(
    node: HTMLElement,
    headingInnerText: string,
  ): HTMLElement[] {
    const parent = node.parentElement;
    if (!parent || parent === document.documentElement) return [];
    const subElements =
      typeof elementTypes === "string"
        ? [parent.querySelector(elementTypes)].filter(
            (e) => e instanceof HTMLElement,
          )
        : findPreferredSubElements(elementTypes, parent, headingInnerText);
    if (!subElements[0]) {
      return findSubElements(parent, headingInnerText);
    } else {
      console.log("returning subElements", subElements);
      return subElements;
    }
  }
  //handle Array of ElementTypes
  function findPreferredSubElements(
    elementTypes: PreferredSelectors,
    parent: HTMLElement,
    headingInnerText: string,
  ): HTMLElement[] {
    for (let elementType of elementTypes) {
      //console.log("querying element type", elementType);
      const subElements = elementType.all
        ? Array.from(parent.querySelectorAll(elementType.selector))
        : [parent.querySelector(elementType.selector)];
      const elements = subElements.filter((e) => e instanceof HTMLElement);
      if (elements[0] && elements[0].innerText !== headingInnerText)
        return elements;
    }
    return [];
  }
}
