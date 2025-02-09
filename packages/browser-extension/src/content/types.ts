export function isHTMLElement(node: Node): node is HTMLElement {
  return node instanceof HTMLElement;
}

export type ParsedNode = {
  text: string;
  isHeading?: boolean;
};

export interface SendToPopup {
  action: "sendToPopup";
  data: { ingredients: ParsedNode[][]; method: ParsedNode[][] };
}
