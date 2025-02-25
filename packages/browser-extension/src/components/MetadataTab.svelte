<script lang="ts">
  import type { Metadata } from "../content/types";

  const { metadata }: { metadata: Metadata | undefined } = $props();
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
      <p>
        {metadata.description[0].length > 200
          ? `${metadata.description[0].substring(0, 200)}...`
          : metadata.description[0]}
      </p>
    </div>
  {/if}
</div>
