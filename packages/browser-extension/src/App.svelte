<script>
import Counter from './Counter.svelte'
</script>

<main>
    <h1>Mealaroo</h1>
    <button id="scrapeButton" type="button">Scrape Recipe</button>
    <h2>Scraping Results</h2>
    <h3>Ingredients</h3>
    <button name="tryAgain" data-topic="ingredients" type="button">
      Try again
    </button>
    <div id="result"></div>
    <Counter />
  </main>