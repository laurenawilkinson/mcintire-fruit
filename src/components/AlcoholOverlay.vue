<template>
<div>
  <div class="overlay" v-show="value">
    <div class="modal">
      <h2>Wait a minute!</h2>
      <p>You must be 18 or over to view this page.</p>
      <div>
        <router-link class="button button--primary" to="/">Return to Home</router-link>
        <button class="button button--outline button--primary" @click="$emit('input', false)">
          I confirm I am aged 18 or over  
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'AlcoholOverlay',
  props: {
    value: Boolean
  }
}
</script>