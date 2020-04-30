<template>
  <div class="main-content kidzone">
    <div class="kidzone__heading-container">
      <div class="kidzone__heading">
        <img src="../assets/lemon-slice.png" alt="Orange segment" />
        <h1>
          <span v-for="(l, i) in 'Kidzone'.slice()" :key="i" >{{ l }}</span>
        </h1>
        <img src="../assets/splash.png" alt="Orange Juice splash" />
      </div>
    </div>
    <div class="container">
      <section class="kidzone__card-container kidzone__card-container--right">
        <div class="kidzone-card">
          <h2 class="kidzone-card__heading">
            Ever tried fresh fruit juice?
          </h2>
          <div class="kidzone-card__content">
            Here at McIntire Fruit, you'll find the most fruitiest, most juiciest fruit juice you've ever tasted! Know why? Because our juice is made purely with our freshly squeezed, locally grown fruit, to bring you a juice both tasty and healthy! Adults can read more on our product page.
          </div>
          <div class="kidzone-card__image">
            <img src="../assets/kidzone-card-green-image.png" alt="Juice box" />
          </div>
        </div>
      </section>
      <section class="kidzone__card-container kidzone__card-container--left">
        <div class="kidzone-card">
          <h2 class="kidzone-card__heading">
            Pick a balanced diet!
          </h2>
          <div class="kidzone-card__content">
            Here at our farms, you have the opportunity to pick your own fruit and veggies to your heart's content. That's because juicy berries and leafy greens play an important role in keeping your body healthy and happy! Check out our interactive EatWell plate below.
          </div>
          <div class="kidzone-card__image">
            <img src="../assets/kidzone-card-orange-image.png" alt="Basket of fruit and vegetables" />
          </div>
        </div>
      </section>
      <section class="kidzone-eatwell__container">
        <div class="kidzone-plate__container">
          <div class="kidzone-plate">
            <img 
              src="../assets/pie-chart/carbs-segment.png"
              :class="{ 
                'kidzone-plate__section kidzone-plate__carbs': true, 
                'kidzone-plate__section--active': activeSection === 'carbs' }"
              @mouseover="activeSection = 'carbs'"
              @click="activeSection = 'carbs'" />
            <img 
              src="../assets/pie-chart/dairy-segment.png"
              :class="{ 
                'kidzone-plate__section kidzone-plate__dairy': true, 
                'kidzone-plate__section--active': activeSection === 'dairy' }"
              @mouseover="activeSection = 'dairy'"
              @click="activeSection = 'dairy'" />
            <img 
              src="../assets/pie-chart/fats-segment.png"
              :class="{ 
                'kidzone-plate__section kidzone-plate__fats': true, 
                'kidzone-plate__section--active': activeSection === 'fats' }"
              @mouseover="activeSection = 'fats'"
              @click="activeSection = 'fats'" />
            <img 
              class="kidzone-plate__meat" 
              src="../assets/pie-chart/meat-segment.png"
              :class="{ 
                'kidzone-plate__section kidzone-plate__meat': true, 
                'kidzone-plate__section--active': activeSection === 'meat' }"
              @mouseover="activeSection = 'meat'"
              @click="activeSection = 'meat'" />
            <img 
              src="../assets/pie-chart/fruitveg-segment.png"
              :class="{ 
                'kidzone-plate__section kidzone-plate__fruitveg': true, 
                'kidzone-plate__section--active': activeSection === 'fruitveg' }"
              @mouseover="activeSection = 'fruitveg'"
              @click="activeSection = 'fruitveg'" />
          </div>
        </div>
        <div :class="`kidzone-card kidzone-card--plate-info kidzone-card--${activeSection}`">
          <h2 class="kidzone-card__heading">{{ currentActiveSection.title }}</h2>
          <div class="kidzone-card__content">
            {{ currentActiveSection.content }}

            <img :src="`../images/kidzone/${activeSection}.jpg`" :alt="currentActiveSection.title" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Kidzone',
  data () {
    return {
      plateSections: {
        carbs: {
          title: 'Carbohydrates',
          content: "Carbohydrates are essential when it comes to energy, being the main source of energy in a healthy diet. Without them, our brains and body wouldn't have enough energy!"
        },
        dairy: {
          title: 'Dairy',
          content: "Dairy products are an excellent source of protein and calcium, focused on growing and maintaining good health for our bodies. If you're lactose intolerant, there are many lactose-free dairy alternatives!"
        },
        fats: {
          title: 'Fats',
          content: "Fats are actually really good for us - in small amounts! Fatty foods contain nutrients that give us a high amount of energy, but it is important to have not too much, or they can affect your health!"
        },
        meat: {
          title: 'Meat',
          content: "Meat and fish contain the protein we need to keep our body going. Protein is essential to grow and repair our bodies and stay healthy, as well as being a key source of energy."
        },
        fruitveg: {
          title: 'Fruit and Veg',
          content: "Fruits and veggies are naturally good for us, containing vitamins and minerals that help to keep you healthy. A healthy diet should contain at least five fruits or veggies a day!"
        },
      },
      activeSection: 'carbs'
    }
  },
  computed: {
    currentActiveSection () {
      return this.plateSections[this.activeSection];
    }
  },
  mounted () {
    window.scrollTo(0,0)
  }
}
</script>