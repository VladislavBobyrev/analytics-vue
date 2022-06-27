<template>
  <header>
    <div class="logotype">Analytics</div>
    <button class="btn" v-if="isAuthenticated" @click="logout()">выйти</button>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup()
  {
    const store = useStore()
    const router = useRouter()

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const logout = () =>
    {
      store.commit('auth/logout')
      router.push('/auth')
    }

    return {
      logout,
      isAuthenticated,
    }
  },
})
</script>