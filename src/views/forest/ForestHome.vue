<template>
    <div class="forest">
        <button class="back-btn btn btn-s">Назад</button>
        <ForestMapView />
        <template v-if="keyboard.inputModel">
            <SearchInput class="search" v-model="keyboard.inputModel.value" v-if="keyboard.inputModel"
                @focus="keyboard.onFocus" />
            <div :class="['keyboard', keyboard.showKeyboard.value ? 'show' : 'hide']" v-if="keyboard.inputModel">
                <Keyboard :show="keyboard.showKeyboard.value" @onChange="keyboard.onChange"
                    @onKeyPress="keyboard.onKeyPress" :input="keyboard.inputModel.value"
                    @onClose="keyboard.closeKeyboard" />
            </div>
        </template>

    </div>
</template>

<script setup lang="ts">
import SearchInput from '@/components/shared/search/SearchInput.vue';
import ForestMapView from './ForestMapView.vue';
import { ref, watchEffect } from 'vue';
import Keyboard from '@/components/shared/keyboard/Keyboard.vue';
import { useKeyboard } from '@/composables/useKeyboard';

const keyboard = useKeyboard()

watchEffect(() => {
    console.log(`output->keyboard`, keyboard.inputModel)
})


</script>

<style scoped lang="scss">
.forest {
    position: relative;
}

.back-btn {
    position: absolute;
    top: 80px;
    left: 80px;
    width: 273px;
}

.search {
    position: absolute;
    top: 80px;
    right: 80px;
}

.keyboard {
    position: absolute;
    bottom: 0;
    height: 385px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    // padding-bottom: 150px;
    // height: 350px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
    transition: all 0.4s ease-in-out;

    &.hide {
        opacity: 0;
        visibility: hidden
    }

    &.show {
        opacity: 1;
        visibility: visible
    }
}
</style>