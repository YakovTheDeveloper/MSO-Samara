<template>
  <div class="list">
    <Header button-text="Назад" title="Список штабов" />
    <div class="list-items">
      <div class="list-item" v-for="item in LIST">
        <div class="col">
          <h2 class="title">{{ item.title }}</h2>
          <p>{{ item.desc }}</p>
        </div>
        <div class="row">
          <div class="list-item-qr">
            <img src="" alt="" />
          </div>
          <div class="list-item__text-contacts">
            <div>
              <p class="label">Директор</p>
              <p class="bold">{{ item.director }}</p>
            </div>
            <div>
              <p class="label">Телефон</p>
              <p class="bold">{{ item.tel }}</p>
            </div>
            <div>
              <p class="label">Почта</p>
              <p class="bold">{{ item.mail }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './shared/Header.vue'

const LIST = [
  {
    id: 0,
    title: 'Доброцентр',
    desc: 'Добро.рф является крупнейшей в России электронной площадкой, на которой волонтёры могут найти возможности для помощи, а организаторы — желающих помочь. Также это экосистема IT-сервисов для развития созидательной гражданской активности.',
    qrImg: '',
    director: 'Директор Директорович',
    tel: '8 000 000 00 00',
    mail: 'Example@ex.ru',
  },
  {
    id: 1,
    title: 'Доброцентр',
    desc: 'Добро.рф является крупнейшей в России электронной площадкой, на которой волонтёры могут найти возможности для помощи, а организаторы — желающих помочь. Также это экосистема IT-сервисов для развития созидательной гражданской активности.',
    qrImg: '',
    director: 'Директор Директорович',
    tel: '8 000 000 00 00',
    mail: 'Example@ex.ru',
  },
  {
    id: 2,
    title: 'Доброцентр',
    desc: 'Добро.рф является крупнейшей в России электронной площадкой, на которой волонтёры могут найти возможности для помощи, а организаторы — желающих помочь. Также это экосистема IT-сервисов для развития созидательной гражданской активности.',
    qrImg: '',
    director: 'Директор Директорович',
    tel: '8 000 000 00 00',
    mail: 'Example@ex.ru',
  },
  {
    id: 3,
    title: 'Доброцентр',
    desc: 'Добро.рф является крупнейшей в России электронной площадкой, на которой волонтёры могут найти возможности для помощи, а организаторы — желающих помочь. Также это экосистема IT-сервисов для развития созидательной гражданской активности.',
    qrImg: '',
    director: 'Директор Директорович',
    tel: '8 000 000 00 00',
    mail: 'Example@ex.ru',
  },
  {
    id: 4,
    title: 'Доброцентр',
    desc: 'Добро.рф является крупнейшей в России электронной площадкой, на которой волонтёры могут найти возможности для помощи, а организаторы — желающих помочь. Также это экосистема IT-сервисов для развития созидательной гражданской активности.',
    qrImg: '',
    director: 'Директор Директорович',
    tel: '8 000 000 00 00',
    mail: 'Example@ex.ru',
  },
  {
    id: 5,
    title: 'Доброцентр',
    desc: 'Добро.рф является крупнейшей в России электронной площадкой, на которой волонтёры могут найти возможности для помощи, а организаторы — желающих помочь. Также это экосистема IT-сервисов для развития созидательной гражданской активности.',
    qrImg: '',
    director: 'Директор Директорович',
    tel: '8 000 000 00 00',
    mail: 'Example@ex.ru',
  },
  {
    id: 6,
    title: 'Доброцентр',
    desc: 'Добро.рф является крупнейшей в России электронной площадкой, на которой волонтёры могут найти возможности для помощи, а организаторы — желающих помочь. Также это экосистема IT-сервисов для развития созидательной гражданской активности.',
    qrImg: '',
    director: 'Директор Директорович',
    tel: '8 000 000 00 00',
    mail: 'Example@ex.ru',
  },
  {
    id: 7,
    title: 'Доброцентр',
    desc: 'Добро.рф является крупнейшей в России электронной площадкой, на которой волонтёры могут найти возможности для помощи, а организаторы — желающих помочь. Также это экосистема IT-сервисов для развития созидательной гражданской активности.',
    qrImg: '',
    director: 'Директор Директорович',
    tel: '8 000 000 00 00',
    mail: 'Example@ex.ru',
  },
]
</script>

<style scoped lang="scss">
.title {
  font-size: 18px;
  line-height: 110%;
  letter-spacing: -1px;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-weight: 700;
}
.label {
  font-size: 12px;
  margin-bottom: 4px;
}

.list {
  font-size: 16px;

  &-items {
    display: grid;

    .vertical & {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(4, 355px);
      gap: 24px;
    }
  }

  &-item {
    padding: 20px;
    border-radius: 24px;
    background-color: var(--color-gray);
    gap: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    &-qr{
        height: 84px;
        width: 84px;
    }

    &__text-contacts {
        flex-grow: 1;
      display: grid;
      grid-template-columns: minmax(137px, 166px) minmax(137px, 166px);
      gap: 8px 12px;

      * {
        &:first-child {
          grid-column: span 2;
        }
      }
    }
  }
}
</style>
