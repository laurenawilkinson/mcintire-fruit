<template>
  <div class="container">
    <page-section title="Currently Available">
      <loading-spinner v-if="loadingProducts" />
      <p v-else-if="products.length == 0">No products available.</p>
      <div v-else class="products-list">
        <product-card 
          v-for="(product, index) in products" 
          :key="index"
          :product="product"
          :image-contain="imageContain"
          :region-key="region" />
      </div>
    </page-section>
  </div>
</template>

<script>
import ProductCard from '@/components/display/ProductCard.vue'
import PageSection from '@/components/display/PageSection.vue'
import LoadingSpinner from '@/components/display/LoadingSpinner.vue'

export default {
  name: 'ProduceBasic',
  props: {
    products: Array,
    loadingProducts: Boolean,
    region: String,
    imageContain: Boolean
  },
  components: {
    ProductCard,
    PageSection,
    LoadingSpinner
  }
}
</script>