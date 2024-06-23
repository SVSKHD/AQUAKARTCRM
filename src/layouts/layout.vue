<template>
    <aqua-header/>
    <div class="p-2">
    <router-view />
    </div>
    <aqua-footer/>
</template>

<script>
import AquaHeader from "./header";
import AquaFooter from "./footer";

export default {
  components: {
    AquaHeader,
    AquaFooter,
  },
};
</script>

<style scoped>
/* Add any styles specific to this component here */
</style>