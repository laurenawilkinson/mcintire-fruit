<template>
  <div id="app">
    <the-header :region.sync="region" />
    <router-view :region.sync="region" ref="view" />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter
  },
  data () {
    return {
      region: 'uk'
    }
  },
  watch: {
    region () {
      if (this.$refs.view.reload) this.$refs.view.reload();
    }
  }
}
</script>