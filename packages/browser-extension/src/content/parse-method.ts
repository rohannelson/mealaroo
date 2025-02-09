import mergeAdjacentTextNodes from "./dom-mutations/merge-adjacent-text-nodes";
import removeCommentNodes from "./dom-mutations/strip-comments";
import findContainerElements from "./dom-queries/find-container-elements";
import findKeyNodes from "./dom-queries/find-key-nodes";
import { findTopicHeadings } from "./dom-queries/find-topic-headings";
import { parseKeyNodes } from "./parsing/parse-key-nodes";

export default function parseMethod() {
  const topic = ["preparation", "method", "instructions", "directions"];
  console.log(`Parsing ${topic}`);

  const topicHeadings = findTopicHeadings(topic);

  const containerElements = findContainerElements(topicHeadings);

  removeCommentNodes(containerElements);

  mergeAdjacentTextNodes(containerElements);

  const keyNodes = findKeyNodes(containerElements);
  console.log("keyElements:", keyNodes);

  const parsedNodes = parseKeyNodes(keyNodes);

  return parsedNodes;
}
