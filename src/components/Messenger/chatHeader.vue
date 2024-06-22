<template>
  <q-card-section class="rounded">
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <q-icon name="eva-person-outline" color="dark" size="2.7rem" />
        </q-avatar>
      </q-item-section>

      <q-item-section class="text-dark">
        <q-item-label lines="1">UserName</q-item-label>
        <q-item-label class="text-dark" caption lines="2">
          Last Seen : 1 min ago
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-badge  rounded color="green" />

      </q-item-section>
    </q-item>
  </q-card-section>
</template>

<script>
export default {
  props:['userbadge'],
  setup() {
    return {};
  },
};
</script>
