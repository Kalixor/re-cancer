<script setup lang="ts">
import { ref } from 'vue'
import Tooltip from './Tooltip.vue'

const likes = ref(0)
const comments = ref(0)
const reviews = ref(0)

const handleLike = () => {
  likes.value++
}

const handleComment = () => {
  comments.value++
}

const handleReview = () => {
  reviews.value++
}

const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Thérapeutique du Cancer',
        text: 'Des solutions naturelles, pourtant simples et efficaces !',
        url: window.location.href
      })
    } catch (err) {
      console.log('Error sharing:', err)
    }
  }
}
</script>

<template>
  <div class="social-actions-wrapper">
    <div class="social-actions">
      <Tooltip text="Aimez cet article">
        <button @click="handleLike" class="action-button">
          <span class="icon">♡</span>
          <span class="count">{{ likes }}</span>
        </button>
      </Tooltip>
      
      <Tooltip text="Laissez un commentaire">
        <button @click="handleComment" class="action-button">
          <span class="icon">💭</span>
          <span class="count">{{ comments }}</span>
        </button>
      </Tooltip>
      
      <Tooltip text="Donnez votre avis">
        <button @click="handleReview" class="action-button">
          <span class="icon">☆</span>
          <span class="count">{{ reviews }}</span>
        </button>
      </Tooltip>
      
      <Tooltip text="Partagez cet article">
        <button @click="handleShare" class="action-button">
          <span class="icon">↗</span>
        </button>
      </Tooltip>
    </div>
  </div>
</template>

<style scoped>
.social-actions-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.social-actions {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: var(--vp-c-bg-mute);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--vp-c-text-2);
}

.action-button:hover {
  transform: scale(1.05);
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
}

.action-button:active {
  transform: scale(0.95);
}

.icon {
  font-size: 1.2rem;
  line-height: 1;
}

.count {
  font-size: 0.9rem;
  font-weight: 500;
  min-width: 1rem;
  text-align: center;
}

@media (max-width: 640px) {
  .social-actions {
    gap: 0.5rem;
    padding: 0.4rem;
  }
  
  .action-button {
    padding: 0.4rem 0.8rem;
  }
  
  .icon {
    font-size: 1.1rem;
  }
  
  .count {
    font-size: 0.8rem;
  }
}
</style>