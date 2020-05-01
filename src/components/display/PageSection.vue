<template>
  <section class="page-section">
    <div class="page-section__header" v-if="$slots.header || title">
      <slot name="header">
        <h2 v-if="title" class="page-section__heading">{{ title }}</h2>
      </slot>
    </div>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'PageSection',
  props: {
    title: String
  }
}
</script>