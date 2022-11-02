<script>
  import { createEventDispatcher } from "svelte";

  export var day;

  const dispatch = createEventDispatcher();

  const openEdit = (event) => {
    dispatch("edit", day);
  };
</script>

<button class="main" on:click={openEdit}>
  <p class="day-number">{day.date.getDate()}</p>
  <div class="chic placements" role="presentation" class:hidden={!day.pl} />
  <div class="chic videos" role="presentation" class:hidden={!day.vi} />
  <div class="chic hours" class:hidden={!day.ldc && !day.fs}>
    <div class="ldc" role="presentation" class:hidden={!day.ldc} />
    <div class="fs" role="presentation" class:hidden={!day.fs} />
  </div>
  <div class="chic studies" role="presentation" class:hidden={!day.bs} />
  <div class="chic rvs" role="presentation" class:hidden={!day.rv} />
</button>

<style>
  .main {
    grid-column: var(--static-column);
    background: var(--white);
    color: var(--charcoal);
    border: 1px solid var(--green);

    --radius: 1rem;
    --chic: 0.45rem; 

    display: grid;
    place-content: center;

    position: relative;
    width: calc(2 * var(--radius));
    height: calc(2 * var(--radius));
    border-radius: 50%;
    font-weight: 300;
    font-size: 1rem;
  }
  @media only screen and (min-width: 375px) {
    .main {
      --radius: 1.2rem;
    }
  }
  @media only screen and (min-width: 600px) {
    .main {
      --radius: 1.8rem;
      --chic: 0.65rem;
      font-size: 1.5rem;
    }
  }
  button:hover {
    box-shadow: 0px 0px 4px 0px var(--shadow);
  }
  div.chic {
    border: 1px solid var(--white);

    position: absolute;
    width: var(--chic);
    height: var(--chic);
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    top: calc(50% - var(--chic) * 0.5 - 1px);
    left: calc(50% - var(--chic) * 0.5 - 1px);
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

  div.hidden {
    visibility: hidden;
  }
</style>
