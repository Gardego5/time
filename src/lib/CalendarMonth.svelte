<script>
  import { entriesInMonth } from "src/utils/utils.js";
  import { time } from "src/utils/info.js";
  import DateButton from "src/lib/DateButton.svelte";

  const today = new Date();

  const days = entriesInMonth(today);

  const offset = days[0].date.getDay() + 1;
</script>

<h2>{time.months.full[days[0].date.getMonth()]}</h2>
<div class="container">
  {#each time.weekdays.abbreviated as day}
    <p>{`${day}.`}</p>
  {/each}
  {#each days as day, i}
    <DateButton
      {day}
      on:edit
      --static-column={i===0 ? offset : ""}
    />
  {/each}
</div>

<style>
  div.container {
    display: grid;
    grid-template-columns: repeat(7, calc(4rem + 2px));
    justify-items: center;
    gap: 1.25rem 1.5rem;
  }
</style>
