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

  const childLists = findChildElements(topicHeadings, "ul");

  console.log(`${topic} list`, childLists);

  const listItems = childLists.map((childList) => findListItems(childList));
  return listItems;
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

function findChildElements(topicHeadings: Element[], elementType: string) {
  function findChildElement(node: Element) {
    let parent = node.parentElement;
    if (!parent || parent === document.documentElement) return;
    const childList = parent.querySelector(elementType);
    if (!childList) {
      return findChildElement(parent);
    } else {
      return childList;
    }
  }
  const childElements = topicHeadings
    .map((topicHeading) => findChildElement(topicHeading))
    .filter((val) => val !== undefined);
  return childElements;
}

function findListItems(childList: Element) {
  const itemsNodeList = childList.querySelectorAll("li");
  console.log("itemsNodeList", itemsNodeList);
  const listItems = Array.from(itemsNodeList)
    .map((item) => item.textContent?.trim())
    .filter((val) => val !== undefined);
  return listItems;
}
