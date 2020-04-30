<template>
  <div 
    :class="{
      'card card--bordered card--slim product-card': true,
      'product-card--upcoming': upcoming
    }">
    <div class="card__subject" :style="{
      'background-image': 'url(' + product.image + ')',
      'background-size': imageContain ? 'contain' : 'cover'
      }">
      <span v-if="upcoming">Coming soon</span>
    </div>
    <h3 class="card__heading">
      {{ product.title }}
    </h3>
    <div class="card__body product-detail" v-if="product.description || showMonthTag">
      <p v-if="product.description">{{ product.description }}</p>
      <span 
        v-if="showMonthTag" 
        :class="{
          tag: true, 
          'tag--primary': monthTag.key == 'all-year', 
          'tag--danger': monthTag.key == 'leaving-soon', 
          'tag--warning': monthTag.key == 'until' 
        }">
        {{ monthTag.text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object,
    upcoming: {
      type: Boolean,
      default: false
    },
    imageContain: {
      type: Boolean,
      default: false
    },
    regionKey: {
      type: String,
      default: 'uk'
    },
    currentMonth: String,
    upcomingMonth: String
  },
  computed: {
    showMonthTag () {
      return this.currentMonth && this.upcomingMonth;
    },
    monthTag () {
      if (!this.showMonthTag || !this.product) return;
      const firstMonth = this.product.regions[this.regionKey][0];
      const lastMonth = this.product.regions[this.regionKey][this.product.regions[this.regionKey].length - 1];

      if (this.product.regions[this.regionKey].length == 12)
        return {
          text: 'All Year',
          key: 'all-year'
        };
      else if (this.currentMonth == lastMonth)
        return {
          text: 'Leaving This Month',
          key: 'leaving-soon'
        };
      else {
        return {
            text: `${firstMonth} - ${lastMonth}`,
            key: 'until'
        };
      }
    }
  }
}
</script>