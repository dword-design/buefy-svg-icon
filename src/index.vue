<template>
  <component :is="iconName" aria-hidden="true" />
</template>

<script>
export default {
  computed: {
    iconName() {
      return `${this.icon[1]
        .replace(/-./g, x => x.toUpperCase()[1])
        .replace(/\b\w/g, c => c.toUpperCase())}Icon`;
    },
  },
  props: ['icon', 'size'],
};
</script>
