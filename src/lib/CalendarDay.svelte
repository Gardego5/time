<script>
  import Fa from "svelte-fa";
  import {
    faFile,
    faPlayCircle,
    faHourglass,
    faCircleCheck,
    faXmarkCircle,
    faEdit,
  } from "@fortawesome/free-regular-svg-icons";

  import Entry from "./Entry.svelte";

  export var editable = false;
  export var day;

  const toggleEdit = (event) => {
    editable = !editable;
  };
</script>

<div class="calendar-day">
  <div class="choice">
    {#if editable}
      <button class="edit-button" on:click={toggleEdit}>
        <Fa icon={faCircleCheck} />
      </button>
      <button class="edit-button" on:click={toggleEdit}>
        <Fa icon={faXmarkCircle} />
      </button>
    {:else}
      <button class="edit-button" on:click={toggleEdit}>
        <Fa icon={faEdit} />
      </button>
    {/if}
  </div>

  <span class="day-number">{new Date(day.date).getDate()}</span>

  <x />
  <Entry {editable} delta={0.5} /><Fa icon={faHourglass} /><Entry
    {editable}
    delta={0.5}
  />
  <x />
  <Fa icon={faFile} /><Entry {editable} />
  <x />
  <Entry {editable} /><Fa icon={faPlayCircle} />
  <span class="desc-text">RV</span><Entry {editable} />
  <x />
  <Entry {editable} /><span class="desc-text">BS</span>
</div>

<style>
  div.calendar-day {
    position: relative;
    background-color: var(--lavender);
    font-weight: 400;
    display: grid;
    gap: 0.25rem;
    border-radius: 5px;
    grid-template-columns: 1rem 2rem 1rem 2rem 1rem;
    grid-template-rows: repeat(3, 1fr);
    align-items: center;
    justify-items: center;
    width: 8rem;
    height: 7.5rem;
    padding: 0.5rem 0.25rem 0.5rem;
    border: 1px solid var(--green);
    box-shadow: 0 3px 5px -1px #0006;
    color: var(--charcoal);
  }
  div.choice {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    justify-self: left;
    left: -0.65rem;
    top: 0.3rem;
  }
  span.day-number {
    position: absolute;
    right: -0.65rem;
    top: 0.3rem;
  }
  span.day-number,
  button.edit-button {
    background: var(--white);
    width: 1.5rem;
    aspect-ratio: 1 / 1;
    display: grid;
    place-content: center;
    border-radius: 50%;
    border: 1px solid var(--green);
  }
  button.edit-button {
    padding: 0;
    margin: 0;
  }
  span.desc-text {
    font-size: 0.8rem;
    font-weight: 600;
  }
</style>
