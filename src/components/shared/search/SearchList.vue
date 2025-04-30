<template>
    <div class="search-list">
        <p class="search-list-title">Результаты поиска</p>
        <ul class="search-list__content scrollbar" v-if="data.length">
            <li class="search-list__content-item" v-for="item in data">{{ item.title }}</li>
        </ul>
        <p class="search-list-not-found" v-else>
            Ничего не найдено
        </p>
    </div>
</template>

<script setup lang="ts">

defineProps<{
    data: { title: string }[]
}>()

</script>

<style scoped lang="scss">
.search-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 24px;
    background-color: #fff;
    padding: 20px;
    box-shadow: var(--box-shadow-s);

    &-not-found {
        color: #A4A4A4;
        font-size: 24px;
        font-weight: 700;
        line-height: 130%;
    }

    &-title {
        font-size: 32px;
        font-weight: 700;
    }

    &__content {
        max-height: 252px;
        overflow-y: auto;

        &-item {
            line-height: 130%;
            letter-spacing: -1px;
            color: var(--color-blue);
            font-weight: 700;
            font-size: 24px;
            padding: 16px;
            border-radius: 10px;

            &:hover {
                background-color: var(--color-blue);
                color: #fff;
            }
        }
    }
}
</style>