<script lang="ts">
  import type { TopicData } from "../types";
  import NavButtons from "./NavButtons.svelte";

  
  let { data, tab = $bindable() }: { data: TopicData, tab: number } = $props();
</script>

{#if data?.[0]}
  <div class="flex flex-col gap-1">
    <NavButtons bind:tab {data} />
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
              class={`ml-auto btn btn-square btn-sm btn-outline ${isHeading ? "btn-accent" : ""}`}
              >Hh</button
            >
          </div>
        {/each}
      </ul>
    </div>
  </div>
{/if}
