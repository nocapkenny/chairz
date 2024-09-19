<script setup>
const props = defineProps({
    text:{
        type: String,
        required: true,
    },
    isHidden:{
        type: Boolean,
        required: true,
        default: true
    }
})
</script>
<template>
    <p class="aside__form-header" v-if="!isHidden">{{ text }}</p>
</template>