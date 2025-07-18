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
  import { trpc } from "api";

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
  let ingredientsTab: number = $state(1);
  let method: TopicData = $state();
  let methodTab: number = $state(1);
  let notes: TopicData = $state();
  let notesTab: number = $state(1);
  let metadata: Metadata | undefined = $state();
  let isLoading: boolean = $state(false);
  browser.runtime.onMessage.addListener((message: unknown): undefined => {
    if (isType<SendToPopup>(message)) {
      if (message.action === "sendToPopup") {
        ingredients = message.data.ingredients;
        method = message.data.method;
        notes = message.data.notes;
        metadata = message.data.metadata;
      }
    }
  });

  let tab = $state(0);
  const tabHeadings = ["Ingredients", "Method", "Notes", "Metadata"];

  async function handleSubmit() {
    if (!ingredients || !metadata) {
      console.log('Missing data')
      return
    }
    try {
      isLoading = true;
      console.log('writing to db')
      const familyId = "8f6c274e-82d2-4a59-a3f6-6a9c73093f25";
      await trpc.recipeCreate.mutate({
        recipe: {
          familyId,
          recipeName: metadata.recipeName,
          description: metadata.description?.[metadata.descriptionTab],
          totalTime: metadata.timing?.totalTime ?? null,
          prepTime: metadata.timing?.prepTime ?? null,
          cookTime: metadata.timing?.cookTime ?? null,
          sourceLabel: metadata.source?.label,
          sourceUrl: metadata.source?.href,
          imageUrl: metadata?.imageUrl,
          method: method?.[methodTab]?.join("\n") ?? "",
          notes: notes?.[notesTab]?.join("\n") ?? "",
          serves: metadata.serves[metadata.servesTab],
        },
        ingredients: ingredients[ingredientsTab - 1],
      });
      isLoading = false
    } catch (error) {
      console.error(error)
      isLoading = false
    }
    }
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
            {#if tab === tabHeadings.length - 1}
              <button
                class="btn btn-accent btn-sm p-2 absolute right-0"
                disabled={isLoading}
                onclick={async () => {await handleSubmit()}}>
                {#if isLoading} Submitting... {:else} Submit {/if}
                </button
              >
            {/if}
          </div>
          {#if tab === 0}
            <Topic data={ingredients} bind:tab={ingredientsTab} />
          {:else if tab === 1}
            <Topic data={method} bind:tab={methodTab} />
          {:else if tab === 2}
            <Topic data={notes} bind:tab={notesTab} />
          {:else if tab === 3}
            <MetadataTab {metadata} />
          {/if}
        </div>
      </div>
    {/if}
  </div>
</main>
