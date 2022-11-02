<script>
  import {
    entriesInMonth,
    getPreviousMonth,
    getNextMonth,
  } from "src/utils/utils.js";
  import { time } from "src/utils/info.js";
  import DateButton from "src/lib/DateButton.svelte";
  import { readMonth } from "src/utils/db";

  export var currentMonth;

  var data, days, offset;

  $: if (typeof indexedDB !== "undefined")
    readMonth(currentMonth).then((response) => (data = response));

  $: if (data)
    days = entriesInMonth(currentMonth).map((entry) => {
      const savedDay = data.filter(
        ({ date }) => date === entry.date.toJSON()
      )[0];
      return savedDay ? { ...savedDay, date: entry.date } : entry;
    });

  $: if (days) offset = days[0].date.getDay() + 1;
</script>

<div class="top-container">
  <button on:click={() => (currentMonth = getPreviousMonth(currentMonth))}
    >prev</button
  >
  <h2>{time.months.full[currentMonth.getMonth()]}</h2>
  <button on:click={() => (currentMonth = getNextMonth(currentMonth))}
    >next</button
  >
</div>
<div class="container">
  {#each time.weekdays.abbreviated as day}
    <p>{`${day}.`}</p>
  {/each}

  {#if days}
    {#each days as day, i}
      <DateButton {day} on:edit --static-column={i === 0 ? offset : ""} />
    {/each}
  {:else}
    <p>Loading...</p>
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
