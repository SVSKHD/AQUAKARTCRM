<template>
  <div class="csf_input">
    <label v-if="mandatory" class="mandatory">{{ label }}</label>
    <label v-else>{{ label }} </label>
    <q-select
      outlined
      :modelValue="modelValue"
      :options="filteredOptions"
      :type="getType"
      dense
      :hint="hint"
      hide-hint
      :loading="loading"
      :mask="mask"
      :rules="rules"
      :clearable="clearable"
      stack-label
      clear-icon="eva-close-outline"
      :multiple="multiple"
      :use-chips="multiple"
      :error="error"
      :debounce="debounce"
      :disable="disable"
      :prefix="prefix"
      :suffix="suffix"
      ref="inputRef"
      :label="label"
      use-input
      @filter="filterFn"
      @update:model-value="onUpdate"
      @virtual-scroll="onScroll"
    >
      <template #bottom-slots>
        <slot name="bottom" />
      </template>
      <template v-slot:append>
        <slot name="append">
          <q-icon
            v-if="type == 'password'"
            :name="showPwd ? 'eva-eye-off-2-outline' : 'eva-eye-outline'"
            class="cursor-pointer"
            @click="showPwd = !showPwd"
          />
        </slot>
      </template>
      <template v-slot:prepend>
        <slot name="prepend" />
      </template>
    </q-select>
  </div>
</template>
<script>
//features
//use-input in template part - for input typing.
import { computed, ref } from "vue";
export default {
  name: "CSelect",
  props: {
    mandatory: { type: Boolean, default: false },
    label: { type: String },
    type: { type: String, default: "text" },
    modelValue: { type: [String, Number, Array] },
    rules: { type: Array },
    options: { type: Array },
    size: { type: String, default: "md" },
    css: { type: String },
    icon: { type: String },
    hint: { type: String },
    mask: { type: String },
    rules: { type: Array, default: [] },
    loading: { type: Boolean },
    error: { type: Boolean, default: false },
    clearable: { type: Boolean },
    class: { type: String },
    disable: { type: Boolean },
    color: { type: String, default: "primary" },
    debounce: {
      type: [String, Number],
      default: 0,
    },
    prefix: { type: String },
    suffix: { type: String },
    multiple: { type: Boolean, default: false },
  },
  setup(props, context) {
    let showPwd = ref(false);
    const getType = computed(() => {
      return props.type === "password"
        ? showPwd.value
          ? "password"
          : "text"
        : props.type;
    });

    let filteredOptions = ref([]);
    const filterFn = (val, update) => {
      if (val === "") {
        filteredOptions.value = props.options;
      }
      update(() => {
        const needle = val.toLowerCase();
        // eslint-disable-next-line vue/no-mutating-props
        filteredOptions.value = props.options.filter((data) => {
          return data.label.toLowerCase().includes(needle);
        });
      });
    };
    const onUpdate = (value) => {
      context.emit("update:modelValue", value);
    };

    return {
      filteredOptions,
      showPwd,
      getType,
      onUpdate,
      filterFn,
    };
  },
};
</script>
<style></style>
