<template>
  <div class="main-content produce">
    <div class="page-header">
      <div class="container">
        <h3 class="subtitle">Pick-Your-Own Produce</h3>
        <h1>{{ title }}</h1>
      </div>
    </div>
    <produce-basic
      v-if="pageTypeEquals('merchandise') || pageTypeEquals('fruit-juices')"
      :loading-products="loadingProducts"
      :products="currentProducts"
      :region="region"
      :image-contain="pageTypeEquals('merchandise')" />
    <produce-categories
      v-if="pageTypeEquals('homebrew-alcohol')"
      :loading-products="loadingProducts"
      :products="currentProducts"
      :region="region"
      :categories-link="alcoholCategoriesLink" />
    <produce-monthly
      v-if="pageTypeEquals('fruit-and-veg')"
      v-bind="{
        loadingProducts,
        currentMonthlyProducts,
        upcomingMonthlyProducts,
        currentMonth,
        months,
        region  
      }"
      :upcoming-month.sync="upcomingMonth" />
  </div>
</template>

<script>
import ProduceBasic from '@/views/ProduceBasic.vue'
import ProduceMonthly from '@/views/ProduceMonthly.vue'
import ProduceCategories from '@/views/ProduceCategories.vue'

class Product {
  constructor (product, regions, months) {
    this.title = product.title.rendered;
    this.type = product.acf.type; 
    this.description = product.acf.description; 
    this.image = product.acf.image;
    this.productRegions = this.getProductRegions(product.region, regions);
    this.regions = this.getRegions(product.region, regions, product.acf, months);

    if (this.type == 'homebrew-alcohol')
      this.alcoholType = product.alcohol_type[0];
  }

  getProductRegions (productRegions, allRegions) {
    return productRegions.map(r => {
      const found = allRegions.find(x => x.id == r);
      return found.name.toLowerCase() || null;
    })
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
    ProduceBasic,
    ProduceMonthly,
    ProduceCategories
  },
  props: ['region'],
  data () {
    return {
      products: null,
      months: [],
      alcoholCategories: [],
      currentMonth: new Date().toLocaleString('en-us', { month: 'long' }),
      upcomingMonth: null,
      productsLink: null,
      loadingProducts: true,
      monthsLink: 'http://localhost/mcintire-fruit/wp-json/wp/v2/month?per_page=12',
      alcoholCategoriesLink: 'http://localhost/mcintire-fruit/wp-json/wp/v2/alcohol_type',
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
    title () {
      const found = this.productLinks.find(x => x.slug == this.$route.params.produceSlug);

      return found ? found.text : 'Produce';
    },
    currentProducts () {
      return this.products !== null ? 
        this.products.filter(x => x.productRegions.includes(this.region)) :
        [];
    },
    currentMonthlyProducts () {
      return this.getMonthlyProducts(this.currentMonth);
    },
    upcomingMonthlyProducts () {
      return this.getMonthlyProducts(this.upcomingMonth)
    },
    monthOptions () {
      return this.months !== null ?
        this.months.map(x => {
          return {
            text: x.name,
            value: x.name
          }
        }).filter(x => x.text !== this.currentMonth)
        : [];
    }
  },
  methods: {
    pageTypeEquals (slug) {
      return this.$route.params.produceSlug == slug;
    },
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