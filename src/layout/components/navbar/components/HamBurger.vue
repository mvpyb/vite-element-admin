<template>
  <div class="hamburger-section" @click="toggleClick">
    <svg-icon icon-class="hamburger" class-name="hamburger" :class="{ 'is-active': props.isActive }" />
  </div>
</template>

<script setup>
const props = defineProps( {
  isActive : {
    type : Boolean,
    default : false
  }
} )
const emit = defineEmits( ['toggleClick'] )

const toggleClick = () => {
  emit( 'toggleClick' )
}

defineOptions( {
  name : 'HamBurger'
} )
</script>

<style scoped lang="scss">
.hamburger-section {
  margin: 0 15px;
  height: 100%;
  line-height: 50px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }

  .hamburger.is-active {
    transform: rotate(180deg);
  }
}
</style>
