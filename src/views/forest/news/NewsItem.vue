<template>
    <div class="news-item section-mt-l">
        <p class="news-item-text">{{ newsItem.desc }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const newsItem = history.state.data;

onMounted(() => {
    console.log(`output->history.state`, history.state)
})

</script>

<style scoped lang="scss">
.news-item {
    display: grid;
    grid-template-columns: 6fr 11fr;
    gap: 24px;

    &-text {
        font-size: 26px;
        line-height: 30px;
    }

}
</style>