<script setup>
import { computed } from "vue"
import HeaderInput from "./HeaderInput.vue"


const props = defineProps({
    type:{
        type: String,
        required: true,
    },
    isTextBad:{
        type: Boolean,
        required: false,
    },
    isTextGood:{
        type: Boolean,
        required: false,
    },
    isPriceBad:{
        type: Boolean,
        required: false,
    },
    isPriceGood:{
        type: Boolean,
        required: false,
    },
    placeholder:{
        type: String,
        required: true,
    },
    isGood:{
        type: Boolean,
        required: true
    }
})

const model = defineModel()

const classes = computed(()=>({
    'aside__form-input--bad':(props.type === 'text' && props.isTextBad) || (props.type === 'number' && props.isPriceBad && !props.isGood),
    'aside__form-input--good':(props.type === 'text' && props.isTextGood) || (props.type === 'number' && props.isPriceGood),
    'aside__form-input--badmargin':(props.type === 'number' && props.isPriceBad && props.isGood),
    'aside__form-input--defmargin':(props.isGood === false && props.isTextBad === true && !props.type === 'text')
}))


</script>


<template>
    <HeaderInput :isGoodMargin="!!isTextBad" :isHidden="!isGood" :text="type === 'text' ? 'Название*' : 'Цена*'"/>
    <input class="aside__form-input" v-model="model" :placeholder="placeholder" :type="type" :class="classes">
</template>