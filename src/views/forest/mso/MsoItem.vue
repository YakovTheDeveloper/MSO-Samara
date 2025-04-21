<template>
    <div class="news-item section-mt-l">
        <p class="news-item-text">{{ data.desc }}</p>
        <div>

        </div>
    </div>
</template>

<script setup lang="ts">

const data = history.state.data;


</script>

<style scoped lang="scss">
.news-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    &-text {
        font-size: 22px;
        line-height: 30px;
    }

}
</style>