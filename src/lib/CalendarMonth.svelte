<script>
  import Totals from "./Totals.svelte";
  import DateButton from "src/lib/DateButton.svelte";

  import { readMonth } from "src/utils/db";
  import { time } from "src/utils/info.js";
  import {
    entriesInMonth,
    getNextMonth,
    getPreviousMonth,
  } from "src/utils/utils.js";

  export var currentMonth;

  $: days = entriesInMonth(currentMonth);
  $: offset = days[0].date.getDay() + 1;

  $: if (typeof indexedDB !== "undefined")
    readMonth(currentMonth).then((data) => {
      days = entriesInMonth(currentMonth).map((entry) => {
        const savedDay = data.filter(
          ({ date }) => date === entry.date.toJSON()
        )[0];
        return savedDay ? { ...savedDay, date: entry.date } : entry;
      });
    });
</script>

<div class="top-container">
  <button
    class="change-month"
    on:click={() => (currentMonth = getPreviousMonth(currentMonth))}
  >
    prev
  </button>
  <h2>{time.months.full[currentMonth.getMonth()]}</h2>
  <button
    class="change-month"
    on:click={() => (currentMonth = getNextMonth(currentMonth))}
  >
    next
  </button>
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

{#if currentMonth}
  <Totals {currentMonth} />
{/if}

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
  button.change-month {
    color: var(--charcoal);
    background: var(--white);
    border: 1px solid var(--green);
    border-radius: 0.75rem;
    width: 4rem;
    height: 1.5rem;
  }
</style>
