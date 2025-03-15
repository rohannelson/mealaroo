<script lang="ts">
  import type { Metadata } from "../content/types";
  import NavButtons from "./NavButtons.svelte";

  const { metadata }: { metadata: Metadata | undefined } = $props();
  let tab = $state(1);
</script>

<div class="flex flex-col gap-1 mt-3">
  {#if metadata?.recipeName}
    <div class="flex flex-col justify-center gap-2 mb-2">
      <h4 class="font-semibold">Name</h4>
      <p>{metadata.recipeName}</p>
    </div>
  {/if}
  {#if metadata?.description?.[0]}
    <div class="flex flex-col justify-center gap-2 mb-2">
      <h4 class="font-semibold">Description</h4>
      <NavButtons bind:tab data={metadata.description} />
      <p>
        {metadata.description[tab - 1].length > 200
          ? `${metadata.description[tab - 1].substring(0, 200)}...`
          : metadata.description[tab - 1]}
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
      {#each metadata.timing as timing}
        <h4 class="font-semibold">{timing.label}</h4>
        <p>{timing.duration} min</p>
      {/each}
    </div>
  {/if}
</div>
