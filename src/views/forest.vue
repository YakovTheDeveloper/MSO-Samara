<template>
    <Container class="home">
        <div class="home-links">
            <template v-for="({ content, url, type }) in LINKS">
                <template v-if="type === 'router'">
                    <RouterLink v-html="content" class="btn btn-s" :to="`/forest/${url}`">
                    </RouterLink>
                </template>
                <template v-else>
                    <a v-html="content" class="btn btn-s" :href="url">
                    </a>
                </template>
            </template>
        </div>
    </Container>
</template>

<script setup lang="ts">
import Container from '@/components/shared/container/Container.vue';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
const route = useRoute()
const LINKS = [
    {
        url: 'news',
        content: 'НОВОСТИ',
        type: 'router'
    },
    {
        url: 'mso',
        content: 'МСО',
        type: 'router'
    },
    {
        url: 'walk',
        content: 'Пешком </br> по Лесной сказке',
        type: 'router'
    },
    {
        url: 'about',
        content: 'О Молодежном </br> центре',
        type: 'router'
    },
    {
        url: 'ecosystem',
        content: 'Экосистема </br> молодежной политики',
        type: 'router'
    },
    {
        url: 'support',
        content: 'Меры поддержки </br> молодежи',
        type: 'router'
    },
    {
        url: 'https://myrosmol.ru/',
        content: 'Платформа </br> «Молодежь России»',
        type: 'external'
    },
    {
        url: 'our-resources',
        content: 'Наши ресурсы',
        type: 'router'
    },
    {
        url: 'events',
        content: 'Провести мероприятие в Лесной сказке',
        type: 'router'
    },
]

</script>

<style scoped lang="scss">
.home {
    background-image: url('/forest/home-bg.png');
    background-position: center;
    background-repeat: no-repeat;
    position: relative;

    &-links {
        position: absolute;
        top: 361px;
        right: 80px;
        display: grid;
        gap: 24px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(5, 91px);
        margin-left: auto;
        width: 868px;
        height: 550px;

        .btn {
            height: 100%;
            font-weight: 900;

            &:last-child {
                grid-column: span 2;
            }
        }
    }
}
</style>