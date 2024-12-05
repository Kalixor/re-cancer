<script setup lang="ts">
import { ref } from 'vue'

const likes = ref(0)

const handleLike = () => {
  likes.value++
}
</script>

<template>
  <div class="like-counter">
    <button @click="handleLike" class="like-button">
      <span class="heart">❤️</span>
      <span class="count">{{ likes }}</span>
    </button>
  </div>
</template>

<style scoped>
.like-counter {
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
}

.like-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.1s ease;
}

.like-button:hover {
  transform: scale(1.05);
}

.like-button:active {
  transform: scale(0.95);
}

.heart {
  font-size: 1.2rem;
}

.count {
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}
</style>