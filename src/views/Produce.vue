<template>
  <div class="main-content produce">
    <div class="page-header">
      <div class="container">
        <h3 class="subtitle">Pick-Your-Own Produce</h3>
        <h1>{{ products }}</h1>
      </div>
    </div>
    <info-bar>
      <span class="text-with-icon text-with-icon--block">
        <i class="material-icons">info</i>
        <span>To ensure we provide the freshest, most tastiest produce possible, certain produce may only be available during specific seasons.</span> 
      </span>
    </info-bar>
    <div class="container">
      <page-section :title="products">
        <div class="products-list">
          <div class="card card--bordered card--slim">
            <div class="card__subject">
              <img src="../../public/images/cocktails.jpeg" />
            </div>
            <h3 class="card__heading">
              Apples
            </h3>
            <div class="card__body product-detail">
              Braeburn, Royal Gala
            </div>
          </div>
        </div>
      </page-section>
    </div>
  </div>
</template>

<script>
import InfoBar from '@/components/display/InfoBar.vue'
import PageSection from '@/components/display/PageSection.vue'

export default {
  name: 'Produce',
  components: {
    InfoBar,
    PageSection
  },
  data () {
    return {
      products: null
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.products = this.$route.params.produceSlug;
    }
  },
  created () {
    this.fetchData();
  }
}
</script>