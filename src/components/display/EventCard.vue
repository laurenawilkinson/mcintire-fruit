<template>
  <div class="card card--bordered card--horizontal">
    <div class="card__subject">
      <img :src="'images/' + event.imgSrc" />
    </div>
    <div class="card__content">
      <div class="card__header">
        <h3 class="card__heading">{{ event.title }}</h3>
        <span :class="`event-filter event-filter--tag event-filter--${event.category.key}`">
          <i class="material-icons">{{ event.category.icon }}</i>
          {{ event.category.name }}
        </span>
      </div>
      <div class="card__body">
        <p>{{ event.description }}</p>
        <div>
          <label class="event-card__info-label">
            Per {{ event.pricePer }}
            <span class="event-card__info">
              {{ event.price }}
            </span>
          </label>
          <label class="event-card__info-label">
            {{ event.date.time }}
            <span class="event-card__info">
              {{ event.date.day }}
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: Object
  }
}
</script>