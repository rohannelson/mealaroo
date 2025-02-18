<script lang="ts">
  import browser from "webextension-polyfill";

  import { isType } from "./utils";
  import Topic from "./components/Topic.svelte";
  import type { Tabs, TopicData } from "./types";
  import LightDarkToggle from "./components/LightDarkToggle.svelte";
  import type { SendToPopup } from "./content/types";
  import LeftArrow from "./icons/LeftArrow.svelte";
  import RightArrow from "./icons/RightArrow.svelte";

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

  let tab = $state(0);
  const tabs: Tabs = $derived([
    { heading: "Ingredients", component: Topic, props: { data: ingredients } },
    { heading: "Method", component: Topic, props: { data: method } },
  ]);
  const Tab = $derived(tabs[tab].component);
  const props = $derived(tabs[tab].props);
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
          <div class="flex justify-content relative">
            {#if tab > 0}
              <button
                class="btn btn-secondary btn-sm p-2 absolute left-0"
                onclick={() => (tab -= 1)}
                ><LeftArrow class="h-5 w-5 fill-primary-content" />{tabs[
                  tab - 1
                ].heading}</button
              >
            {/if}
            <h2 class="card-title mx-auto mb-2">
              {tabs[tab].heading}
            </h2>
            {#if tab < tabs.length - 1}
              <button
                class="btn btn-secondary btn-sm p-2 absolute right-0"
                onclick={() => (tab += 1)}
                >{tabs[tab + 1].heading}<RightArrow
                  class="h-5 w-5 fill-primary-content"
                /></button
              >
            {/if}
          </div>
          <Tab {...props} />
        </div>
      </div>
    {/if}
  </div>
</main>
