import type { ParsedNode } from "./content/types";

export type TopicData = ParsedNode[][] | null | undefined;
export type Tabs = { heading: string; data: () => TopicData }[];
