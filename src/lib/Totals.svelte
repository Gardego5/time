<script>
  import { readTotals, fallback } from "src/utils/db";

  export var currentMonth;

  let totals = fallback();
  $: if (typeof indexedDB !== "undefined")
    readTotals(currentMonth).then((res) => (totals = res));
</script>

<div class="container">
  <div class="stat rv">
    <span class="label">Return Visits</span>
    <span class="info">{totals.rv}</span>
  </div>
  <div class="stat fs">
    <span class="label">FS Time</span>
    <span class="info">{totals.fs}</span>
  </div>
  <div class="stat pl">
    <span class="label">Placements</span>
    <span class="info">{totals.pl}</span>
  </div>
  <div class="stat bs">
    <span class="label">Bible Studies</span>
    <span class="info">{totals.bs}</span>
  </div>
  <div class="stat ldc">
    <span class="label">LDC Time</span>
    <span class="info">{totals.ldc}</span>
  </div>
  <div class="stat vi">
    <span class="label">Videos</span>
    <span class="info">{totals.vi}</span>
  </div>
</div>

<style>
  div.container {
    display: flex;
    flex-wrap: wrap;
    column-gap: 1rem;
    row-gap: 0.5rem;
    justify-content: center;
    justify-items: center;
    font-weight: 300;
    font-size: 0.8rem;
    max-width: 100vw;
    margin-top: 1rem;
    max-width: 30rem;
  }
  div.stat {
    border-radius: 1.1rem;
    padding: 0.25rem 0.25rem 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  span.info {
    background-color: var(--white);
    font-size: 1.2rem;
    aspect-ratio: 1 / 1;
    width: 1.7rem;
    display: grid;
    place-content: center;
    border-radius: 50%;
    color: var(--charcoal);
  }
  .fs {
    background: var(--charcoal);
    color: var(--white)
  }
  .ldc {
    background: var(--red);
  }
  .rv {
    background-color: var(--lavender);
  }
  .bs {
    background-color: var(--green);
  }
  .pl {
    background: var(--yellow);
  }
  .vi {
    background: var(--orange);
  }
</style>
