<script lang='ts'>
  import browser from "webextension-polyfill";
  import type { SendToPopup } from "./content/index";
  import { isType } from "./utils";
  import Topic from "./Topic.svelte";
  import type { TopicData } from "./types";

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

let ingredients: TopicData = $state()
let method: TopicData = $state()
browser.runtime.onMessage.addListener((message: unknown): undefined => {
  if (isType<SendToPopup>(message)) {
  if (message.action === "sendToPopup") {
    ingredients = message.data.ingredients
    method = message.data.method
  }}
});
</script>

<main class="p-6">
    <h1 class=" prose-2xl">Mealaroo</h1>
    <button id="scrapeButton" type="button" onclick={handleClick} class="border border-amber-600 rounded-md p-1 text-sm font-semibold hover:bg-amber-600 hover:text-white z-auto pointer-events-auto">Scrape Recipe</button>
    {#if (ingredients || method)}<h2 class="text-xl font-bold">Scraping Results</h2>{/if}
    <Topic data={ingredients} heading={"Ingredients"}/>
    <Topic data={method} heading={"Method"}/>
  </main> 