<script>
  import Entry from "./Entry.svelte";

  export var date = undefined;

  const day = {
    date,
    fs: 0,
    ldc: 0,
    rv: 0,
    bs: 0,
    pl: 0,
    vi: 0,
  }
</script>

<div class="container" class:open={date}>
  <div class="shadow" role="presentation" on:click={() => (date = undefined)} />
  <div class="card">
    {#if date}
      <p class="day">{date.toLocaleDateString()}</p>
    {/if}

    <Entry bind:value={day.fs} label={"FS Time"} color="charcoal" />
    <Entry bind:value={day.ldc} label={"LDC Time"} color="red" />
    <Entry bind:value={day.rv} label={"Return Visits"} color="lavender" />
    <Entry bind:value={day.bs} label={"Bible Studies"} color="green" />
    <Entry bind:value={day.pl} label={"Placements"} color="yellow" />
    <Entry bind:value={day.vi} label={"Videos"} color="orange" />

    <div class="row">
      <button class="save edit-button" on:click={() => console.log(day)}> SAVE </button>
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
