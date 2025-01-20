import findChildElements from "./find-child-elements";
import findListItems from "./find-list-items";
import { findTopicHeadings } from "./find-topic-headings";

export default function parseIngredients() {
  const topic = "ingredient";
  console.log(`Parsing ${topic}`);

  const topicHeadings = findTopicHeadings(topic);

  const childElements = findChildElements(topicHeadings, [
    { selector: "ul", all: true },
    { selector: "p", all: true },
    { selector: "div" },
  ]);

  console.log(`${topic} list`, childElements);

  const childItems = childElements.map((childItem: Element) => {
    if (childItem.tagName === "UL") {
      return findListItems(childItem);
    } else if (childItem.tagName === "P") {
      console.log("found p"); //handle if p
    } else if (childItem.tagName === "DIV") {
      console.log("found div"); //handle if div
    } else {
      console.log(childItem.tagName, "not handled");
    }
  });
  return childItems;
}
