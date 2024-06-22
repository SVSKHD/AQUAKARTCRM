<template>
  <div class="row whole-footer">
    <div class="q-mt-xl">
      <q-btn
        class="q-mt-xs"
        flat
        dense
        round
        color="primary"
        icon="emoji_emotions"
      />
      <q-btn
        class="q-mt-xs"
        flat
        dense
        round
        color="primary"
        icon="attach_file"
      />
      <!-- <q-file>
              <q-btn
              class="q-mt-xs"
              flat
              dense
              round
           
              color="primary"
              icon="attach_file"
            />
            </q-file> -->
    </div>
    <div class="col-10 q-mt-xs">
      <c-input
        placeholder="Type something"
        class="q-mt-xl"
        v-model="text"
        filled
        autogrow
      />
    </div>
    <div class="col q-mt-xl">
      <c-btn flat icon="send" disable class="text-white"></c-btn>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    const text = ref();
    return {
      text,
    };
  },
};
</script>
