<template>
    <Container :padding="true" class="layout-container">
        <header class="header">
            <button class="header-back-btn btn btn-s" @click="router.back">Назад</button>
            <h1>{{ title }}</h1>
            <img src="/forest/logo.png" alt="" width="174px" height="101px">
        </header>
        <router-view />
    </Container>
</template>

<script setup lang="ts">
import Container from '@/components/shared/container/Container.vue';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const routeToTitle: Record<string, string> = {
    '/forest/news': 'Новости',
    '/forest/mso': 'Молодёжь Самарской области',
    '/forest/walk': '',
    '/forest/about': 'О молодежном центре',
    '/forest/ecosystem': 'Экосистема молодежной политики',
    '/forest/support': '',
    '/forest/young-russia': '',
    '/forest/our-resources': 'Наши ресурсы',
    '/forest/events': '',
};

onMounted(() => {
    console.log(`output->history.state`, history.state)
})

const title = computed(() => routeToTitle[router.currentRoute.value.path] || history.state?.data?.title || '');

</script>

<style scoped lang="scss">
.layout-container {
    display: grid;
    grid-template-rows: 102px 1fr;
}

.header {
    display: grid;
    grid-template-columns: 300px 1fr 300px;
    text-transform: uppercase;

    &-back-btn {
        width: 273px;
    }

    h1 {
        font-size: 38px;
        font-weight: 700;
        color: #252525;
        text-align: center;
    }

    img {
        margin-left: auto;
    }
}
</style>