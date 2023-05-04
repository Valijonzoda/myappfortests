<template>
  <div class="dialog-overlay">

  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DialogModal',
  props: {
    title: {
      required: true,
      type: String
    }
  }
})
</script>
<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 11;
  background: #000;
}
</style>