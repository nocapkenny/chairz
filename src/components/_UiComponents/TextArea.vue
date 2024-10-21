<script setup>
import { computed } from "vue"
import Placeholder from "./Placeholder.vue";

const props = defineProps({
    isGood:{
        type: Boolean,
        required: true,
        default: false
    },
    placeholder:{
        type: String,
        required: true
    }
})

const model = defineModel()

const clasess = computed(()=>({
    'aside__form-textarea--active':props.isGood
}))
</script>

<template>
    <Placeholder v-if="!!isGood" :text="'Описание'"/>
    <textarea :placeholder="placeholder" class="aside__form-textarea" :class="clasess" v-model="model"></textarea>
</template>