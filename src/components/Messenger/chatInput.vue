<template>
  <div>
    <div class="col-12">
      <q-input
        v-model="search"
        debounce="1000"
        outlined
        dense
        placeholder="lets interact"
      >
        <template v-slot:append>
          <q-btn flat icon="eva-paper-plane-outline" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import DiscordPicker from "vue3-discordpicker";
import EmojiPicker from "vue3-emoji-picker";
export default {
  components: { DiscordPicker, EmojiPicker },
  setup() {
    return {};
  },
};
</script>
