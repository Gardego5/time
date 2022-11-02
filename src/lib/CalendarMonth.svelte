<script>
  import {
    entriesInMonth,
    getPreviousMonth,
    getNextMonth,
  } from "src/utils/utils.js";
  import { time } from "src/utils/info.js";
  import DateButton from "src/lib/DateButton.svelte";
  import { readMonth } from "src/utils/db";

  export var today;

  var data, days, offset;

  $: readMonth(today).then((response) => (data = response));

  $: if (data)
    days = entriesInMonth(today).map((entry) => {
      const savedDay = data.filter(
        ({ date }) => date === entry.date.toJSON()
      )[0];
      return savedDay ? { ...savedDay, date: entry.date } : entry;
    });

  $: if (days) offset = days[0].date.getDay() + 1;
</script>

<div class="top-container">
  <button on:click={() => (today = getPreviousMonth(today))}>prev</button>
  <h2>{time.months.full[today.getMonth()]}</h2>
  <button on:click={() => (today = getNextMonth(today))}>next</button>
</div>
<div class="container">
  {#each time.weekdays.abbreviated as day}
    <p>{`${day}.`}</p>
  {/each}

  {#if days}
    {#each days as day, i}
      <DateButton {day} on:edit --static-column={i === 0 ? offset : ""} />
    {/each}
  {/if}
</div>

<style>
  div.container {
    display: grid;
    grid-template-columns: repeat(7, auto);
    justify-items: center;
    gap: 0.75rem 0.75rem;
  }
  div.top-container {
    display: flex;
    width: 100%;
    max-width: 20rem;
    justify-content: space-between;
    align-items: center;
  }
  @media only screen and (min-width: 600) {
    div.container {
      gap: 1.25rem 1.5rem;
    }
  }
</style>
