<template>
    <div class="pagination">
        <button @click="emit('prev')" :disabled="current <= 1">
            <ArrowLeft />
        </button>
        <button @click="emit('next')" :disabled="current >= total">
            <ArrowRight />
        </button>
    </div>
</template>

<script setup lang="ts">
import ArrowLeft from '@/assets/icons/ArrowLeft.vue';
import ArrowRight from '@/assets/icons/ArrowRight.vue';

const props = defineProps<{
    current: number;
    total: number;
}>();

const emit = defineEmits(['prev', 'next']);
</script>


<style scoped lang="scss">
.pagination {
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: center;
    margin-top: auto;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        height: 64px;
        width: 64px;
        flex-shrink: 0;
        box-shadow: 0px 1.60479px 16.0479px rgba(0, 0, 0, 0.08);
        background-color: #0099CA;

        &:disabled {
            opacity: 0.2;
        }
    }
}
</style>