<template>
    <div v-if="currentBattle" :class="classes">
        <header class="battle-description-short__heading" :style="{
            backgroundImage: `url(${headingImgUrl})`
        }">
            <h1 class="title m red-gradient battle-description-short__heading-title">
                {{ currentBattle.title }}
            </h1>
        </header>
        <span class="battle-description-short__heading-decoration" />
        <div class="battle-description-short__main">
            <h2 class="title m black-2">Описание битвы</h2>
            <p class="battle-description-short__main-text scrollbar">
                {{ currentBattle.description }}
            </p>
        </div>
        <div class="battle-description-short__actions">
            <button @click="backHandler">
                <CloseIcon />
                Закрыть
            </button>
            <button class="more" @click="setCurrentPopup('description-full')">Подробнее</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBattlesStore, useFlowsStore, usePopupStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { getServerImgUrl } from '@/utils/getServerImgUrl';
import { isBeforeOrAfterYAxis } from '@/utils/isBeforeOrAfterYAxis';
import { parseCoords } from '@/utils/parseCoords';
import { MAP_WIDTH } from '@/constants';

const { currentBattle } = storeToRefs(useBattlesStore())

const headingImgUrl = computed(() => {
    const imgUrl = currentBattle.value.images[0]?.image
    if (!imgUrl) return ''
    return getServerImgUrl(imgUrl)
})

const { setCurrentPopup } = usePopupStore()
const { backHandler } = useFlowsStore()

const classes = computed(() => {
    const coords = parseCoords(currentBattle.value.location)
    const position = isBeforeOrAfterYAxis(coords, MAP_WIDTH)
    return [
        'battle-description-short',
        `battle-description-short_${position}`
    ]
})
</script>

<style lang="scss" scoped></style>