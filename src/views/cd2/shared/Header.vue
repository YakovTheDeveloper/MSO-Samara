<template>
  <div class="header">
    <button class="btn btn-s btn-secondary btn-secondary_2" @click="goBack">
      {{ $props.buttonText }}
    </button>
    <h1>{{ $props.title }}</h1>
    <img src="/images/cd2/logo.png" alt="" />
  </div>
  <div class="header-vertical">
    <div class="row">
      <button class="btn btn-s btn-secondary btn-secondary_2" @click="goBack">
        {{ $props.buttonText }}
      </button>
      <img src="/images/cd2/logo.png" alt="" />
    </div>
    <h1>{{ $props.title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  buttonText: string
  title: string
}>()

const router = useRouter()
const goBack = () => router.back()
</script>

<style scoped lang="scss">
.btn {
  width: 293px;
}

h1 {
  text-transform: uppercase;
}

.header {
  display: grid;
  grid-template-columns: 357px 1fr 357px;
  margin-bottom: 64px;

  .vertical & {
    display: none;
  }

  &-vertical {
    display: none;
  }

  .vertical &-vertical {
    display: flex;
    gap: 48px;
    flex-direction: column;
    margin-bottom: 48px;

    .row {
      display: flex;
      justify-content: space-between;
    }
  }

  img {
    margin-left: auto;
  }
}

h1 {
  font-size: 38px;
  color: var(--color-black);
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
}
</style>
