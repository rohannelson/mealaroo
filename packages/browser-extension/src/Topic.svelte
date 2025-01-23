<script lang="ts">
  import type { TopicData } from "./types";

let page = $state(1)
let {data, heading}: {data: TopicData, heading: string} = $props()
</script>

{#if data?.[0]}
<h3>{heading}</h3>    
    <div>List {page} of {data.length}</div>
    <div class="mt-0.5">
    <button type="button" disabled={page===1} onclick={() => page -= 1}>
      Back
    </button>
    <button type="button" disabled={page===data.length} onclick={() => page += 1}>Next</button>
  </div>
    <!--Need to iterate through in a more idomatic way-->
    <div id="result">
      <ul>
      {#each data[page - 1] as {text, isHeading}, i}
        <div class="item-container">
          {#if isHeading}
          <h4>{text}</h4>
          {:else}
          <li>{text}</li>
          {/if}
          <button onclick={() => {data[page-1][i].isHeading = !isHeading}} class={`isHeadingButton ${isHeading ? 'isHeading' : ''}`}>Hh</button>
        </div>
      {/each}
    </ul>
</div>
{/if}
<style>
    div#result ul {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    div#result ul li {
      width: 100%;
    }
    div.item-container {
      display: flex;
      padding-right: 1rem;
    }
    /*Button Styles*/
    button.isHeadingButton {
      margin-left: auto;
      background: white;
      border-radius: 4px;
    }
    button.isHeadingButton.isHeading {
      background: lightgray;
    }
  </style>