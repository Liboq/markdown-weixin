<template>
  <div class="notebook-decor" aria-hidden="true">
    <div class="notebook-decor__red-margin"></div>
    <ul class="notebook-decor__holes">
      <li v-for="i in 8" :key="i"></li>
    </ul>
    <svg class="notebook-decor__doodle" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 80 C 40 20, 80 20, 110 80 S 180 120, 190 70" stroke="#3D2914" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".15"/>
      <circle cx="46" cy="46" r="6" stroke="#3D2914" stroke-width="1.5" fill="none" opacity=".18"/>
      <path d="M150 20 q10 10 0 20 q-10 10 0 20" stroke="#3D2914" stroke-width="1.5" fill="none" opacity=".12"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.notebook-decor {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.notebook-decor__red-margin {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 72px;
  width: 2px;
  background: rgba(252, 165, 165, 0.6);
}

.notebook-decor__holes {
  position: absolute;
  left: 24px;
  top: 80px;
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-auto-rows: 56px;
}

.notebook-decor__holes li {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e6dfd2; /* paper shadow */
  box-shadow: inset 0 0 0 2px #d9d0bf, 0 1px 0 rgba(0, 0, 0, 0.04);
  margin: 12px 0;
}

.notebook-decor__doodle {
  position: absolute;
  right: 24px;
  bottom: 24px;
  width: 180px;
  height: auto;
}

@media (max-width: 960px) {
  .notebook-decor__red-margin { display: none; }
  .notebook-decor__holes { display: none; }
  .notebook-decor__doodle { display: none; }
}
</style>