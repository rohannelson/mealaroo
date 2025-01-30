export function findTopicHeadings(topic: string | string[]) {
  const headings = Array.from(
    document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
  );

  const topicHeadings = headings.filter((heading): heading is HTMLElement => {
    if (heading instanceof HTMLElement) {
      return new RegExp(
        `^${Array.isArray(topic) ? topic.join("|") : topic}.*`,
        "i",
      ).test(heading.innerText);
    }
    return false;
  });

  if (!topicHeadings[0]) {
    console.warn(`No heading with '${topic}' found.`);
    return [];
  }
  return topicHeadings;
}
