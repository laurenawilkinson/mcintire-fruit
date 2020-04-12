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
    </div>
  </div>
</template>
