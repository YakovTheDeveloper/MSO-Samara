<template>
    <button ref="buttonEl" :class="['control-button', `control-button_${props.size}`]">

        <span class="control-button-content">
            <slot></slot>
        </span>
    </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
    variant: 'star' | 'square'
    size: 'small' | 'big'
}>()

const buttonEl = ref<HTMLButtonElement | null>(null)
defineExpose({
    getEl: () => buttonEl.value
})

</script>

<style scoped lang="scss">
.control-button {
    aspect-ratio: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &_small {
        width: 82px;
    }

    &_big {
        width: 164px;
    }


    &-content {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }

    &-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>