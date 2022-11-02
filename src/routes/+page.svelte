<script>
  import EditModal from "$lib/EditModal.svelte";
  import CalendarMonth from "$lib/CalendarMonth.svelte";
  import { readMonth, writeDay } from "src/utils/db";

  var editModalDate;
  var today = new Date();

  const handleEdit = (event) => editModalDate = event.detail.date;

  const getPromise = () => readMonth(today);
  $: promise = getPromise();
</script>

{#await promise}
  <p>Loading...</p>
{:then data}
  <CalendarMonth on:edit={handleEdit} bind:today />
{/await}

<EditModal date={editModalDate} />
