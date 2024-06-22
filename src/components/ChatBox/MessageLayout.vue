<template>
  <q-card>
    <q-page-container>
      <q-page padding>
        <div class="q-pa-md row justify-center">
          <div style="width: 100%; max-width: 900px">
            <q-chat-message
              name="me"
              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              :text="['hey, how are you?']"
              stamp="7 minutes ago"
              sent
              bg-color="grey-3"
            />
            <q-chat-message
              name="Jane"
              avatar="https://cdn.quasar.dev/img/avatar5.jpg"
              :text="[
                'doing fine, how r you?',
                'I just feel like typing a really, really, REALLY long message to annoy you...',
              ]"
              size="6"
              stamp="4 minutes ago"
              text-color="white"
              bg-color="grey-9"
            />
            <q-chat-message
              name="Jane"
              avatar="https://cdn.quasar.dev/img/avatar5.jpg"
              :text="['Did it work?']"
              stamp="1 minutes ago"
              text-color="white"
              bg-color="grey-9"
            />
          </div>
        </div>
        <div class="row justify-center">
          <div
            style="
              width: 100%;
              max-width: 900px;
              position: absolute;
              bottom: 0px;
            "
          >
            <q-field outlined :dense="dense" style="top: 195px">
              <template v-slot:prepend>
                <q-icon name="add" />
              </template>
              <template v-slot:append>
                <q-icon name="gif_box" />
              </template>

              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  Type a message
                </div>
              </template>
            </q-field>
          </div>
        </div>
        <!-- <q-btn icon="person"/> -->
      </q-page>
    </q-page-container>
  </q-card>
</template>
<script></script>
