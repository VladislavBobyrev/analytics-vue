<template>
  <TheHeader/>
  <main>
    <router-view/>
  </main>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TheHeader from '@/components/TheHeader/TheHeader.vue'
// import AuthLayout from '@/layout/AuthLayout.vue'
// import MainLayout from '@/layout/MainLayout.vue'

export default {
  // components: { AuthLayout, MainLayout, TheHeader },
  components: { TheHeader },

  setup()
  {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout),
    }
  },
}
</script>