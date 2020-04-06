<template>
  <div class="main-content home">
    <section class="hero-section">
      <div class="hero-section__heading">
        <h1>Local Grown Goodness</h1>
        <p class="subtitle">What more could you ask for?</p>
      </div>
    </section>
    <section class="section card-section">
      <div class="container">
        <section class="card-list">
          <home-card v-for="(card, i) in cards" :key="i" :card="card" />
        </section>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeCard from '@/components/HomeCard.vue'

export default {
  name: "Home",
  components: {
    HomeCard
  },
  data () {
    return {
      cards: [
        {
          title: 'Pick-Your-Own Produce',
          icon: {
            type: 'material',
            src: 'explore'
          },
          body: "We happily invite you to our farms to hand-pick your own fresh fruits and veggies. Browse our available seasonal produce!",
          button: {
            text: 'View Current Produce',
            href: '/produce'
          }
        },
        {
          title: 'Organic Opportunities',
          icon: {
            type: 'material',
            src: 'date_range'
          },
          body: "There's so much to do here at our farms. From strawberry picking to cider tasting, there's something for everyone.",
          button: {
            text: 'Discover Events',
            href: '/events'
          }
        },
        {
          title: 'Healthy life? Happy life.',
          icon: {
            type: 'material',
            src: 'explore'
          },
          body: "What makes our juices oh so healthy? Why is eating healthy so important, anyway? Kids can learn more in our Kidzone area.",
          button: {
            text: 'Enter the Kidzone',
            href: '/kidzone'
          }
        }
      ]
    }
  }
};
</script>
