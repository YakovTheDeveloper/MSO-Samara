<template>
  <div class="list container container-padding">
    <Header button-text="Назад" title="Список штабов" />
    <div class="list-items">
      <div class="list-item" v-for="item in store.currentMark?.headquarters">
        <div class="col">
          <h2 class="title">{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </div>
        <div class="row">
          <div class="list-item-qr">
            <img :src="getServerImgUrl(item.qr)" alt="" />
          </div>
          <div class="list-item__text-contacts">
            <div>
              <p class="label">Директор</p>
              <p class="bold">{{ item.directorFullName }}</p>
            </div>
            <div>
              <p class="label">Телефон</p>
              <p class="bold">{{ item.phone }}</p>
            </div>
            <div>
              <p class="label">Почта</p>
              <p class="bold">{{ item.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaginationNavigation />
  </div>
</template>

<script setup lang="ts">
import { useStore } from './store'

import Header from './shared/Header.vue'
import { getServerImgUrl } from '@/utils/getServerImgUrl';
import { useOfflinePagination } from '@/composables/useOfflinePagination';
import PaginationNavigation from '@/components/shared/pagination/PaginationNavigation.vue';

const store = useStore()

const pagination = useOfflinePagination(store.currentMark?.headquarters || [])


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
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 24px;

    .vertical & {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(4, 355px);
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

    &-qr {
      height: 84px;
      width: 84px;
      margin-right: 10px;
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
