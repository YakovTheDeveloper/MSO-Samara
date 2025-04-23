<template>
    <div class="qr-card">
        <h2 class="qr-card-title title-card title-card_secondary">{{ $props.card.title }}</h2>
        <p v-if="$props.card.desc" class="qr-card-text">{{ $props.card.desc }}</p>
        <div v-if="$props.card.qr" class="qr-card-qr">
            <img :src="$props.card.qr" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
import type { QrCardType } from './types';

defineProps<{
    card: QrCardType
}>()
</script>

<style scoped lang="scss">
.qr-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: var(--color-gray);
    padding: 20px;
    border-radius: var(--border-radius-s);

    &-title {
        font-size: 18px;
        text-align: left;
    }

    &-text {
        font-size: 16px;
    }

    &-qr {
        height: 84px;
        width: 84px;
        margin-top: auto;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>