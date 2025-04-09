<template>
    <button ref="buttonEl" :class="['control-button', `control-button_${props.size}`]">
        <component :is="bgComponent" :class="{
            'control-button-bg': true,
        }" />
        <span class="control-button-content">
            <slot></slot>
        </span>
    </button>
</template>

<script setup lang="ts">
import ControlButtonBackgroundIcon from '@/assets/icons/ControlButtonBackgroundIcon.vue';
import ControlButtonBackgroundIcon2 from '@/assets/icons/ControlButtonBackgroundIcon2.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
    variant: 'star' | 'square'
    size: 'small' | 'big'
}>()

const buttonEl = ref<HTMLButtonElement | null>(null)
defineExpose({
    getEl: () => buttonEl.value
})

const bgComponent = computed(() => {
    return props.variant === 'star' ? ControlButtonBackgroundIcon2 : ControlButtonBackgroundIcon
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