<script lang="ts">
  import type { Metadata } from "../content/types";
  import NavButtons from "./NavButtons.svelte";

  const { metadata }: { metadata: Metadata | undefined } = $props();
  let descrTab = $state(1);
  let servesTab = $state(1);
</script>

<div class="flex flex-col gap-1 mt-3">
  {#if metadata?.recipeName}
    <div class="flex flex-col justify-center gap-2 mb-2">
      <div class="flex">
        <div>
          <h4 class="font-semibold">Name</h4>
          <p>{metadata.recipeName}</p>
        </div>
        {#if metadata?.imageUrl && metadata.imageUrl.length > 0}
          <img
            src={metadata.imageUrl}
            alt="recipe thumbnail"
            class="ml-auto max-w-24 h-auto"
          />
        {/if}
      </div>
    </div>
  {/if}
  {#if metadata?.description?.[0]}
    <div class="flex flex-col justify-center gap-2 mb-2">
      <div class="grid grid-cols-3">
        <h4 class="font-semibold mt-1">Description</h4>
        <div class="col-span-2">
          <NavButtons bind:tab={descrTab} data={metadata.description} />
        </div>
      </div>
      <p>
        {metadata.description[descrTab - 1].length > 200
          ? `${metadata.description[descrTab - 1].substring(0, 200)}...`
          : metadata.description[descrTab - 1]}
      </p>
    </div>
  {/if}
  {#if metadata?.source}
    <div class="flex flex-col justify-center gap-2 mb-2">
      <h4 class="font-semibold">Source</h4>
      <p>
        <a class="link" href={metadata.source.href}>{metadata.source.label}</a>
      </p>
    </div>
  {/if}
{#if metadata?.timing}
  <div class="flex flex-col justify-center gap-2 mb-2">

    {#if metadata.timing.prepTime !== undefined}
      <h4 class="font-semibold">Prep Time</h4>
      <p>{metadata.timing.prepTime} min</p>
    {/if}

    {#if metadata.timing.cookTime !== undefined}
      <h4 class="font-semibold">Cook Time</h4>
      <p>{metadata.timing.cookTime} min</p>
    {/if}

    {#if metadata.timing.totalTime !== undefined}
      <h4 class="font-semibold">Total Time</h4>
      <p>{metadata.timing.totalTime} min</p>
    {/if}

  </div>
{/if}

  {#if metadata?.serves?.[0]}
    <div class="flex flex-col justify-center gap-2 mb-2">
      <div class="grid grid-cols-3">
        <h4 class="font-semibold mt-1">Serves</h4>
        <div class="col-span-2">
          <NavButtons bind:tab={servesTab} data={metadata.serves} />
        </div>
      </div>
      <p>
        {metadata.serves}
      </p>
    </div>
  {/if}
</div>
