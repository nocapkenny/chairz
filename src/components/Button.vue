<script setup>
import { computed, defineProps } from 'vue';
import EditInactive from "../assets/images/edit__inactive.svg";
import EditActive from "../assets/images/edit__active.svg";
import DeleteInactive from "../assets/images/delete__inactive.svg";


const props = defineProps({
  submit:{
    type: Function,
    required: false
  },
  action:{
    type: String,
    required:false,
  },
  isCancel: {
    type: Boolean,
    required: false,
    default: false
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false
  },
  isCircle: {
    type: Boolean,
    required: false,
    default: false
  },
  isEdit:{
    type: Boolean,
    required: false,
    default: false,
  }
})

const classes = computed(()=>({
  'aside__form-btn--cancel':props.isCancel,
  'aside__form-btn--disabled':props.isDisabled,
}))

</script>

<template>
  <button @click="submit" :class="classes">
    <slot />
    <component v-if="isCircle && action === 'edit'"  :is="isEdit ? EditActive : EditInactive"/>
    <DeleteInactive v-if="isCircle && action === 'delete'"/>
  </button>
</template>


