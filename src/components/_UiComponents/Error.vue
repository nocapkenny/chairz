<script setup>
import { computed } from "vue"

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    isHidden:{
        type: Boolean,
        required: true,
        default: true,
    },
    hiddenClass:{
        type: Boolean,
        required: false,
        default: false
    }
})

const classes = computed(()=>({
    'error--hidden':props.hiddenClass,
}))
</script>
<template>
    <p :class="classes" v-if="!isHidden">{{ text }}</p>
</template>