<template>
    <div class="battle-description-full" v-if="store.currentBattle.value" :key="store.currentBattle.value.id">
        <div class="battle-description-full-bg" :style="bgImageStyle" />
        <h1 class="title l red-gradient">
            <ControlButton size="big" variant="star" @click="backHandler">
                <!-- <ArrowIcon /> -->
            </ControlButton> {{ store.currentBattle.value?.title }}
        </h1>
        <div class="battle-description-full__top">
            <BattleDescriptionGallery :slides="gallerySlides" @slide-changed="onSlideChange" />
            <div class="battle-description-full__top-members">
                <h2 class="title m offset black-2">Участники битвы</h2>
                <p class="battle-description-full__top-members-text scrollbar">{{
                    store.currentBattle.value?.members.join(', ') }}
                </p>
            </div>
        </div>
        <div class="battle-description-full__battle">
            <h2 class="title m offset black-2">Описание битвы</h2>
            <p class="battle-description-full__battle-text wrap scrollbar">{{ store.currentBattle.value?.description }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBattlesStore, useFlowsStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import ControlButton from '../ui/control-button/ControlButton.vue';
import BattleDescriptionGallery from './short/ui/BattleDescriptionGallery.vue';
import { computed, ref } from 'vue';
import { getServerImgUrl } from '@/utils/getServerImgUrl';

const store = storeToRefs(useBattlesStore())
const gallerySlides = computed(() => {
    if (!store.currentBattle.value) return []
    return store.currentBattle.value?.images.map(({ id, image }) => ({
        id,
        image: getServerImgUrl(image)
    }))
})
const { backHandler } = useFlowsStore()

const onSlideChange = (index: number) => {
    currentBg.value = gallerySlides.value[index].image
}

const currentBg = ref(gallerySlides.value[0].image)

const bgImageStyle = computed(() => ({
    'background-image': `url(${currentBg.value})`
}))

</script>

<style lang="scss" scoped>
.title {
    display: flex;
    align-items: center;
    gap: 64px;
}

.battle-description-full {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;
    width: 3840px;
    height: 2160px;
    padding: 80px 80px 40px;
    background: linear-gradient(180deg, #FFFFFF 0%, #F2F1EF 100%);
    z-index: var(--z-index-popup-description-full);

    display: flex;
    flex-direction: column;
    gap: 80px;

    &-bg {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        transform: translateX(47%);
        background-repeat: no-repeat;
        background-size: cover;
        mask-image: url('@/assets/img/full-description-mask.png');
        mask-repeat: no-repeat;
        mask-position: 10% 10%;
        mask-position: 20% 30%;
        opacity: 0.15;
        width: 3840px;
        height: 2160px;
        z-index: -1;

    }

    &__top {
        height: 850px;
        display: flex;
        gap: 40px;

        &-members {
            height: 100%;
            display: grid;
            grid-template-rows: auto 1fr;

            &-text {
                overflow: auto;
            }
        }

    }

    &__battle {
        display: grid;
        grid-template-rows: auto 1fr;
        min-height: 0;

        &-text {
            overflow: auto;
        }
    }
}
</style>