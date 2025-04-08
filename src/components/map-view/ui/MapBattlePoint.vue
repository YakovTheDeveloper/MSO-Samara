<template>
    <div class="map-battle-point">
        <BattleIcon />
    </div>
</template>

<script setup lang="ts">
import BattleIcon from '@/assets/icons/BattleIcon.vue';


</script>

<style scoped lang="scss">
.map-battle-point {


    &_active {
        box-shadow: 0px 0px 90px rgba(180, 32, 36, 0.8);
        width: 255px;
        height: 255px;
    }

}
</style>