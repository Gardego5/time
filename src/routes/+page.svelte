<script>
  import EditModal from "$lib/EditModal.svelte";
  import CalendarMonth from "$lib/CalendarMonth.svelte";

  var editModalDay;

  const handleEdit = (event) => {
    editModalDay = event.detail.day;
  }
</script>

<CalendarMonth on:edit={handleEdit} />
<EditModal day={editModalDay} />
