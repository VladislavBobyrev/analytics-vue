
<template>
  <section class="auth">
    <h2>LeadHit</h2>
    <form @submit.prevent>

      <label  for="password">id сайта</label>
      <input type="password" id="password" v-model="password"  @blur="pBlur" placeholder="id сайта" autocomplete="password">
      <small v-if="isPasswordError">{{pError}}</small>

      <button class="btn" type="submit" @click="loginUp">войти</button>
    </form>
  </section>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch,
} from 'vue'
import loginForm from '@/use/login-form'

export default defineComponent({

  setup()
  {
    const {
      pError, password, pBlur, onSubmit,
    } = loginForm()

    // флаг для показа неверно введенных данных в input password
    const isPasswordError = ref(false)

    const loginUp = async () =>
    {
      if (password.value?.length === 24)
      {
        await onSubmit()
      }
      isPasswordError.value = true
    }

    watch(password, () => isPasswordError.value = false)

    return {
      pBlur,
      pError,
      password,
      loginUp,
      isPasswordError,
    }
  },
})
</script>