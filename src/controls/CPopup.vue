<template>
  <q-dialog model-value="Modal">
    <c-card :title="label" :subtitle="miniLabel" style="width: 500px">
      <div class="text-center">
        <q-card-section>
          <Slot />
        </q-card-section>
      </div>
    </c-card>
  </q-dialog>
</template>

<script>
export default {
  name: "CPopup.vue",
  props: [
    "Modal",
    "label",
    "miniLabel",
    "editAppointmentLabel",
    "deleteAppointmentLabel",
    "editAppointment",
    "deleteAppointment",
  ],
  setup() {},
};
</script>

<style scoped></style>
