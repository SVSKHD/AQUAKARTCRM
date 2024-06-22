import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import eventBus from "vue3-eventbus";
import { EmojiPickerPlugin } from "vue-emoji-picker";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

//css
import "vue3-emoji-picker/css";
// import "@/assets/app.css";

import controls from "./controls/controls.js";

const app = createApp(App);
controls(app);

app
  .use(Quasar, quasarUserOptions)
  .use()
  .use(eventBus, {
    globalPropertyName: "$ev",
  })
  .use(EmojiPickerPlugin)
  .use(store)
  .use(router)
  .mount("#app");
