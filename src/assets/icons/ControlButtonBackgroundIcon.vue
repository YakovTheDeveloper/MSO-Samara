<script setup>
defineProps({
    fillOpacity: {
        type: Number,
        default: 0.8
    }
});
</script>

<template>
    <svg width="164" height="164" viewBox="0 0 164 164" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="82" width="116" height="116" rx="6" transform="rotate(-45 0 82)" fill="white"
            :fill-opacity="fillOpacity" />
        <rect x="9.82843" y="82" width="102" height="102" rx="4" transform="rotate(-45 9.82843 82)" stroke="#4F4F4F"
            stroke-width="4" />
        <circle cx="12" cy="82" r="6" fill="#4F4F4F" stroke="#F6F4F0" stroke-width="4" />
        <circle cx="152" cy="82" r="6" fill="#4F4F4F" stroke="#F6F4F0" stroke-width="4" />
    </svg>
</template>
