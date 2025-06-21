export function isHTMLElement(node: Node): node is HTMLElement {
  return node instanceof HTMLElement;
}

export type ParsedNode = {
  text: string;
  isHeading?: boolean;
};

export type Metadata = {
  recipeName: string;
  description: string[];
  descriptionTab: number;
  source: {
    label: string;
    href: string;
  };
  timing: { totalTime?: number; prepTime?: number; cookTime?: number };
  serves: string[];
  servesTab: number;
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
