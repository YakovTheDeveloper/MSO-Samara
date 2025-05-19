<template>
  <div class="stages">
    <div
      @click="$emit('onStageChange', value)"
      :class="['stages-one', $props.current === value && 'stages-one_active']"
      v-for="value in 4"
    >
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';

const props = defineProps<{
  current: number
}>()
defineEmits<{
  onStageChange: [stage: number]
}>()

watchEffect(() => {
  console.log(`output->props.current`,props.current)
})
</script>

<style scoped lang="scss">
.stages {
  display: flex;
  gap: 10px;
  align-items: center;
  position: fixed;
  bottom: 80px;
  left: 80px;

  &-one {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-size: 20px;
    font-weight: 700;
    color: #868686;
    background-color: #ececec;

    &_active {
      color: #fff;
      background-color: var(--color-pink);
    }
  }
}
</style>
