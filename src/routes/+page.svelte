<script>
  import EditModal from "$lib/EditModal.svelte";
  import CalendarMonth from "$lib/CalendarMonth.svelte";

  var editModalDate;
  var currentMonth = new Date();

  const handleEdit = (event) => (editModalDate = event.detail.date);
  const handleRefresh = (event) => currentMonth = currentMonth;
</script>

<CalendarMonth on:edit={handleEdit} bind:currentMonth />

<EditModal on:needsRefresh={handleRefresh} date={editModalDate} />
