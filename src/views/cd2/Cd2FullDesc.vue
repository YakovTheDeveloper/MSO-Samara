<template>
  <div class="container container-padding">
    <Header button-text="Закрыть" :title="store.currentMark?.title || ''" />
    <div class="main">
      <div class="text-desc">
        <div>
          <h2 class="title">Описание</h2>
          <p>{{ store.currentMark?.description }}</p>
        </div>
        <div>
          <h2 class="title">Ответственные за добровольчество</h2>
          <p>{{ store.currentMark?.responsibleDescription }}</p>
        </div>
      </div>
      <div class="rest-desc">
        <div v-if="store.currentMark?.images" class="rest-desc__gallery">
          <Slider :photos="store.currentGallery" />
        </div>
        <div class="rest-desc-info">
          <div class="rest-desc-info-item">
            <img :src="getServerImgUrl(store.currentMark?.qr)" alt=""
              :style="{ height: '100%', aspectRatio: 1, marginRight: '10px' }">
            {{ store.currentMark?.qrTitle }}
          </div>
          <div class="rest-desc-info-item">
            <label class="rest-desc-info-item-label">Номер</label>
            <span class="rest-desc-info-item-text">{{ store.currentMark?.phone }}</span>
          </div>
          <div class="rest-desc-info-item">
            <label class="rest-desc-info-item-label">Почта</label>
            <span class="rest-desc-info-item-text">{{ store.currentMark?.email }}</span>
          </div>
          <button class="rest-desc-info-button" @click="onMore">СПИСОК ШТАБОВ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Header from './shared/Header.vue'
import Slider from '@/components/shared/slider/Slider.vue'
import { useStore } from './store'
import { useRoute, useRouter } from 'vue-router'
import { getServerImgUrl } from '@/utils/getServerImgUrl'
const router = useRouter()
const route = useRoute()

const onMore = () => router.push(`list`)
const store = useStore()
</script>

<style scoped lang="scss">
.vertical .container-padding {
  padding: 48px;
  height: 100%;
}

.title {
  margin-bottom: 12px;
  font-size: 30px;
  letter-spacing: 2px;
  font-weight: 700;
}

.container {
  padding: 80px;
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
  gap: 24px;

  .vertical & {
    flex-direction: column-reverse;
  }
}

.text-desc,
.rest-desc {
  width: 864px;
}

.text-desc {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
  font-size: 22px;
}

.rest-desc {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .vertical & {
    width: 100%;
  }

  &__gallery {
    height: 488px;
  }

  &-info {
    display: grid;
    gap: 12px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 93px 93px 54px;

    .vertical & {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 134px 54px;
    }

    &-item {
      display: flex;
      flex-direction: column;
      border-radius: 20px;
      padding: 16px;
      background-color: var(--color-gray);
      font-size: 24px;
      font-weight: 700;

      .vertical & {
        justify-content: center;

        &:first-child {
          grid-column: auto;
        }

        &:nth-child(1) {
          order: 2;
        }
      }

      &:first-child {
        grid-column: span 2;
        align-items: center;
        // text-transform: uppercase;
        flex-direction: row;
      }

      &-label {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 12px;
      }

      &-text {
        font-weight: 700;
      }
    }

    &-button {
      padding: 10px;
      border: 3px solid var(--color-blue-2);
      color: var(--color-blue-2);
      font-size: 22px;
      font-weight: 900;
      text-transform: uppercase;
      border-radius: 24px;
      grid-column: span 2;

      .vertical & {
        grid-column: span 3;
        order: 4;
      }
    }
  }
}
</style>
