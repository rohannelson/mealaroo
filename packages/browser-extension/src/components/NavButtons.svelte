<script lang="ts">
  let { tab = $bindable(), data } = $props();
</script>

<div class="flex items-center gap-2 mb-2">
  <div class="mr-auto text-sm">List {tab} of {data.length}</div>
  <button
    type="button"
    disabled={tab === 1}
    onclick={() => (tab -= 1)}
    class="btn btn-sm btn-primary btn-outline"
  >
    Back
  </button>
  <button
    type="button"
    disabled={tab === data.length}
    onclick={() => (tab += 1)}
    class="btn btn-sm btn-primary btn-outline">Next</button
  >
</div>
