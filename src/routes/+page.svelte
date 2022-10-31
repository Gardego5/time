<script>
  import EditModal from "$lib/EditModal.svelte";
  import CalendarMonth from "$lib/CalendarMonth.svelte";
  import { readMonth } from "src/utils/db";

  var editModalDate;

  const handleEdit = (event) => editModalDate = event.detail.day.date;

  let promise = readMonth(new Date());
</script>

{#await promise}
  <p>Loading...</p>
{:then data}
  <CalendarMonth on:edit={handleEdit} {data} />
{/await}

<EditModal date={editModalDate} />
