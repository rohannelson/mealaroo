export function findTopicHeadings(topic: string | string[]) {
  const headings = Array.from(
    document.querySelectorAll("h1, h2, h3, h4, h5, h6")
  );

  const topicHeadings = headings.filter((heading) =>
    new RegExp(
      `^${Array.isArray(topic) ? topic.join("|") : topic}.*`,
      "i"
    ).test(heading?.textContent ?? "")
  );

  if (!topicHeadings[0]) {
    console.warn(`No heading with '${topic}' found.`);
    return [];
  }
  return topicHeadings;
}
