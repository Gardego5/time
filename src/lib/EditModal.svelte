<script>
  import Entry from "./Entry.svelte";

  export var open = false;
  export var day = undefined;

  const toggleOpen = (event) => (open = !open);
</script>

<div class="container" class:open={day}>
  <div class="shadow" role="presentation" on:click={() => day = undefined}></div>
  <div class="card">
    {#if day}
    <p class="day">{day.date.toLocaleDateString()}</p>
    {/if}

    <Entry label={"FS Time"} color="black" />
    <Entry label={"LDC Time"} />
    <Entry label={"Return Visits"} />
    <Entry label={"Bible Studies"} />
    <Entry label={"Placements"} />
    <Entry label={"Videos"} />

    <div class="row">
      <button class="save edit-button" on:click={toggleOpen}>
        SAVE
      </button>
      <button class="delete edit-button" on:click={toggleOpen}>
        {day ? "DELETE" : "CANCEL" }
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
