<template>
  <div class="main-content home">
    <section class="hero-section">
      <div class="hero-section__heading">
        <h1>Local Grown Goodness</h1>
        <p class="subtitle">What more could you ask for?</p>
      </div>
    </section>
    <div class="container">
    <section class="section card-section">
        <transition-group 
          name="list" 
          tag="section" 
          class="card-list" 
          appear>
          <home-card 
            v-for="(card, i) in cards" 
            :key="card.title"
            :style="{ '--card-delay': i * 150 + 'ms' }"
            class="testestest"
            :card="card" />
        </transition-group>
    </section>
    <section class="section map-section">
      <div class="card card--horizontal card--large" data-aos="fade-up">
        <div ref="map" class="card__subject"></div>
          <!-- <bing-map ref="map" class="card__subject" :credentials="apiKey" :options="mapOptions">
              <bing-map-layer name="uk-layer" :visible="region == 'uk'">
                <bing-map-pushpin 
                  v-for="pin in ukPins" 
                  :key="pin.key"
                  :location="pin.location" 
                  :options="pin.options" />
              </bing-map-layer>
              <bing-map-layer name="us-layer" :visible="region == 'us'">
                <bing-map-pushpin 
                  v-for="pin in usPins" 
                  :key="pin.key"
                  :location="pin.location" 
                  :options="pin.options" />
              </bing-map-layer>
        </!-->
        <div class="card__content">
          <div class="card__header">
            <h3 class="card__heading">Come and Visit!</h3>
          </div>
          <div class="card__body">
            <p v-if="region == 'uk'">We currently have UK branches open across Scotland, England and Wales, so come and pay us a visit.</p>
            <p v-if="region == 'us'">Originially based in the UK with branches all across the country, McIntire Fruit has opened its first US branch in Delaware.</p>
            <p>Not from the {{ region == 'uk' ? 'UK' : 'US' }}? Check out our other branches to find a McIntire Fruit near you!</p>
            <button 
              type="button"
              class="button button--outline button--primary button--icon-right"
              @click="$emit('update:region', region == 'uk' ? 'us' : 'uk')">
              McIntire Fruit {{ region == 'uk' ? 'United States' : 'United Kingdom' }}
              <i class="material-icons">arrow_forward</i>
            </button>
          </div>
        </div>
      </div>
    </section>

    </div>
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
  props: {
    region: String
  },
  data () {
    return {
      ukPins: [
        {
          key: 'pin1',
          location: {
            latitude: 53.014449,
            longitude: -2.176096
          },
          title: 'McIntire Fruit Stoke',
        },
        {
          key: 'pin2',
          location: {
            latitude: 55.850594,
            longitude: -4.239161
          },
          title: 'McIntire Fruit Glasgow'
        }
      ],
      usPins: [
        {
          key: 'pin1',
          location: {
            latitude: 38.549331,
            longitude: -75.575423
          },
          title: 'McIntire Fruit Delaware'
        }
      ],
      cards: [
        {
          title: 'Pick-Your-Own Produce',
          icon: {
            type: 'image',
            src: 'images/apple.png'
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
          body: "There's so much to do here at our farms. From strawberry picking to cider tasting, there's something for everyone!",
          button: {
            text: 'Discover Events',
            href: '/events'
          }
        },
        {
          title: 'Healthy life? Happy life.',
          icon: {
            type: 'material',
            src: 'sentiment_very_satisfied'
          },
          body: "What makes our juices oh so healthy? Why is eating healthy so important, anyway? Kids can learn more in our Kidzone area.",
          button: {
            text: 'Enter the Kidzone',
            href: '/kidzone'
          }
        }
      ],
      apiKey: 'AhPwvMqYz4CjOOuY4Hdx7sUroVpuGF-vC-oZxkJRgtyLlpDns8AUwe1TdHOnUfkk'
    }
  },
  computed: {
    mapOptions () {
      return {
        zoom: 4,
        center: {
          latitude: this.region == 'uk' ? 53.014449 : 38.549331,
          longitude: this.region == 'uk' ? -2.176096 : -75.575423
        },
        pins: this.region == 'uk' ? this.ukPins : this.usPins
      }
    }
  },
  methods: {
    reload () {
      this.loadMap();
    },
    async loadMap () {
      if (!window.Microsoft) {
        console.log('no map')
        setTimeout(() => { 
          return this.loadMap();
        }, 1000)
      } else {
        console.log('getting map')
        let map = new window.Microsoft.Maps.Map(this.$refs.map, {
          center: new window.Microsoft.Maps.Location(this.mapOptions.center.latitude, this.mapOptions.center.longitude),
          zoom: this.mapOptions.zoom
        });
  
        for (const pin of this.mapOptions.pins) {
          let pushpin = new window.Microsoft.Maps.Pushpin(
            new window.Microsoft.Maps.Location(pin.location.latitude, pin.location.longitude),
            { title: pin.title });
          map.entities.push(pushpin);
        }
      }

      
    }
  },
  mounted () {
    let mapScript = document.createElement('script');

    mapScript.setAttribute('src','http://www.bing.com/api/maps/mapcontrol?key=AhPwvMqYz4CjOOuY4Hdx7sUroVpuGF-vC-oZxkJRgtyLlpDns8AUwe1TdHOnUfkk');
    mapScript.setAttribute('async', true);
    mapScript.setAttribute('defer', true);

    document.head.appendChild(mapScript);
    this.loadMap();
  }
};
</script>

<style>
.home {
  --card-delay: 0ms;
}

.list-enter-active, .list-leave-active {
  transition: all 0.8s;
  transition-delay: var(--card-delay);
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>