<script setup lang="ts">
defineProps<{
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}>()
</script>

<template>
  <div class="tooltip-container">
    <slot></slot>
    <span class="tooltip" :class="position || 'top'">{{ text }}</span>
  </div>
</template>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  visibility: hidden;
  position: absolute;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.tooltip-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.tooltip.top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
}

.tooltip.bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(8px);
}

.tooltip.left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(-8px);
}

.tooltip.right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(8px);
}

.tooltip::after {
  content: '';
  position: absolute;
  border: 5px solid transparent;
}

.tooltip.top::after {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: var(--vp-c-bg-soft);
}

.tooltip.bottom::after {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: var(--vp-c-bg-soft);
}

.tooltip.left::after {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: var(--vp-c-bg-soft);
}

.tooltip.right::after {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: var(--vp-c-bg-soft);
}
</style>