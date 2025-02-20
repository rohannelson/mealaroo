<script lang="ts">
  import type { Metadata } from "../content/types";

  const { metadata }: { metadata: Metadata | undefined } = $props();
</script>

{#if metadata?.recipeName}
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2 mb-2">
      <p>{metadata.recipeName}</p>
    </div>
  </div>
{/if}
