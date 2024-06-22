<template>
  <q-card class="my_card" :class="css">
    <div :class="{ 'row items-center no-wrap q-pa-md': title }">
      <slot name="header">
        <div class="col" v-if="title">
          <div class="text-h6">{{ title }}</div>
          <div class="text-subtitle2">{{ subtitle }}</div>
        </div>
      </slot>
      <slot name="header-right">
        <div class="col-auto" v-if="menu.length > 0">
          <q-btn round flat icon="eva-more-vertical-outline">
            <q-menu cover auto-close>
              <q-list class="card-menu">
                <q-item
                  clickable
                  v-for="m of menu"
                  :key="'menu_' + m"
                  @click="$emit(m.toLowerCase().split(' ').join('-'), $event)"
                >
                  <q-item-section>{{ m }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </slot>
    </div>
    <q-card-section>
      <slot />
    </q-card-section>
    <q-card-actions>
      <span class="text-right text-grey-8 q-mt-sm">
        <q-avatar size="24px" class="csf_task_card_avatar" text-color="white"
          >CS</q-avatar
        >
      </span>
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
  name: "CCard",
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    css: {
      type: String,
      default: "",
    },
    menu: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
