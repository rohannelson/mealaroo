import findChildElements from "./dom-queries/find-child-elements";
import findListItems from "./dom-queries/find-list-items";
import { findTopicHeadings } from "./dom-queries/find-topic-headings";
import { parseDivText } from "./parsing/parse-div-text";

export default function parseIngredients(): {
  text: string;
  isHeading?: boolean;
}[][] {
  const topic = "ingredient";
  console.log(`Parsing ${topic}`);

  const topicHeadings = findTopicHeadings(topic);

  const childElements = findChildElements(topicHeadings, [
    { selector: "ul", all: true },
    { selector: "p", all: true },
    { selector: "p", all: true },
    { selector: "div" },
  ]);

  console.log(`${topic} list`, childElements);

  const childItems = childElements.map(
    (childItem: HTMLElement): { text: string }[] => {
      if (childItem.tagName === "UL") {
        return findListItems(childItem);
      } else if (childItem.tagName === "P") {
        console.log("found p"); //handle if p
        return [];
      } else if (childItem.tagName === "DIV") {
        return parseDivText(childItem.innerText);
      } else {
        console.log(childItem.tagName, "not handled");
        return [];
      }
    }
  );
  return childItems;
}
