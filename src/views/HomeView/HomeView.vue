<template>
  <section class="home">
    <h2>analytics</h2>

    <app-chart>
    </app-chart>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppChart from '@/components/AppСhart/AppChart.vue'

export default defineComponent({
  name: 'HomeView',
  components: { AppChart },
})
</script>