//Don't import anything into your content script (I think? I think it's related to the rollup options...)

export interface SendToPopup {
  action: "sendToPopup";
  data: { ingredients: string[][]; method: string[][] };
}

browser.runtime.onMessage.addListener((message): undefined => {
  if (isType<Record<"action", "scrapeHTML">>(message)) {
    const ingredients = parseIngredients();
    const method = parseMethod();
    browser.runtime.sendMessage({
      action: "sendToPopup",
      data: { ingredients, method },
    });
  }
});

function parseIngredients() {
  const topic = "ingredient";
  console.log(`Parsing ${topic}`);

  const topicHeadings = findTopicHeadings(topic);

  const childElements = findChildElements(topicHeadings, [
    { selector: "ul", all: true },
    { selector: "p", all: true },
    { selector: "div" },
  ]);

  console.log(`${topic} list`, childElements);

  const childItems = childElements.map((childItem) => {
    if (childItem.tagName === "UL") {
      return findListItems(childItem);
    } else if (childItem.tagName === "P") {
      //handle if p
    } else if (childItem.tagName === "DIV") {
      //handle if div
    }
  });
  return childItems;
}

function parseMethod() {
  const topic = ["preparation", "method", "instructions", "directions"];
  console.log(`Parsing ${topic}`);

  const topicHeadings = findTopicHeadings(topic);

  const childLists = findChildElements(topicHeadings, "ol, ul");

  console.log(`${topic} list`, childLists);

  const listItems = childLists.map((childList) => findListItems(childList));
  return listItems;
}

//Reused code, update in utils if changing here.
function isType<T>(message: unknown): message is T {
  return typeof message === "object" && message !== null && "action" in message;
}

function findTopicHeadings(topic: string | string[]) {
  const headings = Array.from(
    document.querySelectorAll("h1, h2, h3, h4, h5, h6")
  );

  const topicHeadings = headings.filter((heading) =>
    new RegExp(
      `^${Array.isArray(topic) ? topic.join("|") : topic}.*`,
      "i"
    ).test(heading?.textContent ?? "")
  );
  console.log(`topic headings`, topicHeadings);

  if (!topicHeadings[0]) {
    console.warn(`No heading with '${topic}' found.`);
    return [];
  }
  return topicHeadings;
}

type PreferredSelectors = { selector: string; all?: boolean }[];

function findChildElements(
  topicHeadings: Element[],
  elementTypes: string | PreferredSelectors
): Element[] {
  const childElements = topicHeadings
    .map((topicHeading) => findSubElements(topicHeading as HTMLElement)) // Not sure how to parse at this point.
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
    if (!subElements || node.innerText === parent.innerText) {
      return findSubElements(parent);
    } else {
      return subElements;
    }
  }
  //handle Array of ElementTypes
  function findPreferredSubElements(
    elementTypes: PreferredSelectors,
    parent: HTMLElement
  ): Element[] {
    for (let elementType of elementTypes) {
      const subElements = elementType.all
        ? Array.from(parent.querySelectorAll(elementType.selector))
        : [parent.querySelector(elementType.selector)];
      const elements = subElements.filter((e) => e !== null);
      return elements;
    }
    return []; // just keeping TypeScript happy...
  }
}

function findListItems(childList: Element) {
  const itemsNodeList = childList.querySelectorAll("li");
  console.log("itemsNodeList", itemsNodeList);
  const listItems = Array.from(itemsNodeList)
    .map((item) => item.textContent?.trim())
    .filter((val) => val !== undefined);
  return listItems;
}
