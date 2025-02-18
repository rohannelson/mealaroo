import type { Component } from "svelte";
import type { ParsedNode } from "./content/types";

export type TopicData = ParsedNode[][] | null | undefined;
export type Tabs = {
  heading: string;
  component: Component<{ data: TopicData }>;
  props: { data: TopicData };
}[];
