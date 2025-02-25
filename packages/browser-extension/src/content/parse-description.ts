//wprm-recipe-summary, description, summary, intro
export default function parseDescription() {
  const descriptionNodes = document.querySelectorAll(
    ".summary, .description, .wprm-recipe-summary, .intro",
  );
  const descriptions = Array.from(descriptionNodes)
    .filter((node): node is HTMLElement => node instanceof HTMLElement)
    .map((node) => node.innerText);
  return descriptions;
}
