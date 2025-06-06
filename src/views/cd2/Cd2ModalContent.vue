<template>
  <div class="modal-content">
    <div>
      <h1 class="title">{{ title }}</h1>
      <p>
        {{ description }}
      </p>
    </div>
    <div>
      <h2 class="title">Ответственные за добровольчество</h2>
      <p>{{ responsibleDescription }}</p>
    </div>
    <div class="btns">
      <button class="btn btn-s btn-more" @click="onMore">Подробнее</button>
      <button class="btn btn-s btn-close" @click="$emit('close')">Закрыть</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MapMarkCd2 } from '@/entities'
import { useRoute, useRouter } from 'vue-router'

defineEmits(['close'])
const props = defineProps<{
  data: MapMarkCd2
}>()

const { title, description, responsibleDescription } = props.data

const route = useRoute()

const onMore = () => router.push(route.path.replace(/\/$/, '') + '/desc')

const router = useRouter()
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 38px;
}

.title h2 {
  font-size: 30px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
  font-size: 22px;
}

.btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.btn {
  border: 4px solid var(--color-blue-2);

  &-more {
    padding: 19px;
    background-color: transparent;
    color: var(--color-blue-2);
  }
  &-close {
    background-color: var(--color-blue-2);
  }
}
</style>
