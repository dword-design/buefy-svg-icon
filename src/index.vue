<template>
  <component :is="iconName" aria-hidden="true" />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{ icon: string[]; size: string }>();

const iconName = computed(() => {
  if (typeof props.icon[1] === 'string') {
    return `${props.icon[1]
      .replaceAll(/-./g, x => x.toUpperCase()[1])
      .replaceAll(/\b\w/g, c => c.toUpperCase())}Icon`;
  }

  return props.icon[1];
});
</script>
