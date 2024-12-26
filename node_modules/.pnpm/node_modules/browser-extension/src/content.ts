export interface SendToPopup {
  action: "sendToPopup";
  data: string[];
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "scrapeHTML") {
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

  const topicHeading = headings.find((heading) =>
    new RegExp(`^${topic}.*`, "i").test(heading?.textContent ?? "")
  );
  console.log(`topic headings`, topicHeading);

  if (!topicHeading) {
    console.warn(`No heading with '${topic}' found.`);
    return [];
  }

  function findChildList(node: Element) {
    let parent = node.parentElement;
    if (!parent || parent === document.documentElement) return [];
    const childList = parent.querySelector("ul");
    if (!childList) {
      return findChildList(parent);
    } else {
      return childList;
    }
  }
  const childList = findChildList(topicHeading);

  console.log(`${topic} list`, childList);

  function findListItems(childList: HTMLUListElement) {
    const itemsNodeList = childList.querySelectorAll("li");
    console.log("itemsNodeList", itemsNodeList);
    const listItems = Array.from(itemsNodeList).map((item) =>
      item.textContent?.trim()
    );
    return listItems;
  }
  if (childList instanceof HTMLUListElement) {
    const listItems = findListItems(childList);
    return listItems;
  }
}
