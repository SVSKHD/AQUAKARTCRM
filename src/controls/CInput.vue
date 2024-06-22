<template>
  <div class="csf_input">
    <label v-if="mandatory" class="mandatory">{{ label }}</label>
    <label v-else>{{ label }} </label>
    <q-input
      outlined
      :modelValue="modelValue"
      :type="getType"
      dense
      :hint="hint"
      hide-hint
      :loading="loading"
      :mask="mask"
      :clearable="clearable"
      :error="error"
      :debounce="debounce"
      :disable="disable"
      :prefix="prefix"
      :suffix="suffix"
      :rules="rules"
      :label="label"
      stack-label
      clear-icon="eva-close-outline"
      ref="inputRef"
      @update:model-value="onUpdate"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
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
    </q-input>
  </div>
</template>
<script>
export default {
  name: "CButton",
  props: {
    label: { type: String },
    type: { type: String, default: "text" },
    modelValue: { type: [String, Number] },
    rules: { type: Array },
    mandatory: { type: Boolean, default: false },
    size: { type: String, default: "md" },
    css: { type: String },
    icon: { type: String },
    hint: { type: String },
    mask: { type: String },
    loading: { type: Boolean },
    error: { type: Boolean, default: false },
    clearable: { type: Boolean },
    disable: { type: Boolean },
    color: { type: String, default: "primary" },
    debounce: {
      type: [String, Number],
      default: 0,
    },
    prefix: { type: String },
    suffix: { type: String },
  },
  data() {
    return {
      showPwd: true,
    };
  },
  computed: {
    getType() {
      return this.type == "password"
        ? this.showPwd
          ? "password"
          : "text"
        : this.type;
    },
  },
  methods: {
    onUpdate(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
