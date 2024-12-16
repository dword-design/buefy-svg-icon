<template>
  <component :is="iconName" aria-hidden="true" />
</template>

<script>
export default {
  computed: {
    iconName() {
      if (typeof this.icon[1] === 'string') {
        return `${this.icon[1]
          .replace(/-./g, x => x.toUpperCase()[1])
          .replace(/\b\w/g, c => c.toUpperCase())}Icon`;
      }
      return this.icon[1];
    },
  },
  props: ['icon', 'size'],
};
</script>
