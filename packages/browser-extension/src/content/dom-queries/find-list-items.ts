//Should probably distinguish between finding listItems and parsing them...
export default function findListItems(childList: HTMLElement) {
  const itemsNodeList = childList.querySelectorAll("li");
  const listItems = Array.from(itemsNodeList)
    .map((item) => {
      return { text: item.textContent?.trim() };
    })
    .filter((val): val is { text: string } => val.text !== undefined);
  return listItems;
}
