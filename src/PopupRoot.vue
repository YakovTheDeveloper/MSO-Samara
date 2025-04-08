<template>
    <BattleDescriptionShort v-show="store.currentPopup.value === 'description-short'" />
    <BattleDescriptionFull v-show="store.currentPopup.value === 'description-full'" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BattleDescriptionFull from './components/battle-description/BattleDescriptionFull.vue';
import BattleDescriptionShort from './components/battle-description/BattleDescriptionShort.vue';
import { usePopupStore } from './stores/counter';

const store = storeToRefs(usePopupStore())

</script>

<style scoped lang="scss"></style>