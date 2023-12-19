<template>
  <component :is="tag" class="link" :to="to" :href="href">
    <slot />
  </component>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'UiLink',
  props: {
    tag: {
      type: [String, Object, Function],
      default: RouterLink
    },
    to: {
      type:[ String, Object],
    },
    content: {
      type: String
    },
    href: {
      type: String
    }
  }
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
