<template>
    <div :class="['full-height-container', $props.padding && 'padding']">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

defineProps<{
    padding: boolean
}>()

</script>

<style scoped>
.full-height-container {
    height: 100vh;
    width: 100%;
}

.padding {
    padding: 80px;
}
</style>