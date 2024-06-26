<template>
    <v-text-field
      :value="value"
      @input="$emit('update:value', $event)"
      :loading="loading"
      :append-inner-icon="icon"
      density="compact"
      :label="label"
      variant="solo"
      hide-details
      single-line
      @click:append-inner="handleClick"
    />
  </template>
  
  <script>
  export default {
    name: 'AquaInput',
    props: {
      value: {
        type: String,
        default: ''
      },
      loading: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: 'mdi-magnify'  // Default to a magnify icon, but can be changed
      }
    },
    methods: {
      handleClick() {
        this.$emit('click');
      }
    }
  }
  </script>