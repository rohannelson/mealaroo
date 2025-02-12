import { isHTMLElement, type ParsedNode } from "../types";

export function parseKeyNodes(nodesArrays: Node[][]) {
  const parsedNodes = nodesArrays.map((nodesArray) => {
    return nodesArray
      .map((node) => {
        if (isHTMLElement(node)) {
          const parsedElement: ParsedNode = { text: node.innerText };
          if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(node.tagName)) {
            parsedElement.isHeading = true;
          }
          return parsedElement;
        }
        return { text: node.nodeValue };
      })
      .filter((object): object is ParsedNode => !!object.text?.trim());
  });
  return parsedNodes;
}
