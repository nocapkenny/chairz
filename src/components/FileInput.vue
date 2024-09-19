<script setup>
import { computed, defineProps } from "vue"
import HeaderInput from "./HeaderInput.vue";
import DeleteFile from "../assets/images/delete-file.svg"

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
    }
})

const emit = defineEmits(['imgUpload','removeFile'])

const classesLabel = computed(()=>({
    'aside__form-input--good':props.isGood,
}))
const classesSpan = computed(()=>({
    'aside__form-span--active':props.isGood,
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
    <HeaderInput :isHidden="isGood ? false : true" :text="'Фото'"/>
    <label class="aside__form-input aside__form-input--image" :class="classesLabel">
        <input @change="$emit('imgUpload', $event)" type="file" accept="image/*"/>
        <span :class="classesSpan" class="aside__form-span">{{ textSpan }}</span>
        <button @click="$emit('removeFile')" :disabled="!isGood" class="aside__form-btn--delete">
            <DeleteFile class="aside__form-delete"/>
        </button>
    </label>
</template>
