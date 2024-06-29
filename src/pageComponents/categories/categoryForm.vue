<template>
  <v-container>
    <v-form ref="form">
      <v-text-field
        v-model="item.title"
        density="compact"
        variant="outlined"
        label="Title"
        outlined
        dense
        class="mb-3"
      />

      <div class="d-flex justify-space-between pa-4 pb-0">
        <v-btn-toggle v-model="formatting" variant="outlined" divided multiple>
          <v-btn @click="applyFormat('italic')">
            <v-icon icon="mdi-format-italic"></v-icon>
          </v-btn>

          <v-btn @click="applyFormat('bold')">
            <v-icon icon="mdi-format-bold"></v-icon>
          </v-btn>

          <v-btn @click="applyFormat('underline')">
            <v-icon icon="mdi-format-underline"></v-icon>
          </v-btn>

          <v-btn @click="changeTextColor('purple')">
            <div class="d-flex align-center flex-column justify-center">
              <v-icon icon="mdi-format-color-text"></v-icon>
              <v-sheet color="purple" height="4" width="26" tile></v-sheet>
            </div>
          </v-btn>
        </v-btn-toggle>

        <v-btn-toggle v-model="alignment" variant="outlined" divided>
          <v-btn @click="applyAlignment('center')">
            <v-icon icon="mdi-format-align-center"></v-icon>
          </v-btn>

          <v-btn @click="applyAlignment('left')">
            <v-icon icon="mdi-format-align-left"></v-icon>
          </v-btn>

          <v-btn @click="applyAlignment('right')">
            <v-icon icon="mdi-format-align-right"></v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>

      <v-sheet class="pa-4 text-center">
        <v-textarea
          v-model="item.description"
          density="compact"
          rows="3"
          variant="outlined"
          auto-grow
          full-width
          hide-details
        ></v-textarea>
      </v-sheet>

      <v-img
        :src="
          item.photos && item.photos.length > 0 ? item.photos[0].secure_url : ''
        "
        height="200"
        class="mb-3"
      ></v-img>

      <v-file-input
        label="Upload Photo"
        prepend-icon="mdi-camera"
        outlined
        dense
        @change="handleFileChange"
      ></v-file-input>

      <v-btn color="success" class="mr-4" @click="saveCategory"> Save </v-btn>

      <v-btn color="error" @click="cancel"> Cancel </v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";

// Define props
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

// Reactive reference for the item
const item = ref(props.item);

// Watch for changes in the prop and update the local ref accordingly
watch(
  () => props.item,
  (newValue) => {
    item.value = newValue;
  }
);

// Data for formatting and alignment
const formatting = ref([]);
const alignment = ref([]);

// Function to apply text formatting
const applyFormat = (format) => {
  document.execCommand(format, false, null);
};

// Function to change text color
const changeTextColor = (color) => {
  document.execCommand("foreColor", false, color);
};

// Function to apply text alignment
const applyAlignment = (align) => {
  document.execCommand(`justify${align}`);
};

// Function to handle file changes
const handleFileChange = (file) => {
  console.log("File selected:", file);
  // Here you would handle the file upload process
};

// Function to save category data
const saveCategory = () => {
  console.log("Saving category:", item.value);
  // API call to save the category data
};

// Function to cancel the form
const cancel = () => {
  console.log("Cancelled");
  // Reset item to initial state or emit an event
};
</script>

<style scoped></style>
