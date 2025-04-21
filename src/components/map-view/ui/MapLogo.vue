<template>
    <div class="map-logo">
        <img alt="Logo">
        <p class="map-logo-text">КАРТА</p>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.map-logo {
    position: fixed;
    top: 0;
    left: 0;
    padding: var(--container-padding);

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;

    &-text {
        font-family: "Roboto Slab", serif;
        font-size: 80px;
        font-weight: 700;
    }
}
</style>