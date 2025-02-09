import { isHTMLElement } from "../types";

export function parseKeyNodes(nodesArrays: Node[][]) {
  const parsedNodes = nodesArrays.map((nodesArray) => {
    return nodesArray
      .map((node) => {
        if (isHTMLElement(node)) {
          return { text: node.innerText };
        }
        return { text: node.nodeValue };
      })
      .filter((object): object is { text: string } => !!object.text);
  });
  return parsedNodes;
}
