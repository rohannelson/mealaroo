<script lang="ts">
  import type { TopicData } from "./types";

let page = $state(1)
let {data, heading}: {data: TopicData, heading: string} = $props()
</script>

{#if data?.[0]}
<div>
<h3 class="font-semibold">{heading}</h3>    
    <div>List {page} of {data.length}</div>
    <div class="mt-0.5">
    <button type="button" disabled={page===1} onclick={() => page -= 1} class="ml-auto rounded-md px-1.5 border border-zinc-600">
      Back
    </button>
    <button type="button" disabled={page===data.length} onclick={() => page += 1} class="ml-auto rounded-md px-1.5 border border-zinc-600">Next</button>
  </div>
    <!--Need to iterate through in a more idomatic way-->
    <div id="result">
      <ul>
      {#each data[page - 1] as {text, isHeading}, i}
        <div class="flex my-0.5">
          {#if isHeading}
          <h4 class="font-semibold">{text}</h4>
          {:else}
          <li class="list-disc marker:text-zinc-600 ml-4">{text}</li>
          {/if}
          <button onclick={() => {data[page-1][i].isHeading = !isHeading}} class={`ml-auto rounded-md px-1.5 border border-zinc-600 h-fit ${isHeading ? 'bg-zinc-300' : ''}`}>Hh</button>
        </div>
      {/each}
    </ul>
</div>
</div>
{/if}