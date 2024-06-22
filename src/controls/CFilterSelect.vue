<template>
  <div class="csf_filter_select">
    <label>{{ label }}</label>
    <q-select
      outlined
      dense
      :label="label"
      :model-value="model"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="options"
      @filter="filterFn"
      @input-value="setModel"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
import { ref } from "vue";

const stringOptions = [
  "Alamance",
  "Alexander",
  "Anson",
  "Ashe",
  "Avery",
  "Beaufort",
].reduce((acc, opt) => {
  for (let i = 1; i <= 5; i++) {
    acc.push(opt + " " + i);
  }
  return acc;
}, []);

export default {
  props: ["label"],
  setup(props) {
    const model = ref(null);
    const options = ref(stringOptions);

    return {
      model,
      options,

      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLocaleLowerCase();
          options.value = stringOptions.filter(
            (v) => v.toLocaleLowerCase().indexOf(needle) > -1
          );
        });
      },

      setModel(val) {
        model.value = val;
      },
    };
  },
};
</script>
