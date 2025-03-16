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
      <h4 class="font-semibold">Name</h4>
      <p>{metadata.recipeName}</p>
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
      {#each metadata.timing as timing}
        <h4 class="font-semibold">{timing.label}</h4>
        <p>{timing.duration} min</p>
      {/each}
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
