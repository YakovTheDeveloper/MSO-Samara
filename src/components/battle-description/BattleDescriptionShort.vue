<template>
    <div :class="classes">
        <div class="battle-description-short__main">
            <h2 class="title s">Описание битвы</h2>
            <p class="battle-description-short__main-text">
                {{ SHORT_DESCRIPTION }}
            </p>
        </div>
        <div class="battle-description-short__actions">
            <button></button>
            <button></button>
        </div>
    </div>
</template>

<script setup>
import { SHORT_DESCRIPTION } from '@/mock';
import { computed } from 'vue';


const classes = computed(() => ({
    'battle-description-short': true,
    'battle-description-short_right': true,

}))
</script>

<style lang="scss" scoped>
.battle-description-short {
    position: fixed;
    top: 0;
    width: 1200px;
    height: 2160px;
    // width: 31.25vw;
    width: 31.25%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 80px;

    background: url('@/assets/img/short-description-bg.png') no-repeat;
    background-color: transparent;

    &_left {}

    &_right {
        right: var(--container-padding);
    }

    &__main {
        display: flex;
        gap: 20px;
        flex-direction: column;

        &-text {
            height: 1048px;
            overflow: auto;
            word-break: break-word;
            white-space: normal;
        }
    }
}
</style>