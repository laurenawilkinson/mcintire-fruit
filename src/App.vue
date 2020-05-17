<template>
  <div id="app">
    <alcohol-overlay 
      v-if="$route.params.produceSlug == 'homebrew-alcohol'"
      v-model="showAlcoholOverlay" />
    <the-header :region.sync="region" />
    <router-view :region.sync="region" ref="view" />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import AlcoholOverlay from '@/components/AlcoholOverlay.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    AlcoholOverlay
  },
  data () {
    return {
      region: 'uk',
      showAlcoholOverlay: false
    }
  },
  watch: {
    region () {
      if (this.$refs.view.reload) this.$refs.view.reload();
    },
    $route () {
      this.showAlcoholOverlay = this.$route.params.produceSlug == 'homebrew-alcohol';
    },
    showAlcoholOverlay (value) {
      value ? document.body.classList.add('has-overlay') : document.body.classList.remove('has-overlay')
    }
  },
  created () {  
    let mapScript = document.createElement('script');

    mapScript.setAttribute('src','https://www.bing.com/api/maps/mapcontrol?key=AhPwvMqYz4CjOOuY4Hdx7sUroVpuGF-vC-oZxkJRgtyLlpDns8AUwe1TdHOnUfkk');
    mapScript.setAttribute('async', true);
    mapScript.setAttribute('defer', true);

    document.head.appendChild(mapScript);
  }
}
</script>