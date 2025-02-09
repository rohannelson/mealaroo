<script lang="ts">
  import type { TopicData } from "../types";

  let tab = $state(1);
  let { data, heading }: { data: TopicData; heading: string } = $props();
</script>

{#if data?.[0]}
  <div class="flex flex-col gap-1">
    <h3 class="font-semibold">{heading}</h3>
    <div class="flex items-center gap-2 mb-2">
      <div class="mr-auto text-sm">List {tab} of {data.length}</div>
      <button
        type="button"
        disabled={tab === 1}
        onclick={() => (tab -= 1)}
        class="btn btn-sm btn-secondary"
      >
        Back
      </button>
      <button
        type="button"
        disabled={tab === data.length}
        onclick={() => (tab += 1)}
        class="btn btn-sm btn-secondary">Next</button
      >
    </div>
    <div id="result">
      <ul class="flex flex-col gap-1">
        {#each data[tab - 1] as { text, isHeading }, i}
          <div class={`flex items-center ${isHeading ? "mt-3" : ""}`}>
            {#if isHeading}
              <h4 class="font-semibold">{text}</h4>
            {:else}
              <li class="list-disc marker:text-zinc-600 ml-4">{text}</li>
            {/if}
            <button
              onclick={() => {
                data[tab - 1][i].isHeading = !isHeading;
              }}
              class={`ml-auto btn btn-square btn-sm btn-outline ${isHeading ? "btn-primary" : ""}`}
              >Hh</button
            >
          </div>
        {/each}
      </ul>
    </div>
  </div>
{/if}
