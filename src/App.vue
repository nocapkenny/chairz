<script setup>
import Form from "./components/Form/Form.vue";
import Products from "./components/Products/Products.vue";
import { useProductsStore } from "../src/stores/ProductsStore.js";
import { computed, ref, watch } from "vue";
const productsStore = useProductsStore();

const isEdit = ref(productsStore.isEdit);

const formHeader = computed(()=>{
  if (isEdit.value){
    return 'Редактирование товара'
  } else{
    return 'Добавление товара'
  }
})
const buttonText = computed(()=>{
  if (isEdit.value){
    return 'Редактировать товар'
  } else{
    return 'Добавить товар'
  }
})

const postData = async (productName, errorName, productPrice, errorPrice, productDescr, productImg) => {
  if (productName === null) {
    errorName = "Обязательное поле для заполнения";
    return;
  }
  errorName = "";
  if (productPrice === null) {
    errorPrice = "Обязательное поле для заполнения";
    return;
  } else if (productPrice <= 0) {
    errorPrice = "Цена должна быть больше нуля";
    return;
  }
  errorName = "";
  errorPrice = "";

  const formData = {
    title: productName,
    price: productPrice,
    description: productDescr,
    image: productImg,
  };
  await productsStore.postProducts(formData);
};

const putData = async (productName, errorName, productPrice, errorPrice, productId, productDescr, productImg) => {
  if (productName === null) {
    errorName = "Обязательное поле для заполнения";
    return;
  }
  errorName = "";
  if (productPrice === null) {
    errorPrice = "Обязательное поле для заполнения";
    return;
  } else if (productPrice <= 0) {
    errorPrice = "Цена должна быть больше нуля";
    return;
  }
  errorName = "";
  errorPrice = "";
  const formData = {
    id: productId,
    title: productName,
    price: productPrice,
    description: productDescr,
    image: productImg,
  };
  await productsStore.putProducts(formData);
};

watch(
  () => productsStore.isEdit,
  (newVal) => {
    isEdit.value = newVal;
  }
);

</script>

<template>
  <Form :buttonText="buttonText" :formHeader="formHeader" :postData="postData" :putData="putData"/>
  <Products/> 
    
</template>



