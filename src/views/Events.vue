<template>
  <div class="main-content events">
    <info-bar className="sticky--top">
      <div class="events-bar">
        <label class="static-label">Showing events for:</label>
        <div class="event-filters">
          <label 
            v-for="filter in filters" 
            :key="filter.value"
            :class="`event-filter event-filter--${filter.value}`">
            <input v-model="selectedFilters" :value="filter.value" type="checkbox" />
            <span class="event-filter__label">
              <i class="material-icons">{{ filter.icon }}</i>
              {{ filter.label }}
            </span>
          </label>
          <label class="event-filter">
            <input type="checkbox" :checked="selectedFilters.length === 3" @change="setFilters" />
            <span class="event-filter__label">
              {{ selectedFilters.length === 3 ? 'Hide All' : 'Show All' }}
            </span>
          </label>
        </div>
        <label class="static-label d-flex">
          <i class="material-icons">date_range</i> During:
        </label>
        <dropdown v-model="timeframe" :options="timeframeOptions" filled />
      </div>
    </info-bar>
    <div class="container">
      <p v-if="selectedFilters.length === 0" class="page-section">No categories selected. Please select at least one category to view events.</p>
      <section v-else class="page-section" v-for="month in selectedMonths" :key="month">
        <h2 class="page-section__heading">{{ month }}</h2>
        <p v-if="getEvents(month).length === 0">No events of the selected categories scheduled.</p>
        <div class="event-list" v-else>
          <event-card 
            v-for="event in getEvents(month)" 
            :key="event.date.day"
            :event="event" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Events from '@/assets/events.json'
import InfoBar from '@/components/display/InfoBar.vue'
import EventCard from '@/components/display/EventCard.vue'
import Dropdown from '@/components/inputs/Dropdown.vue'

class DatedEvent {
  constructor (eventKey, month, day) {
    const e = Events.find(x => x.key === eventKey);

    this.title = e.name || null;
    this.category = {
      key: e.category || null,
      name: this.getCategoryName(e.category),
      icon: this.getIcon(e.category)
    };
    this.description = e.description || null;
    this.imgSrc = e.imgSrc || null;
    this.price = e.price || null;
    this.pricePer = e.pricePer || null;
    this.date = {
      month,
      day,
      time: e.time || null
    };
  }

  getCategoryName (category) {
    switch (category) {
      case 'children':
        return 'Children';
      case 'families':
        return 'Families';
      case 'adults': 
        return 'Adults Only';
      default:
        return null; 
    }
  }

  getIcon (category) {
    switch (category) {
      case 'children':
        return 'child_care';
      case 'families':
        return 'people';
      case 'adults': 
        return 'local_bar';
      default:
        return null; 
    }
  }
}

export default {
  name: 'Events',
  components: {
    InfoBar,
    Dropdown,
    EventCard
  },
  data () {
    return {
      scheduledEvents: [],
      filters: [
        {
          value: 'children',
          label: 'Children',
          icon: 'child_care'
        },
        {
          value: 'families',
          label: 'Families',
          icon: 'people'
        },
        {
          value: 'adults',
          label: 'Adults Only',
          icon: 'local_bar'
        }
      ],
      selectedFilters: [ 'children', 'families' ],
      timeframe: 'three-months',
      timeframeOptions: [
        {
          value: 'three-months',
          text: 'Next Three Months'
        },
        {
          value: 'upcoming',
          text: 'All Upcoming Events'
        }
      ]
    }
  },
  computed: {
    displayedEvents () {
      return this.scheduledEvents
        .filter(x => this.selectedFilters.includes(x.category.key));
    },
    selectedMonths () {
      switch (this.timeframe) {
        case 'three-months':
          return [ 'May', 'June', 'July' ]
        case 'upcoming':
          return [ 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
        default:
          return [ 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
      }
    }
  },
  methods: {
    setFilters (e) {
      e.target.checked ? 
        this.selectedFilters = [ 'children', 'families', 'adults' ] :
        this.selectedFilters = [ ]
    },
    getEvents (month) {
      return this.displayedEvents.filter(x => month === x.date.month);
    }
  },
  mounted () {
    this.scheduledEvents = [
      new DatedEvent('farm-and-games', 'May', 'Friday 1st'),
      new DatedEvent('plantathon', 'May', 'Wednesday 6th'),
      new DatedEvent('cook-along', 'May', 'Monday 11th'),
      new DatedEvent('farm-and-games', 'May', 'Friday 15th'),
      new DatedEvent('cider-tasting', 'June', 'Saturday 6th'),
      new DatedEvent('farm-and-games', 'June', 'Friday 12th'),
      new DatedEvent('cocktails', 'June', 'Saturday 13th'),
      new DatedEvent('farm-and-games', 'August', 'Friday 7th'),
    ]
  }
}
</script>
