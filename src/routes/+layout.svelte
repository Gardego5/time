<script>
  import "src/style/reset.css";
  import "src/style/app.css";
</script>

<main>
  <slot />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
