<template>
  <header class="header">
    <div class="container">
      <div class="header__logo">
        <router-link to="/">
          <span>McIntire</span>
          <span class="header__logo--alt-color">
            Fruit
          </span>
        </router-link> 
      </div>
      <div class="header__nav">  
        <div 
          v-on-clickaway="hideProduceDropdown"
          class="dropdown dropdown--primary header__nav-link" 
          @click="showProduce = !showProduce">
          <span class="dropdown__target">Produce <i class="material-icons">keyboard_arrow_down</i></span>
          <transition mode="out-in" name="fade-down-center">
            <ul 
              v-if="showProduce" 
              class="dropdown__items">
              <li v-for="link in productLinks" :key="link.slug">
                <router-link 
                  class="dropdown__item"
                  :to="{ 
                    name: 'Produce', 
                    params:  { 
                      produceSlug: link.slug
                    } 
                  }">{{ link.text }}</router-link>
              </li>
            </ul>
          </transition>
        </div>
        <router-link to="/events" class="header__nav-link">Events</router-link>
        <router-link to="/kidzone" class="header__nav-link">Kidzone</router-link>
      </div>
      <div class="header__contact">
        <span class="text-with-icon ">
          <i class="material-icons">phone</i>
          <span>0141 123 4567</span>
        </span>
      </div>
      <div class="header__region">
        <div class="region-select" v-on-clickaway="hideRegionSelect">
          <button 
            type="button" 
            class="region-select__button button--icon-left button--icon-right"
            @click="showRegionSelect = !showRegionSelect">
            <i class="material-icons region-select__icon">language</i>
            <span class="region-select__text">{{ selectedRegion.text }}</span>
            <i class="material-icons">keyboard_arrow_down</i>
          </button>
          <transition mode="out-in" name="fade-down">
            <ul class="region-select__options" v-if="showRegionSelect">
              <li 
                v-for="opt in regionOptions" 
                :key="opt.value"
                :class="{
                  'region-select__option': true,
                  active: opt.value == headerRegion
                }"
                @click="setActiveRegion(opt.value)">{{ opt.text }}</li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: "TheHeader",
  mixins: [ clickaway ],
  props: {
    region: String
  },
  data () {
    return {
      showProduce: false,
      showRegionSelect: false,
      regionOptions: [
        {
          value: 'uk',
          text: 'United Kingdom'
        },
        {
          value: 'us',
          text: 'United States'
        }
      ],
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
  computed: {
    selectedRegion () {
      return this.regionOptions.find(x => x.value == this.region);
    },
    headerRegion: {
      get () {
        return this.region;
      },
      set (value) {
        return this.$emit('update:region', value);
      }
    }
  },
  methods: {
    hideProduceDropdown () {
      this.showProduce = false;
    },
    hideRegionSelect () {
      this.showRegionSelect = false;
    },
    setActiveRegion (value) {
      this.headerRegion = value;
      this.hideRegionSelect();
    }
  }
};
</script>