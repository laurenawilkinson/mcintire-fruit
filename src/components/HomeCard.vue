<template>
  <div class="card">
    <div class="card__header">
      <div class="card__icon">
        <i 
          v-if="card.icon.type == 'material'" 
          class="material-icons">
          {{ card.icon.src }}
        </i>
        <img v-else :src="card.icon.src" />
      </div>
      <h3 class="card__heading">
        {{ card.title }}
      </h3>
    </div>
    <div class="card__body">
      {{ card.body }}
    </div>
    <div class="card__footer">
      <router-link 
        :to="card.button.href" 
        class="button button--primary">
        {{ card.button.text }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCard',
  props: {
    card: Object
  }
}
</script>

<style scoped>
.card__header {
    text-align: center;
  }

  .card__body {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  .card__footer {
    text-align: center;
    margin-bottom: 2rem;
  }
</style>