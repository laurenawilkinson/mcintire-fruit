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
      if (this.$route.params.produceSlug == 'homebrew-alcohol') {
        document.body.classList.add('has-overlay')
        this.showAlcoholOverlay = true;
      } else {
        document.body.classList.remove('has-overlay')
        this.showAlcoholOverlay = false;
      }
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