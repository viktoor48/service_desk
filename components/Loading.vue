<script setup lang="ts"></script>

<template>
  <div class="loader-overlay">
    <div class="loader" />
  </div>
</template>

  <style scoped>
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Затемненная подложка */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader {
    border: 4px solid #f3f3f3; /* Светлый цвет кружка */
    border-top: 4px solid #3498db; /* Цвет кружка */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite; /* Анимация вращения */
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
