<template>
  <div class="main-content produce">
    <div class="page-header">
      <div class="container">
        <h3 class="subtitle">Pick-Your-Own Produce</h3>
        <h1>{{ title }}</h1>
      </div>
    </div>
    <info-bar v-if="!merchPage">
      <span class="text-with-icon text-with-icon--block">
        <i class="material-icons">info</i>
        <span>To ensure we provide the freshest, most tastiest produce possible, certain produce may only be available during specific seasons.</span> 
      </span>
    </info-bar>
    <div class="container">
      <page-section :title="merchPage ? 'Currently Available' : currentMonth">
        <p v-if="loadingProducts">Loading products...</p>
        <p v-else-if="currentMonthlyProducts.length == 0">No products available.</p>
        <div v-else class="products-list">
          <product-card 
            v-for="(product, index) in currentMonthlyProducts" 
            :key="index"
            :product="product"
            :current-month="currentMonth"
            :upcoming-month="upcomingMonth"
            :image-contain="merchPage"
            :region-key="region" />
        </div>
      </page-section>
      <page-section v-if="$route.params.produceSlug !== 'merchandise'">
        <template v-slot:header>
          <h2 class="page-section__heading">Upcoming in {{ upcomingMonth }}</h2>
          <dropdown 
            v-if="monthOptions.length > 0"
            v-model="upcomingMonth" 
            :options="monthOptions" 
            static-width 
            show-active
            position="right" />
        </template>
        <p v-if="loadingProducts">Loading products...</p>
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

class Product {
  constructor (product, regions, months) {
    this.title = product.title.rendered;
    this.type = product.acf.type; 
    this.description = product.acf.description; 
    this.image = product.acf.image;
    this.regions = this.getRegions(product.region, regions, product.acf, months)
  }

  getRegions (productRegions, regions, acf, allMonths) {
    let r = {};

    for (const region of regions) {
      const key = region.name.toLowerCase();
      let filteredMonths = acf[key + '-months'] || [];
      r[key] = this.getMonths(filteredMonths, allMonths)
    }

    return r;
  }

  getMonths (productMonths, allMonths) {    
    let months = [];
    
    productMonths.forEach(m => {
      const found = allMonths.find(x => x.name == m);
      if (found !== undefined)
        months.push({ 
          name: found.name,
          monthKey: found.monthKey
        })
    });

    return months
      .sort((a, b) => isNaN(a.monthKey) || isNaN(b.monthKey)
        ? 0
        : a.monthKey - b.monthKey)
      .map(x => x.name)
  }
}

export default {
  name: 'Produce',
  components: {
    InfoBar,
    PageSection,
    ProductCard,
    Dropdown
  },
  props: ['region'],
  data () {
    return {
      products: null,
      months: [],
      currentMonth: new Date().toLocaleString('en-us', { month: 'long' }),
      upcomingMonth: null,
      productsLink: null,
      loadingProducts: true,
      monthsLink: 'http://localhost/mcintire-fruit/wp-json/wp/v2/month?per_page=12',
      regionsLink: 'http://localhost/mcintire-fruit/wp-json/wp/v2/region',
      productLinks: [
        {
          text: 'Fruit and Veg',
          slug: 'fruit-and-veg'
        },
        {
          text: 'Fruit Juices',
          slug: 'fruit-juices'
        },
        {
          text: 'Homebrew Alcohol',
          slug: 'homebrew-alcohol'
        },
        {
          text: 'Merchandise',
          slug: 'merchandise'
        },
      ]
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    merchPage () {
      return this.$route.params.produceSlug == 'merchandise';
    },
    title () {
      const found = this.productLinks.find(x => x.slug == this.$route.params.produceSlug);

      return found ? found.text : 'Produce';
    },
    currentMonthlyProducts () {
      return this.getMonthlyProducts(this.currentMonth);
    },
    upcomingMonthlyProducts () {
      return this.getMonthlyProducts(this.upcomingMonth)
    },
    monthOptions () {
      return this.months.map(x => {
          return {
            text: x.name,
            value: x.name
          }
        }).filter(x => x.text !== this.currentMonth)
    }
  },
  methods: {
    getMonthlyProducts (month, disregardedMonth = null) {
      if (this.products === null) return [];

      return this.products
        .filter(x => x.regions[this.region].length > 0 && x.regions[this.region].includes(month) && !x.regions[this.region].includes(disregardedMonth))
        .sort((a, b) => a.title.localeCompare(b.title));
    },
    async fetchData () {
      this.productsLink = `http://localhost/mcintire-fruit/wp-json/wp/v2/products?type=${this.$route.params.produceSlug}`;
      this.loadingProducts = true;
      await fetch(this.productsLink)
        .then(data => data.json())
        .then(data => { 
          this.products = data.map(x => new Product(x, this.regions, this.months));
          this.loadingProducts = false;
        })
        .catch(err => console.error(err))
    },
    async fetchMonths () {
      await fetch(this.monthsLink)
        .then(data => data.json())
        .then(data => { 
          this.months = data
            .map(x => {
              let key = new Date(x.name + ' 1 2020').getMonth();

              return {
                id: x.id,
                name: x.name,
                monthKey: key
              }
            })
            .sort((a, b) => 
              isNaN(a.monthKey) || isNaN(b.monthKey)
                ? 0
                : a.monthKey - b.monthKey)
        })
        .catch(err => console.error(err))
    },
    async fetchRegions () {
      await fetch(this.regionsLink)
        .then(data => data.json())
        .then(data => { 
          this.regions = data.map(x => {
            return {
              id: x.id,
              name: x.name
            }
          })
        })
        .catch(err => console.error(err))
    }
  },
  async created () {
    let dateNow = new Date();
    dateNow.setMonth(dateNow.getMonth() + 1, 1);
    this.upcomingMonth = new Date(dateNow).toLocaleString('en-us', { month: 'long' });

    await Promise.all([this.fetchMonths(), this.fetchRegions()])
    await this.fetchData()
  },
  mounted () {
    window.scrollTo(0,0)
  }
}
</script>