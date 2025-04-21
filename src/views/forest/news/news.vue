<template>
    <div class="news section-mt-l">
        <div v-for="news in data" class="news-item">
            <div class="news-item-content">
                <h2 class="title-card title-card_primary">{{ news.title }}</h2>
                <button @click="onClick(news)" class="btn btn-secondary">подробнее</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter()

const data = [
    {
        id: 0,
        title: 'Чемпионат Мира по футболу «FIFA 2018»',
        desc: `Чемпионат мира по футболу (Кубок мира ФИФА, FIFA World Cup) — главное международное соревнование по футболу, проводимое с 1930 года. В нём участвуют сильнейшие футбольные национальные сборные стран всех континентов. Чемпионат мира организуется Международной федерацией футбольных ассоциаций (ФИФА). Финальные турниры чемпионатов мира проводятся раз в четыре года, как и Олимпийские игры.
С 14 июня по 15 июля 2018 года Россия принимала ХХI Чемпионат мира по футболу. Самара стала одним из 11 российских городов-организаторов, которые принимали матчи мундиаля. В Самаре был сформирован один из самых больших волонтерских корпусов, в котором было задействовано более 2500 волонтеров.
`
    }
]

const onClick = (data) => {
    router.push({ path: `news/${data.id}`, state: { data } })
};

</script>

<style scoped lang="scss">
.news {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 24px;
    height: 644px;

    &-item {
        border-radius: 24px;
        background-color: var(--color-gray);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 36px;

        &-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 27px;


            button {
                padding: 15px 38px;
                width: fit-content;
            }
        }
    }
}
</style>