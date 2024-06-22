<template>
  <div>
    <c-card :title="username" :subtitle="role"> </c-card>
  </div>
</template>

<script>
export default {
  props: ["username", "role"],
  name: "WelcomeMessage",
};
</script>

<style scoped></style>
