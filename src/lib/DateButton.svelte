<script>
  import { createEventDispatcher } from "svelte";

  export var day;

  const dispatch = createEventDispatcher();

  const openEdit = (event) => {
    dispatch("edit", { day });
  };
</script>

<button class="main" on:click={openEdit}>
  <p class="day-number">{day.date.getDate()}</p>
  <div class="chic placements" />
  <div class="chic videos" />
  <div class="chic hours">
    <div class="ldc" />
    <div class="fs" />
  </div>
  <div class="chic studies" />
  <div class="chic rvs" />
</button>

<style>
  .main {
    grid-column: var(--static-column);
    background: var(--white);
    color: var(--charcoal);
    border: 1px solid var(--green);

    --radius: 2rem;

    display: grid;
    place-content: center;

    position: relative;
    width: calc(2 * var(--radius));
    height: calc(2 * var(--radius));
    border-radius: 50%;
    font-size: 1.8rem;
    font-weight: 300;
  }
  button:hover {
    box-shadow: 0px 0px 4px 0px var(--shadow);
  }
  div.chic {
    border: 1px solid var(--white);

    position: absolute;
    width: 0.65rem;
    height: 0.65rem;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    top: calc(50% - 0.325rem - 1px);
    left: calc(50% - 0.325rem - 1px);
    overflow: hidden;
  }
  div.chic.placements {
    background: var(--yellow);
    transform: rotate(-20deg) translateX(var(--radius));
  }
  div.chic.videos {
    background: var(--orange);
    transform: rotate(35deg) translateX(var(--radius));
  }
  div.chic.hours {
    background: var(--white);
    transform: rotate(90deg) translateX(var(--radius)) scale(1.5);
    display: flex;
    flex-direction: column;
  }
  div.chic.hours div {
    height: 50%;
  }
  div.chic.hours div.ldc {
    background-color: var(--red);
  }
  div.chic.hours div.fs {
    background: var(--charcoal);
  }
  div.chic.studies {
    background: var(--green);
    transform: rotate(145deg) translateX(var(--radius));
  }
  div.chic.rvs {
    background: var(--lavender);
    transform: rotate(200deg) translateX(var(--radius));
  }
</style>
