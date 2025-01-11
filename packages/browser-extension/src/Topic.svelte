<script>
let page = $state(1)
let {data, heading} = $props()
</script>

{#if data}
<h3>{heading}</h3>    
    <div>List {page} of {data.length}</div>
    <div class="list-nav">
    <button type="button" disabled={page===1} onclick={() => page -= 1}>
      Back
    </button>
    <button type="button" disabled={page===data.length} onclick={() => page += 1}>Next</button>
  </div>
    
    <div id="result">
      {@html data && ("<ul>" +
        data[page - 1].map((item) => `<li>${item}</li>`).join("") +
        "</ul>")
      }
</div>
{/if}
<style>
    div.list-nav {
      margin-top: 0.5rem;
    }
  </style>