<script lang='ts'>
  import type { SendToPopup } from "./content";

  async function handleClick() {
  console.log("clicked");
  const activeTab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  const activeTabId = activeTab[0].id;
  if (activeTabId) {
    console.log("activeTabId: ", activeTabId);
    browser.tabs.sendMessage(activeTabId, { action: "scrapeHTML", data: 0 });
  }
}

let ingredients: string[][] | null | undefined = $state()
browser.runtime.onMessage.addListener((message: SendToPopup) => {
  if (message.action === "sendToPopup") {
    ingredients = message.data
  }
});

let page = $state(1)
</script>

<main>
    <h1>Mealaroo</h1>
    <button id="scrapeButton" type="button" onclick={handleClick}>Scrape Recipe</button>
    <h2>Scraping Results</h2>
    <h3>Ingredients</h3>
    {#if ingredients}
    <div>List {page} of {ingredients.length}</div>
    <div class="list-nav">
    <button type="button" disabled={page===1} onclick={() => page -= 1}>
      Back
    </button>
    <button type="button" disabled={page===ingredients.length} onclick={() => page += 1}>Next</button>
  </div>
    {/if}
    <div id="result">
      {@html ingredients && ("<ul>" +
        ingredients[page - 1].map((item) => `<li>${item}</li>`).join("") +
        "</ul>")
      }
    </div>
  </main>

<style>
  div.list-nav {
    margin-top: 0.5rem;
  }
</style>