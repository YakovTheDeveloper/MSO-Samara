<template>
    <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-content" @click.stop>
            <slot></slot>
            <!-- <button class="modal-close" @click="onClose">Close</button> -->
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const props = defineProps<Props>();

function handleOverlayClick() {
    props.onClose();
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    width: 868px;
    max-height: 1050px;
    background-color: #FFFFFF;
    border-radius: 60px;
    padding: 48px;
    position: relative;
}

.modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
}
</style>
