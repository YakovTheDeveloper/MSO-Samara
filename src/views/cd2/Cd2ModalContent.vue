<template>
  <div class="modal-content">
    <div>
      <h1 class="title">Название</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur. Sed magna sodales faucibus faucibus. Tellus cras
        eget dictumst posuere ut. Pellentesque imperdiet nunc viverra habitasse feugiat ut. Lacus
        lacus quisque nunc massa ultricies. Ac quis dolor arcu ut phasellus egestas turpis varius.
        Adipiscing malesuada vestibulum in erat aliquam dictum est. Turpis pretium magna vel elit
        sagittis mattis aenean dictum nisi. Fermentum tellus massa orci odio fermentum ultrices quis
        varius. Tellus lorem phasellus mi eget. Aliquet sagittis id suspendisse mi felis velit
        suspendisse pellentesque arcu. Faucibus vitae posuere proin vel est non
      </p>
    </div>
    <div>
      <h2 class="title">Ответственные за добровольчество</h2>
      <p>Lorem ipsum dolor sit amet consectetur.</p>
    </div>
    <div class="btns">
      <button class="btn btn-s btn-more" @click="onMore">Подробнее</button>
      <button class="btn btn-s btn-close" @click="$emit('close')">Закрыть</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

defineEmits(['close'])

const route = useRoute()

const onMore = () => router.push(`${route.path}/desc`)

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
