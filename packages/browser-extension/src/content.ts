//Don't import anything into your content script (I think? I think it's related to the rollup options...)

export interface SendToPopup {
  action: "sendToPopup";
  data: string[][];
}

browser.runtime.onMessage.addListener((message): undefined => {
  if (isType<Record<"action", "scrapeHTML">>(message)) {
    const ingredients = parseTopic("ingredient");
    console.log("Ingredients:", ingredients);
    browser.runtime.sendMessage({ action: "sendToPopup", data: ingredients });
  }
});

function parseTopic(topic: string) {
  console.log(`Parsing ${topic}`);
  const headings = Array.from(
    document.querySelectorAll("h1, h2, h3, h4, h5, h6")
  );

  const topicHeadings = headings.filter((heading) =>
    new RegExp(`^${topic}.*`, "i").test(heading?.textContent ?? "")
  );
  console.log(`topic headings`, topicHeadings);

  if (!topicHeadings[0]) {
    console.warn(`No heading with '${topic}' found.`);
    return [];
  }

  function findChildList(node: Element) {
    let parent = node.parentElement;
    if (!parent || parent === document.documentElement) return;
    const childList = parent.querySelector("ul");
    if (!childList) {
      return findChildList(parent);
    } else {
      return childList;
    }
  }
  const childLists = topicHeadings
    .map((topicHeading) => findChildList(topicHeading))
    .filter((val) => val !== undefined);

  console.log(`${topic} list`, childLists);

  function findListItems(childList: HTMLUListElement) {
    const itemsNodeList = childList.querySelectorAll("li");
    console.log("itemsNodeList", itemsNodeList);
    const listItems = Array.from(itemsNodeList)
      .map((item) => item.textContent?.trim())
      .filter((val) => val !== undefined);
    return listItems;
  }
  const listItems = childLists.map((childList) => findListItems(childList));
  return listItems;
}

//Reused code
function isType<T>(message: unknown): message is T {
  return typeof message === "object" && message !== null && "action" in message;
}
