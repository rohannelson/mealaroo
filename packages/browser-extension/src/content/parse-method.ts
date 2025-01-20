import findChildElements from "./find-child-elements";
import findListItems from "./find-list-items";
import { findTopicHeadings } from "./find-topic-headings";

export default function parseMethod() {
  const topic = ["preparation", "method", "instructions", "directions"];
  console.log(`Parsing ${topic}`);

  const topicHeadings = findTopicHeadings(topic);

  const childLists = findChildElements(topicHeadings, "ol, ul");

  console.log(`${topic} list`, childLists);

  const listItems = childLists.map((childList: Element) =>
    findListItems(childList)
  );
  return listItems;
}
