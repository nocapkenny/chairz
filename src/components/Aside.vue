<script setup>
import { computed, ref, watch } from "vue";
import { useProductsStore } from "../stores/ProductsStore";
const productsStore = useProductsStore();
import Button from "../components/Button.vue";
import TextInput from "./TextInput.vue";
import FileInput from "./FileInput.vue";
import TextArea from "./TextArea.vue";
import Error from "./Error.vue";

const productName = ref(null);
const productPrice = ref(null);
const productDescr = ref("");
const errorPrice = ref("1");
const errorName = ref("1");
const productImg = ref();
const isEdit = ref(productsStore.isEdit);
const productId = ref(null);
const imgName = ref("");

const isDisabled = computed(() => {
  if (
    !productDescr.value &
    !productName.value &
    !productPrice.value &
    !productImg.value
  ) {
    return true;
  } else {
    return false;
  }
});

const isTextBad = computed(()=>{
  if(productName.value){
      return false
    }
  if(errorName.value && errorName.value !== '1'){
    return true
  } 
})
const isTextGood = computed(()=>{
  if(productName.value){
    return true
  }
})
const isPriceBad = computed(()=>{
  if(productPrice.value && (errorPrice.value === '1' || errorPrice.value === '')){
    return false
  }
  if(errorPrice.value && errorPrice.value !== '1'){
    return true
  }
})
const isPriceGood = computed(()=>{
  if(productPrice.value && (errorPrice.value === '1' || errorPrice.value === '')){
    return true
  }
})


const imgUpload = (event) => {
  productImg.value = event.target.files[0];
  console.log(productImg.value)
};

const postData = async () => {
  if (productName.value === null) {
    errorName.value = "Обязательное поле для заполнения";
    return;
  }
  errorName.value = "";
  if (productPrice.value === null) {
    errorPrice.value = "Обязательное поле для заполнения";
    return;
  } else if (productPrice.value <= 0) {
    errorPrice.value = "Цена должна быть больше нуля";
    return;
  }
  errorName.value = "";
  errorPrice.value = "";

  const formData = {
    title: productName.value,
    price: productPrice.value,
    description: productDescr.value,
    image: productImg.value,
  };
  await productsStore.postProducts(formData);
  clearForm();
};
const putData = async () => {
  if (productName.value === null) {
    errorName.value = "Обязательное поле для заполнения";
    return;
  }
  errorName.value = "";
  if (productPrice.value === null) {
    errorPrice.value = "Обязательное поле для заполнения";
    return;
  } else if (productPrice.value <= 0) {
    errorPrice.value = "Цена должна быть больше нуля";
    return;
  }
  errorName.value = "";
  errorPrice.value = "";
  const formData = {
    id: productId.value,
    title: productName.value,
    price: productPrice.value,
    description: productDescr.value,
    image: productImg.value,
  };
  await productsStore.putProducts(formData);
  clearForm();
};

const clearForm = () => {
  productName.value = null;
  productPrice.value = null;
  productDescr.value = "";
  errorPrice.value = "1";
  errorName.value = "1";
  productImg.value = null;
};

const removeFile = () =>{
  productImg.value = null
}

const checkEdit = () => {
  if (productsStore.isEdit) {
    productId.value = productsStore.editingProduct[0].id;
    productName.value = productsStore.editingProduct[0].title;
    productPrice.value = productsStore.editingProduct[0].price;
    productDescr.value = productsStore.editingProduct[0].description;
    productImg.value = productsStore.editingProduct[0].image;

    if (productImg.value) {
      if (productImg.value.includes("database")) {
        const temp = productImg.value.split("images/");
        imgName.value = temp[1];
        const singleWord = !imgName.value.includes(' ')
        if(singleWord && imgName.value.length > 35){
          imgName.value = imgName.value.slice(0,35) + '...'
        }
        
      } else {
        const temp = productImg.value.split("/");
        imgName.value = temp[temp.length - 1];
        const singleWord = !imgName.value.includes(' ')
        if(singleWord && imgName.value.length > 40){
          imgName.value = imgName.value.slice(0,40) + '...'
        }
      }
    }
  } else {
    clearForm();
  }
};

watch(
  () => productsStore.isEdit,
  (newVal) => {
    isEdit.value = newVal;
    checkEdit();
  }
);
watch(
  () => productsStore.editId,
  (newVal) => {
    productId.value = newVal;
    checkEdit();
  }
);

</script>

<template>
  <div class="aside">
    <div class="aside__inner">
      <h3 class="aside__title">{{ isEdit ? 'Редактирование' : 'Добавление' }} товара</h3>
      <p class="aside__descr">Заполните все обязательные поля с *</p>
      <form class="aside__form">
        <TextInput v-model="productName"  placeholder="Название*" type="text" :isGood="productName ? true : false" :isTextBad="isTextBad" :isTextGood="isTextGood"/>
        <Error class="error" :text="errorName" :isHidden="errorName && errorName !== '1' ? false : true" :hiddenClass="productName ? true : false"/>
        <TextInput v-model="productPrice" class="aside__form-input" placeholder="Цена*" type="number" :isGood="productPrice ? true : false" :isPriceGood="isPriceGood" :isPriceBad="isPriceBad"/>
        <Error class="error" :text="errorPrice" :isHidden="errorPrice && errorPrice !== '1' ? false : true"/>
        <FileInput @img-upload="imgUpload" @remove-file="removeFile" :productImgName="productImg ? productImg.name : ''" :imgName="imgName" :isEdit="isEdit" :isGood="productImg ? true : false"/>
        <TextArea v-model="productDescr" placeholder="Описание товара" :isGood="productDescr ? true : false"/>
      </form>
      <!--
      знаю, что ниже в Button функцию правильнее будет передать через emit, но тернарный оператор почему-то не срабавыает в таком случае
      -->
      <Button
        class="aside__form-btn"
        :disabled="isDisabled"
        :isDisabled="isDisabled"
        :submit="isEdit ? putData : postData"
        >{{ isEdit ? "Редактировать товар" : "Добавить товар" }}</Button
      >
      <Button
        class="aside__form-btn"
        v-if="isEdit"
        :submit="productsStore.cancelEdit"
        isCancel
        >Отменить редактирование</Button
      >
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/_vars.scss";
.aside {
  position: fixed;
  box-shadow: 5px 0px 5px 0px $black-opacity;
  height: 100vh;
  width: 480px;
  z-index: $top;
  &__inner {
    display: flex;
    flex-direction: column;
    padding-left: 26px;
    padding-right: 26px;
  }
  &__title {
    margin-top: 35px;
    font-weight: 600;
    font-size: 25px;
    line-height: 30px;
    margin-bottom: 30px;
    text-align: center;
  }
  &__descr {
    margin-bottom: 5px;
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
  &__form-btn--delete{
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    margin-left: auto;
  }
  &__form-delete{
    width: 19px;
    height: 19px;
    
    cursor: pointer;
  }
  &__form-header{
    font-size: 12px;
    line-height: 14px;
    margin-top: 16px;
    color: $black;
  }
  &__form-input {
    box-shadow: 2px 4px 4px 0px $gray-border-opacity;
    padding: 7px 10px;
    border: 1px solid $gray-border;
    border-radius: 3px;
    outline: none;
    margin-top: 30px;

    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }
  &__form-input::placeholder {
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: $gray-text;
  }
  &__form-input:focus {
    border: 1px solid $blue;
    box-shadow: 2px 4px 4px 0px $blue-opacity;
  }
  &__form-input--good {
    border: 1px solid $blue;
    box-shadow: 2px 4px 4px 0px $blue-opacity;
    margin-top: 0;
  }
  &__form-input--bad {
    border: 1px solid $red;
    box-shadow: 2px 4px 4px 0px $red-opacity;
    margin-bottom: 0;
  }
  &__form-input--image {
    position: relative;
    display: flex;
    align-items: center;
  }
  &__form-input--image::before {
    content: "";
    position: absolute;
    width: 19px;
    height: 19px;
    top: 6px;
    right: 35px;
    background-image: url(../assets/images/file.svg);
    background-repeat: no-repeat;
    background-size: cover;
  }
  &__form-input--good.aside__form-input--image::before {
    content: "";
    position: absolute;
    width: 19px;
    height: 19px;
    top: 6px;
    right: 35px;
    z-index: $top;
    background-image: url(../assets/images/file-uploaded.svg);
    background-repeat: no-repeat;
    background-size: cover;
  }
  &__form-input--image input[type="file"] {
    position: absolute;
    z-index: $hide;
    opacity: 0;
    display: block;
    width: 0;
    height: 0;
  }
  &__form-span {
    color: $gray-text;
    padding-right: 30px;
  }
  &__form-span--active {
    color: $black;
    max-width: 380px;
    display: inline-block;
  }
  &__form-textarea {
    margin-top: 30px;
    margin-bottom: 30px;
    resize: none;
    padding-top: 10px;
    padding-left: 10px;
    border-radius: 3px;
    min-height: 165px;
    outline: none;
    box-shadow: 2px 4px 4px 0px $gray-border-opacity;
    border: 1px solid $gray-border;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }
  &__form-textarea::placeholder {
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: $gray-text;
  }
  &__form-textarea:focus {
    border: 1px solid $blue;
    box-shadow: 2px 4px 4px 0px $blue-opacity;
  }
  &__form-textarea--active {
    border: 1px solid $blue;
    box-shadow: 2px 4px 4px 0px $blue-opacity;
    margin-top: 0;
  }
  &__form-btn {
    padding-top: 10px;
    padding-bottom: 10px;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: white;
    border: 1px solid $blue;
    background: $blue;
    box-shadow: 2px 4px 4px 0px $blue-opacity;
    border-radius: 3px;
    cursor: pointer;
    transition: all ease 0.3s;
  }
  &__form-btn--cancel {
    background-color: $red;
    border: 1px solid $red;
    box-shadow: 2px 4px 4px 0px $red-opacity;
    margin-top: 30px;
  }
  &__form-btn--cancel:hover {
    background-color: $red-hover !important;
    border: 1px solid $red-hover !important;
  }
  &__form-btn:hover {
    background: $blue-hover;
    border: 1px solid $blue-hover;
  }
  &__form-btn:active {
    transform: translateY(5px);
  }
  &__form-btn--disabled {
    padding-top: 10px;
    padding-bottom: 10px;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: white;
    border-radius: 3px;
    cursor: default;
    box-shadow: 2px 4px 4px 0px $gray-border-opacity;
    border: 1px solid $gray-border;
    background-color: $gray-border;
  }
  &__form-btn--disabled:hover {
    background: $gray-border !important;
    border: 1px solid $gray-border;
  }
  &__form-btn--disabled:active {
    transform: none;
  }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.error {
  font-size: 7px;
  line-height: 9px;
  color: $red;
  margin-bottom: 21px;
  display: block;
  &--hidden {
    display: none;
  }
}
</style>
