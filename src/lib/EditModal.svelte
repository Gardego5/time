<script>
  import Entry from "./Entry.svelte";
  import { readDay, writeDay } from "src/utils/db";

  export var date = undefined;

  let fs;
  let ldc;
  let rv;
  let bs;
  let pl;
  let vi;

  const update = async () =>
    ({ fs, ldc, rv, bs, pl, vi } = await readDay(date));

  const save = (event) => {
    writeDay({ date: date.toJSON(), fs, ldc, rv, bs, pl, vi });
    date = undefined;
  };

  $: if (date) update();
</script>

<div class="container" class:open={date}>
  <div class="shadow" role="presentation" on:click={() => (date = undefined)} />
  <div class="card">
    {#if date}
      <p class="day">{date.toLocaleDateString()}</p>
    {/if}

    <Entry bind:value={fs} label={"FS Time"} color="charcoal" />
    <Entry bind:value={ldc} label={"LDC Time"} color="red" />
    <Entry bind:value={rv} label={"Return Visits"} color="lavender" />
    <Entry bind:value={bs} label={"Bible Studies"} color="green" />
    <Entry bind:value={pl} label={"Placements"} color="yellow" />
    <Entry bind:value={vi} label={"Videos"} color="orange" />

    <div class="row">
      <button class="save edit-button" on:click={save}> SAVE </button>
      <button class="delete edit-button">
        {date ? "DELETE" : "CANCEL"}
      </button>
    </div>
  </div>
</div>

<style>
  div.container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: none;
    flex-direction: column;
    align-items: center;
  }
  div.shadow {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: var(--shadow);
  }
  div.container.open {
    display: flex;
  }

  div.card {
    background: var(--white);
    border-radius: 0.5rem;
    border: 1px solid var(--green);
    padding: 1rem;
    margin-top: 6rem;
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 0.5rem;
    align-items: center;
    z-index: 20;
  }

  p.day,
  div.row {
    grid-column: span 3;
    text-align: center;
  }

  button.edit-button {
    background: var(--white);
    border: none;
    padding: 0.25rem 1rem;
    margin: 0;
    border-radius: 0.5rem;
  }
  button.edit-button.save {
    border: 2px solid var(--green);
  }
  button.edit-button.delete {
    border: 2px solid var(--red);
  }
  button.edit-button:active {
    background-color: var(--light-shadow);
  }
</style>
