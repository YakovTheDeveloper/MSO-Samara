<template>
    <div v-if="currentBattle" :class="classes">
        <header class="battle-description-short__heading" :style="{
            backgroundImage: `url(${headingBgImg})`
        }">
            <h1 class="title m red-gradient battle-description-short__heading-title">
                {{ currentBattle.title }}
            </h1>
        </header>
        <span class="battle-description-short__heading-decoration" />
        <div class="battle-description-short__main">
            <h2 class="title m black-2">Описание битвы</h2>
            <p class="battle-description-short__main-text">
                {{ currentBattle.description }}
            </p>
        </div>
        <div class="battle-description-short__actions">
            <button @click="closePopup">
                <CloseIcon />
                Закрыть
            </button>
            <button class="more" @click="setCurrentPopup('description-full')">Подробнее</button>
        </div>
    </div>
</template>

<script setup>
import CloseIcon from '@/assets/icons/CloseIcon.vue';
import { SHORT_DESCRIPTION } from '@/mock';
import { computed } from 'vue';
import headingBgImg from '@/assets/img/short-description-mock-heading-pictire.png'
import { useBattlesStore, usePopupStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const { currentBattle } = storeToRefs(useBattlesStore())

const { closePopup, setCurrentPopup } = usePopupStore()
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
    z-index: var(--z-index-battle-description);
    // width: 31.25vw;
    // width: 31.25%;
    // height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: var(--z-index-popup-description-short);

    background: url('@/assets/img/short-description-bg.png') no-repeat;
    background-color: transparent;

    &_left {}

    &_right {
        right: var(--container-padding);
    }

    &__heading {
        position: relative;
        height: 675px;
        z-index: 1;
        background-position: top;
        mask-image: url('@/assets/img/short-description-mask.png');
        mask-repeat: no-repeat;
        mask-position: bottom;
        mask-size: 100% 100%;

        &-decoration {
            content: '';
            z-index: 0;
            position: absolute;
            width: 1500px;
            height: 85px;
            top: 626px;
            right: -72px;
            z-index: 0;
            background: url('@/assets/img/short-description-heading-decoration.png') no-repeat;
        }

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 1200px;
            height: 315px;
            background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
            z-index: 1;
        }

        &-title {
            z-index: 2;
            position: relative;
            padding: var(--container-padding);
        }
    }

    &__main {
        display: flex;
        gap: 20px;
        flex-direction: column;
        padding: var(--container-padding);

        &-text {
            height: 1048px;
            overflow: auto;
            word-break: break-word;
            white-space: normal;
        }
    }

    &__actions {
        display: grid;
        grid-template-columns: 4fr 6fr;
        padding: 0 var(--container-padding);


        button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            padding: 43px;

            &.more {
                background: url('@/assets/img/short-description-button-bg.png') no-repeat;
                background-position: center;
                color: var(--color-white);
            }
        }


    }
}
</style>