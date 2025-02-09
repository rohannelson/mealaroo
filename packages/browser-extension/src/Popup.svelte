<script lang="ts">
  import browser from "webextension-polyfill";

  import { isType } from "./utils";
  import Topic from "./components/Topic.svelte";
  import type { TopicData } from "./types";
  import LightDarkToggle from "./components/LightDarkToggle.svelte";
  import type { SendToPopup } from "./content/types";

  async function handleClick() {
    console.log("clicked");
    const activeTab = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const activeTabId = activeTab[0].id;
    if (activeTabId) {
      console.log("activeTabId: ", activeTabId);
      browser.tabs
        .sendMessage(activeTabId, { action: "scrapeHTML", data: 0 })
        .catch((error) => {
          console.error("error scraping html:", error);
        });
    }
  }

  let ingredients: TopicData = $state();
  let method: TopicData = $state();
  browser.runtime.onMessage.addListener((message: unknown): undefined => {
    if (isType<SendToPopup>(message)) {
      if (message.action === "sendToPopup") {
        ingredients = message.data.ingredients;
        method = message.data.method;
      }
    }
  });
</script>

<main class="p-5 flex flex-col gap-2">
  <div class="flex items-center">
    <h1 class="text-2xl font-bold">Mealaroo</h1>
    <LightDarkToggle />
  </div>
  <button
    id="scrapeButton"
    type="button"
    onclick={handleClick}
    class="btn btn-primary">Scrape Recipe</button
  >
  <div class="flex-col gap-1 mt-2">
    {#if ingredients || method}
      <div class="card card-md bg-base-200 shadow-sm">
        <div class="card-body pt-4 px-5">
          <h2 class="card-title">Scraping Results</h2>
          <Topic data={ingredients} heading={"Ingredients"} />
          <div class="divider mt-1 mb-0.5"></div>
          <Topic data={method} heading={"Method"} />
        </div>
      </div>{/if}
  </div>
</main>
