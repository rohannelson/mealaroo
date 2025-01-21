export default function findListItems(childList: HTMLElement) {
  const itemsNodeList = childList.querySelectorAll("li");
  const listItems = Array.from(itemsNodeList)
    .map((item) => item.textContent?.trim())
    .filter((val) => val !== undefined);
  return listItems;
}
