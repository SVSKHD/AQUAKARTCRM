<template>
  <q-dialog
    v-model="dialog"
    class="dialog"
    :class="position"
    :persistent="persistent"
    :position="position"
  >
    <c-card :title="title" :subtitle="subtitle" css="w100">
      <template #header-right>
        <q-btn
          dense
          flat
          icon="close"
          @click="$emit('getEvents')"
          class="close"
        >
        </q-btn>
      </template>
      <q-card-section
        :style="'max-height: ' + position == 'right' ? '100vh' : height + ''"
        class="scroll"
        :class="'dialog_' + position"
      >
        <slot />
      </q-card-section>

      <q-card-actions align="right" class="q-mt-sm">
        <slot name="footer">
          <c-btn
            :label="l.cancel"
            outline
            color="primary"
            @click="$emit('getEvents')"
          />
          <!-- <c-btn
            :label="l.ok"
            color="primary"
            @click.prevent="$emit('ok', $event)"
          /> -->
        </slot>
      </q-card-actions>
    </c-card>
  </q-dialog>
</template>
<script>
export default {
  name: "CDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    height: {
      type: String,
      default: "50vh",
    },
    position: {
      type: String,
      default: "right",
    },
    lbl: {
      type: Object,
      default() {
        return {
          cancel: "Cancel",
          ok: "Ok",
        };
      },
    },
  },
  data() {
    return {
      dialog: false,
      l: {
        cancel: "Cancel",
        ok: "Ok",
      },
    };
  },
  watch: {
    dialog() {
      this.$emit("input", this.dialog);
    },
    value() {
      this.dialog = this.value;
    },
    lbl: {
      handler() {
        this.l = {
          ...this.l,
          ...this.lbl,
        };
      },
      deep: true,
    },
  },
  mounted() {
    this.dialog = this.value;
  },
};
</script>
