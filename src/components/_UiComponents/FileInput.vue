<script setup>
import { computed, defineProps } from "vue"
import Placeholder from "./Placeholder.vue";
import DeleteFile from "../../assets/images/delete-file.svg"

const props = defineProps({
    isGood:{
        type: Boolean,
        required: true,
    },
    productImgName:{
        type: String,
        required: false,
    },
    imgName: {
        type: String,
        required: false,
    },
    isEdit:{
        type:Boolean,
        required: false,
    },
    isPriceError:{
        type: Boolean,
        required:false,
        default: false,
    }
})

const emit = defineEmits(['imgUpload','removeFile'])

const classesLabel = computed(()=>({
    'aside__form-input--good':props.isGood,
    'aside__form-input--defmargin':!props.isGood && props.isPriceError
}))
const classesSpan = computed(()=>({
    'aside__form-span--active':props.isGood,
}))
const classesDel = computed(()=>({
    'aside__form-btn--disabledelete':!props.isGood
}))
const textSpan = computed(()=>{
    if(props.isGood){
        if(props.isEdit){
            if(props.productImgName){
                return props.productImgName
            }
            else{
                return props.imgName
            }
        }
        else{
            return props.productImgName
        }
    }
    else{
        return 'Фото'
    }
})


</script>
<template>
    <Placeholder :isGoodMargin="!!isPriceError" v-if="!!isGood" :text="'Фото'"/>
    <label class="aside__form-input aside__form-input--image" :class="classesLabel">
        <input @change="$emit('imgUpload', $event)" type="file" accept="image/*"/>
        <span :class="classesSpan" class="aside__form-span">{{ textSpan }}</span>
        <button :class="classesDel" @click="$emit('removeFile')" :disabled="!isGood" class="aside__form-btn--delete">
            <DeleteFile class="aside__form-delete"/>
        </button>
    </label>
</template>
