<template>
    <div class="control-button">
        <ControlButtonBackgroundIcon class="control-button-bg" />
        <span class="control-button-content">
            <slot></slot>
        </span>
    </div>
</template>

<script setup lang="ts">
import ControlButtonBackgroundIcon from '@/assets/icons/ControlButtonBackgroundIcon.vue';


</script>

<style scoped lang="scss">
.control-button {
    width: 165px;
    height: 165px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;


    &-content {
        z-index: 1;
    }

    &-bg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>