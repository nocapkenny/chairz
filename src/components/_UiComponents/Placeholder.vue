<script setup>
import { computed } from "vue"

const props = defineProps({
    text:{
        type: String,
        required: true,
    },
    isGoodMargin: {
        type: Boolean,
        required: false,
        default: false,
    }
})

const classes = computed(()=>({
    'aside__form-header--margin':props.isGoodMargin,
})) 

</script>
<template>
    <p :class="classes" class="aside__form-header">{{ text }}</p>
</template>