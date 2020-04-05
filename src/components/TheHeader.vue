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
          v-on-clickaway="hideDropdown"
          class="dropdown header__nav-link" 
          @click="showProduce = !showProduce">
          <span class="dropdown__target">Produce <i class="material-icons">keyboard_arrow_down</i></span>
          <transition mode="out-in" name="fade">
            <ul 
              v-if="showProduce" 
              class="dropdown__items">
              <li class="dropdown__item">
                <router-link to="/produce">Fruit and Veg</router-link>
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
        <i class="region-select__icon material-icons">language</i>
        <div class="region-select">
          <select>
            <option>United Kingdom</option>
            <option>United States</option>
          </select>
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
  data () {
    return {
      showProduce: false
    }
  },
  methods: {
    hideDropdown () {
      this.showProduce = false;
    }
  }
};
</script>