<template>
  <section class="auth">
    <h2>LeadHit</h2>
    <form @submit.prevent="">

      <label for="idSite">
        <input type="text" name="idSite" placeholder="Введите id сайта">
        <small>id сайта должен содержать 24 симовла</small>
      </label>

      <button class="btn">войти</button>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>