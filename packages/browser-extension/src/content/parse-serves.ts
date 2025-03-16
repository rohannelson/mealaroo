export default function parseServes() {
  const htmlElements = document.querySelectorAll(
    "[class*='servings'],[class*='serves'],[class*='serving']",
  );
  console.log("htmlElements", htmlElements);
  return Array.from(htmlElements)
    .filter((el): el is HTMLElement => el instanceof HTMLElement)
    .map((el) => el.innerText);

  //if no matches, try text blocks that just contain the word serves?
}
