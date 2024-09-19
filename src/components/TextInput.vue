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

const classes = computed(()=>{
    if(props.type === 'text' && props.isTextBad){
        return 'aside__form-input--bad'
    }
    if(props.type === 'text' && props.isTextGood){
        return 'aside__form-input--good'
    }
    if(props.type === 'number' && props.isPriceBad){
        return 'aside__form-input--bad'
    }
    if(props.type === 'number' && props.isPriceGood){
        return 'aside__form-input--good'
    }
})

</script>


<template>
    <HeaderInput :isHidden="isGood ? false : true" :text="type === 'text' ? 'Название*' : 'Цена*'"/>
    <input class="aside__form-input" v-model="model" :placeholder="placeholder" :type="type" :class="classes">
</template>