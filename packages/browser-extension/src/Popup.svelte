<script lang="ts">
  import browser from "webextension-polyfill";

  import { isType } from "./utils";
  import Topic from "./components/Topic.svelte";
  import type { TopicData } from "./types";
  import LightDarkToggle from "./components/LightDarkToggle.svelte";
  import type { Metadata, SendToPopup } from "./content/types";
  import LeftArrow from "./icons/LeftArrow.svelte";
  import RightArrow from "./icons/RightArrow.svelte";
  import MetadataTab from "./components/MetadataTab.svelte";

  async function handleClick() {
    const activeTab = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const activeTabId = activeTab[0].id;
    if (activeTabId) {
      browser.tabs
        .sendMessage(activeTabId, { action: "scrapeHTML", data: 0 })
        .catch((error) => {
          console.error("error scraping html:", error);
        });
    }
  }

  let ingredients: TopicData = $state();
  let method: TopicData = $state();
  let notes: TopicData = $state();
  let metadata: Metadata | undefined = $state();
  browser.runtime.onMessage.addListener((message: unknown): undefined => {
    if (isType<SendToPopup>(message)) {
      if (message.action === "sendToPopup") {
        ingredients = message.data.ingredients;
        method = message.data.method;
        console.log("before notes set", notes);
        notes = message.data.notes;
        console.log("notes set: ", notes);
        metadata = message.data.metadata;
      }
    }
  });

  let tab = $state(2);
  const tabHeadings = ["Ingredients", "Method", "Notes", "Metadata"];
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
                ><LeftArrow class="h-5 w-5 fill-primary-content" />{tabHeadings[
                  tab - 1
                ]}</button
              >
            {/if}
            <h2 class="card-title mx-auto mb-2">
              {tabHeadings[tab]}
            </h2>
            {#if tab < tabHeadings.length - 1}
              <button
                class="btn btn-secondary btn-sm p-2 absolute right-0"
                onclick={() => (tab += 1)}
                >{tabHeadings[tab + 1]}<RightArrow
                  class="h-5 w-5 fill-primary-content"
                /></button
              >
            {/if}
          </div>
          {#if tab === 0}
            <Topic data={ingredients} />
          {:else if tab === 1}
            <Topic data={method} />
          {:else if tab === 2}
            <Topic data={notes} />
          {:else if tab === 3}
            <MetadataTab {metadata} />
          {/if}
        </div>
      </div>
    {/if}
  </div>
</main>
