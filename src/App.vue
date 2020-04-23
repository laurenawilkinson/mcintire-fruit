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
  },
  created () {  
    let mapScript = document.createElement('script');

    mapScript.setAttribute('src','http://www.bing.com/api/maps/mapcontrol?key=AhPwvMqYz4CjOOuY4Hdx7sUroVpuGF-vC-oZxkJRgtyLlpDns8AUwe1TdHOnUfkk');
    mapScript.setAttribute('async', true);
    mapScript.setAttribute('defer', true);

    document.head.appendChild(mapScript);
  }
}
</script>