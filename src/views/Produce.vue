<template>
  <div class="main-content produce">
    <div class="page-header">
      <div class="container">
        <h3 class="subtitle">Pick-Your-Own Produce</h3>
        <h1>{{ $route.params.produceSlug }}</h1>
      </div>
    </div>
    <info-bar>
      <span class="text-with-icon text-with-icon--block">
        <i class="material-icons">info</i>
        <span>To ensure we provide the freshest, most tastiest produce possible, certain produce may only be available during specific seasons.</span> 
      </span>
    </info-bar>
    <div class="container">
      <page-section :title="currentMonth">
        <div class="products-list">
          <product-card 
            v-for="(product, index) in currentMonthlyProducts" 
            :key="index"
            :product="product" />
        </div>
      </page-section>
      <page-section>
        <template v-slot:header>
          <h2 class="page-section__heading">Upcoming in {{ upcomingMonth }}</h2>
          <dropdown 
            v-model="upcomingMonth" 
            :options="monthOptions" 
            static-width 
            position="right" />
        </template>
        <div class="products-list">
          <product-card 
            v-for="(product, index) in upcomingMonthlyProducts" 
            :key="index"
            :product="product" />
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
  constructor (product, months) {
    this.title = product.title.rendered;
    this.type = product.acf.type; 
    this.description = product.acf.description; 
    this.image = product.acf.image;
    this.months = this.getMonths(
        product.month, 
        months);
  }

  getMonths (productMonths, allMonths) {    
    let months = [];
    
    productMonths.forEach(m => {
      const found = allMonths.find(x => x.id === m);
      if (found !== undefined)
        months.push(found.name)
    });

    return months;
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
  data () {
    return {
      products: null,
      months: [],
      currentMonth: new Date().toLocaleString('en-us', { month: 'long' }),
      upcomingMonth: null,
      productsLink: null,
      monthsLink: 'http://localhost/mcintire-fruit/wp-json/wp/v2/month?per_page=12'
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    currentMonthlyProducts () {
      return this.getMonthlyProducts(this.currentMonth);
    },
    upcomingMonthlyProducts () {
      return this.getMonthlyProducts(this.upcomingMonth, this.currentMonth)
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
        .filter(x => x.months.includes(month) && !x.months.includes(disregardedMonth));
    },
    async fetchData () {
      this.productsLink = `http://localhost/mcintire-fruit/wp-json/wp/v2/products?type=${this.$route.params.produceSlug}`;
      await fetch(this.productsLink)
        .then(data => data.json())
        .then(data => { 
          this.products = data.map(x => new Product(x, this.months));
        })
        .catch(err => console.error(err))
    },
    async fetchMonths () {
      await fetch(this.monthsLink)
        .then(data => data.json())
        .then(data => { 
          this.months = data
            .map(x => {
              return {
                id: x.id,
                name: x.name
              }
            })
            .sort((a, b) => {
              let aNumber = new Date(a.name + ' 1 2020').getMonth();
              let bNumber = new Date(b.name + ' 1 2020').getMonth();

              return isNaN(aNumber) || isNaN(bNumber)
                ? 0
                : aNumber - bNumber;
            })
        })
        .catch(err => console.error(err))
    }
  },
  async created () {
    let dateNow = new Date();
    dateNow.setMonth(dateNow.getMonth() + 1, 1);
    this.upcomingMonth = new Date(dateNow).toLocaleString('en-us', { month: 'long' });

    await this.fetchMonths()
    await this.fetchData()
  }
}
</script>