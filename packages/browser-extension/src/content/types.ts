export function isHTMLElement(node: Node): node is HTMLElement {
  return node instanceof HTMLElement;
}

export type ParsedNode = {
  text: string;
  isHeading?: boolean;
};

export type Metadata = {
  recipeName: string | undefined;
  description: string[];
  descriptionTab?: number;
  source: {
    label: string;
    href: string;
  };
  timing: { label: string; duration: number }[];
  timingTab?: number;
  serves: string[];
  servesTab?: number;
  imageUrl: string;
};

export interface SendToPopup {
  action: "sendToPopup";
  data: {
    ingredients: ParsedNode[][];
    method: ParsedNode[][];
    notes: ParsedNode[][];
    metadata: Metadata;
  };
}
