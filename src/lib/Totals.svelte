<script>
  import { readTotals } from "src/utils/db";

  export var currentMonth;

  let totals = {};
  $: if (typeof indexedDB !== "undefined")
    readTotals(currentMonth).then((res) => {console.log(res);totals = res;});
</script>

<div>
  {#each Object.entries(totals) as total}
    {#if total[0] !== "date"}
      <span>{total[0]}: {total[1]}</span>
    {/if}
  {/each}
</div>

<style>
  div {
    margin: 1rem;
    display: flex;
    gap: 0.5rem
  }
</style>
