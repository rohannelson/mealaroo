browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scrapeHTML") {
    const ingredients = parseTopic("ingredient");
    console.log("Ingredients:", ingredients);
  }
});

function parseTopic(topic) {
  console.log(`Parsing ${topic}`);
  const headings = Array.from(
    document.querySelectorAll("h1, h2, h3, h4, h5, h6")
  );

  const topicHeading = headings.find((heading) =>
    new RegExp(`^${topic}.*`, "i").test(heading.textContent)
  );
  console.log(`topic headings`, topicHeading);

  if (!topicHeading) {
    console.warn(`No heading with '${topic}' found.`);
    return [];
  }

  function findChildList(node) {
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

  function findListItems() {
    const itemsNodeList = childList.querySelectorAll("li");
    console.log("itemsNodeList", itemsNodeList);
    const listItems = Array.from(itemsNodeList).map((item) =>
      item.textContent.trim()
    );
    return listItems;
  }
  const listItems = findListItems();
  return listItems;
}
