<script lang='ts'>
  import browser from "webextension-polyfill";
  import type { SendToPopup } from "./content/index";
  import { isType } from "./utils";
  import Topic from "./Topic.svelte";

  async function handleClick() {
  console.log("clicked");
  const activeTab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  const activeTabId = activeTab[0].id;
  if (activeTabId) {
    console.log("activeTabId: ", activeTabId);
    browser.tabs.sendMessage(activeTabId, { action: "scrapeHTML", data: 0 }).catch((error) => {console.error('error scraping html:', error)});
  }
}

let ingredients: string[][] | null | undefined = $state()
let method: string[][] | null | undefined = $state()
browser.runtime.onMessage.addListener((message: unknown): undefined => {
  if (isType<SendToPopup>(message)) {
  if (message.action === "sendToPopup") {
    ingredients = message.data.ingredients
    method = message.data.method
  }}
});
</script>

<main>
    <h1>Mealaroo</h1>
    <button id="scrapeButton" type="button" onclick={handleClick}>Scrape Recipe</button>
    <h2>Scraping Results</h2>
    <Topic data={ingredients} heading={"Ingredients"}/>
    <Topic data={method} heading={"Method"}/>
  </main> 