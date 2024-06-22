<template>
  <div>
    <q-breadcrumbs gutter="sm">
      <q-breadcrumbs-el icon="home" to="/" label="HOME" />
      <q-breadcrumbs-el :label="name" />
    </q-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: "DashboardBreadCrumb",
  props: ["name"],
};
</script>
