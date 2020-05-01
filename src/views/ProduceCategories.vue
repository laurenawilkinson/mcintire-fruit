<template>
  <div class="container">
    <page-section v-if="loadingProducts || noProducts">
      <p v-if="loadingProducts">Loading products...</p>
      <p v-else-if="noProducts">No products available.</p>
    </page-section>
    <div v-for="(category, index) in categories" :key="index">
      <page-section 
        v-if="getProducts(category.id).length > 0"
        :title="category.name">
        <div class="products-list">
          <product-card 
            v-for="(product, index) in getProducts(category.id)" 
            :key="index"
            :product="product"
            :region-key="region" />
        </div>
      </page-section>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/display/ProductCard.vue'
import PageSection from '@/components/display/PageSection.vue'

export default {
  name: 'ProduceCategories',
  components: {
    PageSection,
    ProductCard
  },
  props: {
    categoriesLink: String,
    loadingProducts: Boolean,
    products: Array,
    region: String
  },
  data () { 
    return {
      categories: []
    }
  },
  computed: {
    noProducts () {
      let noProducts = true;
      this.categories.forEach(x => {
        if (this.getProducts(x.id).length > 0)
          noProducts = false;
      })

      return noProducts;
    }
  },
  methods: {
    getProducts (category) {
      return this.products.filter(x => x.alcoholType == category);
    }
  },
  async mounted () {
    await fetch(this.categoriesLink)
        .then(data => data.json())
        .then(data => {
          this.categories = data
            .map(x => {
              return {
                id: x.id,
                name: x.name
              }
            })
            .sort((a, b) => a.name.localeCompare(b.name))
        })
        .catch(err => console.error(err))
  }
}
</script>