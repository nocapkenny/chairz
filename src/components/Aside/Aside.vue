<script setup>
import { computed, ref, watch } from "vue";
import { useProductsStore } from "../../stores/ProductsStore.js";
const productsStore = useProductsStore();
import Button from "../_UiComponents/Button.vue";
import TextInput from "../_UiComponents/TextInput.vue";
import FileInput from "../_UiComponents/FileInput.vue";
import TextArea from "../_UiComponents/TextArea.vue";
import Error from "../_UiComponents/Error.vue";

const productName = ref(null);
const productPrice = ref(null);
const productDescr = ref("");
const errorPrice = ref("1");
const errorName = ref("1");
const productImg = ref();
const isEdit = ref(productsStore.isEdit);
const productId = ref(null);
const imgName = ref("");

// const isDisabled = computed(() => {
//   if (
//     !productDescr.value &&
//     !productName.value &&
//     !productPrice.value &&
//     !productImg.value
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// });
// const isDisabled = computed(() =>
//   !productDescr.value &&
//   !productName.value &&
//   !productPrice.value &&
//   !productImg.value
//     ? true
//     : false
// );
const isDisabled = computed(
  () =>
    !!(
      !productDescr.value &&
      !productName.value &&
      !productPrice.value &&
      !productImg.value
    )
);

const isTextBad = computed(() => {
  if (productName.value) {
    return false;
  }
  if (errorName.value && errorName.value !== "1") {
    return true;
  }
});
const isTextGood = computed(() => {
  if (productName.value) {
    return true;
  }
});
const isPriceBad = computed(() => {
  if (productPrice.value && productPrice.value > 0) {
    return false;
  } else if (errorPrice.value && errorPrice.value !== "1") {
    return true;
  } else if (productPrice.value && productPrice.value <= 0) {
    return true;
  }
});
const isPriceGood = computed(() => {
  if (productPrice.value && productPrice.value > 0) {
    return true;
  }
});

const imgUpload = (event) => {
  productImg.value = event.target.files[0];
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

const removeFile = () => {
  productImg.value = null;
  console.log(productImg.value);
};

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
        const singleWord = !imgName.value.includes(" ");
        if (singleWord && imgName.value.length > 35) {
          imgName.value = imgName.value.slice(0, 35) + "...";
        }
      } else {
        const temp = productImg.value.split("/");
        imgName.value = temp[temp.length - 1];
        const singleWord = !imgName.value.includes(" ");
        if (singleWord && imgName.value.length > 40) {
          imgName.value = imgName.value.slice(0, 40) + "...";
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
      <h3 class="aside__title">
        {{ isEdit ? "Редактирование" : "Добавление" }} товара
      </h3>
      <p class="aside__descr">Заполните все обязательные поля с *</p>
      <form class="aside__form">
        <TextInput
          v-model="productName"
          placeholder="Название*"
          type="text"
          :isGood="!!productName"
          :isTextBad="isTextBad"
          :isTextGood="isTextGood"
        />
        <Error
          class="error"
          :text="errorName"
          :isHidden="!(errorName && errorName !== '1')"
          :hiddenClass="!!productName"
        />
        <TextInput
          v-model="productPrice"
          :isTextBad="isTextBad"
          placeholder="Цена*"
          type="number"
          :isGood="!!productPrice"
          :isPriceGood="isPriceGood"
          :isPriceBad="isPriceBad"
        />
        <Error
          class="error"
          :text="errorPrice"
          :isHidden="!(errorPrice && errorPrice !== '1')"
        />
        <FileInput
          @img-upload="imgUpload"
          @remove-file="removeFile"
          :productImgName="productImg ? productImg.name : ''"
          :imgName="imgName"
          :isEdit="isEdit"
          :isPriceError="!!(errorPrice && errorPrice !== '1')"
          :isGood="!!productImg"
        />
        <TextArea
          v-model="productDescr"
          placeholder="Описание товара"
          :isGood="!!productDescr"
        />
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
@import url('./Aside.scss');
</style>
