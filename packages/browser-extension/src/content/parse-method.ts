import findChildElements from "./dom-queries/find-child-elements";
import findListItems from "./dom-queries/find-list-items";
import { findTopicHeadings } from "./dom-queries/find-topic-headings";
import { parseDivText } from "./parsing/parse-div-text";

export default function parseMethod() {
  const topic = ["preparation", "method", "instructions", "directions"];
  console.log(`Parsing ${topic}`);

  const topicHeadings = findTopicHeadings(topic);

  const childLists = findChildElements(topicHeadings, [
    { selector: "ol", all: true },
    { selector: "ul", all: true },
    { selector: "p", all: true },
    { selector: "div" },
  ]);

  console.log(`${topic} list`, childLists);

  const listItems = childLists.map(
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
    },
  );
  return listItems;
}
