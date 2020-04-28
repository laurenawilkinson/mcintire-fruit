<template>
  <div class="card card--bordered card--slim">
    <div class="card__subject">
      <img src="../../../public/images/cocktails.jpeg" />
    </div>
    <h3 class="card__heading">
      {{ product.title }}
    </h3>
    <div class="card__body product-detail">
      {{ product.description }}
      All Year / leaving soon / here until { month }
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  }
}
</script>