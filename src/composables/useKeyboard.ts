import { ref } from "vue"

export const useKeyboard = () => {
    const showKeyboard = ref(false)
    const onChange = (input: string) => {
        inputModel.value = input
    }
    const inputModel = ref('')

    const onKeyPress = (key: string) => {
        const specialKeys = ["{bksp}", "{enter}", "{shift}", "{numbers}", "{letters}", "{lang}"];
        if (key === "{bksp}") {
            inputModel.value = inputModel.value.slice(0, -1);
        } else if (key === "space") {
            inputModel.value += " ";
        } else if (!specialKeys.includes(key)) {
            inputModel.value += key;
        }

    }

    const onFocus = () => showKeyboard.value = true
    const closeKeyboard = () => showKeyboard.value = false

    return {
        onKeyPress,
        onFocus,
        closeKeyboard,
        onChange,
        showKeyboard,
        inputModel
    }
}