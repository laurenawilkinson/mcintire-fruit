<template>
  <div :class="'info-bar ' + className">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBar',
  props: {
    className: String
  }
}
</script>