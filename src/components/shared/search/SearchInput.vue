<template>
    <div :class="['search-input', $attrs.class]" @click="inputRef?.focus()">
        <SearchIcon />
        <input :value="$props.modelValue" type="text" :placeholder="inputPlaceholder" @focus="onFocus"
            @blur="inputPlaceholder = defaultPlaceholder" @input="onInput" ref="inputRef" />
        <button v-show="showClearButton" @click="onClear">
            <CrossIcon />
        </button>
    </div>
</template>


<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import CrossIcon from '@/assets/icons/CrossIcon.vue'
import SearchIcon from '@/assets/icons/SearchIcon.vue'
defineOptions({
    inheritAttrs: false
})
const attrs = useAttrs()
const props = defineProps<{
    modelValue: string
}>()
const inputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits(['update:modelValue'])
const showClearButton = computed(() => props.modelValue.length > 0)
function onInput(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
function onClear() {
    emit('update:modelValue', '')
}

function onFocus(event: FocusEvent) {
    inputPlaceholder.value = ''
    if (typeof attrs.onFocus === 'function') {
        attrs.onFocus(event)
    }
}


const defaultPlaceholder = 'Поиск объекта'
const inputPlaceholder = ref(defaultPlaceholder)
</script>

<style scoped lang="scss">
.search-input {
    display: flex;
    align-items: center;
    width: 642px;
    height: 70px;
    border-radius: 35px;
    padding: 8px 22px;
    gap: 10px;
    background-color: #fff;
    box-sizing: border-box;
    outline: 2px solid rgba(113, 110, 110, 1);
    /* Default outline */

    input {
        font-size: 20px;

        &:placeholder {
            font-family: Arial;
            font-weight: 400;
            font-size: 20px;
            line-height: 130%;
            letter-spacing: -2%;
            vertical-align: middle;
        }
    }
}

.search-icon {
    width: 24px;
    height: 24px;
    color: #888;
}

input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    color: #333;
}

input::placeholder {
    color: rgba(134, 134, 134, 1);
}

.search-input:hover {
    border-color: rgba(134, 134, 134, 1);
}

.search-input:focus-within {
    border-color: rgba(29, 112, 183, 1);
    outline: 4px solid rgba(29, 112, 183, 1);
    /* Focused outline */
}
</style>
