<template>
  <div 
    :class="{ 
      dropdown: true, 
      'dropdown--filled': filled, 
      'dropdown--static-width': staticWidth,
      'dropdown--right': position == 'right'
    }" 
    v-on-clickaway="hideDropdown">
    <button 
      type="button" 
      class="dropdown__target button--icon-right"
      @click="showDropdown = !showDropdown">
      <span class="dropdown__text">{{ selectedOption.text }}</span>
      <i class="material-icons">keyboard_arrow_down</i>
    </button>
    <transition mode="out-in" name="fade-down">
      <ul class="dropdown__items" v-if="showDropdown">
        <li 
          v-for="opt in options" 
          :key="opt.value"
          :class="{
            dropdown__item: true,
            disabled: opt.disabled
          }"
          @click="selectOption(opt.value)">{{ opt.text }}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'Dropdown',
  mixins: [ clickaway ],
  props: {
    value: String,
    options: Array,
    filled: {
      type: Boolean,
      default: false
    },
    staticWidth: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      showDropdown: false
    }
  },
  computed: {
    selected: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    selectedOption () {
      return this.options.find(x => x.value === this.value) || {
        value: this.value,
        text: ''
      };
    }
  },
  methods: {
    hideDropdown () {
      this.showDropdown = false;
    },
    selectOption (value) {
      this.selected = value;
      this.showDropdown = false;
    }
  }
}
</script>