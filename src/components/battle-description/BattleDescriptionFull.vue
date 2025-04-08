<template>
    <div class="battle-description-full" v-if="currentBattle">
        <h1 class="title l red-gradient">
            <HeadingIcon>
                <ArrowIcon />
            </HeadingIcon> {{ currentBattle.title }}
        </h1>
        <div class="battle-description-full__members">
            <div>

            </div>
            <div>
                <h2 class="title m offset black-2">Участники битвы</h2>
                <p>{{ currentBattle.members.join(', ') }}</p>
            </div>
        </div>
        <div>
            <h2 class="title m offset black-2">Описание битвы</h2>
            <p class="wrap">{{ currentBattle.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';
import HeadingIcon from '@/assets/icons/HeadingIcon.vue';
import { useBattlesStore, usePopupStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const { currentBattle } = storeToRefs(useBattlesStore())

const { closePopup, setCurrentPopup } = usePopupStore()
</script>

<style lang="scss" scoped>
.battle-description-full {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    padding: 120px 80px 40px;
    background-color: rgba(255, 255, 255, 0.904);
    z-index: var(--z-index-popup-description-full);

    display: flex;
    flex-direction: column;
    gap: 80px;

    &__members {
        display: grid;
        grid-template-columns: 15fr 21fr;
        grid-template-rows: 850px;
        gap: 40px;
    }

    &__description {}
}
</style>