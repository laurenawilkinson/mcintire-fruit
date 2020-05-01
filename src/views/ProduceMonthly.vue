<template>
<div>
  <info-bar>
    <span class="text-with-icon text-with-icon--block">
      <i class="material-icons">info</i>
      <span>To ensure we provide the freshest, most tastiest produce possible, certain produce may only be available during specific seasons.</span> 
    </span>
  </info-bar>
  <div class="container">
    <page-section :title="currentMonth">
      <loading-spinner v-if="loadingProducts" />
      <p v-else-if="currentMonthlyProducts.length == 0">No products available.</p>
      <div v-else class="products-list">
        <product-card 
          v-for="(product, index) in currentMonthlyProducts" 
          :key="index"
          :product="product"
          :current-month="currentMonth"
          :upcoming-month="upcomingMonth"
          :region-key="region" />
      </div>
    </page-section>
    <page-section>
      <template v-slot:header>
        <h2 class="page-section__heading">Upcoming in {{ upcomingMonth }}</h2>
        <dropdown 
          v-if="monthOptions.length > 0"
          v-model="localUpcomingMonth" 
          :options="monthOptions" 
          static-width 
          show-active
          position="right" />
      </template>
      <loading-spinner v-if="loadingProducts" />
      <p v-else-if="upcomingMonthlyProducts.length == 0">No new products available for this month.</p>
      <div v-else class="products-list">
        <product-card 
          v-for="(product, index) in upcomingMonthlyProducts" 
          :key="index"
          :product="product"
          :region-key="region"
          upcoming />
      </div>
    </page-section>
  </div>
</div>
</template>

<script>
import InfoBar from '@/components/display/InfoBar.vue'
import ProductCard from '@/components/display/ProductCard.vue'
import PageSection from '@/components/display/PageSection.vue'
import Dropdown from '@/components/inputs/Dropdown.vue'
import LoadingSpinner from '@/components/display/LoadingSpinner.vue'

export default {
  name: 'ProduceMonthly',
  components: {
    ProductCard,
    PageSection,
    Dropdown,
    InfoBar,
    LoadingSpinner
  },
  props: {
    currentMonthlyProducts: Array,
    upcomingMonthlyProducts: Array,
    region: String,
    currentMonth: String,
    upcomingMonth: String,
    loadingProducts: Boolean,
    months: Array
  },
  computed: {
    monthOptions () {
      return this.months.map(x => {
        return {
          text: x.name,
          value: x.name
        }
      }).filter(x => x.text !== this.currentMonth)
    },
    localUpcomingMonth: {
      get () {
        return this.upcomingMonth;
      },
      set (value) {
        this.$emit('update:upcomingMonth', value)
      }
    }
  }
}
</script>