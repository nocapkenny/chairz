<script setup>
import { ref, watch } from "vue";
import { useProductsStore } from "../stores/ProductsStore";
const productsStore = useProductsStore();
import Button from "../components/Button.vue";

const productName = ref(null);
const productPrice = ref(null);
const productDescr = ref("");
const errorPrice = ref("1");
const errorName = ref("1");
const productImg = ref(null);
const isEdit = ref(productsStore.isEdit);
const productId = ref(null);
const imgName = ref("");

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
  await productsStore.postProducts(formData).then(clearForm());
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

const checkEdit = () => {
  if (productsStore.isEdit) {
    productId.value = productsStore.editingProduct[0].id;
    productName.value = productsStore.editingProduct[0].title;
    productPrice.value = productsStore.editingProduct[0].price;
    productDescr.value = productsStore.editingProduct[0].description;
    productImg.value = productsStore.editingProduct[0].image;

    if (productImg.value.includes("database")) {
      const temp = productImg.value.split('database');
      imgName.value = temp[1]
    } else{
      const temp = productImg.value.split('/')
      imgName.value = temp[temp.length - 1]
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
      <h3 class="aside__title">Добавление товара</h3>
      <p class="aside__descr">Заполните все обязательные поля с *</p>
      <form class="aside__form">
        <input
          v-model="productName"
          type="text"
          :class="
            productName
              ? 'aside__form-input aside__form-input--good'
              : errorName && errorName !== '1'
              ? 'aside__form-input aside__form-input--bad'
              : 'aside__form-input'
          "
          placeholder="Название*"
        />
        <p
          v-if="errorName && errorName !== '1'"
          :class="productName ? 'error--hidden' : 'error'"
        >
          {{ errorName }}
        </p>
        <input
          v-model="productPrice"
          type="number"
          min="0"
          :class="
            productPrice && (errorPrice === '1' || errorPrice === '')
              ? 'aside__form-input aside__form-input--good'
              : errorPrice && errorPrice !== '1'
              ? 'aside__form-input aside__form-input--bad'
              : 'aside__form-input'
          "
          placeholder="Цена*"
        />
        <p v-if="errorPrice && errorPrice !== '1'" class="error">
          {{ errorPrice }}
        </p>
        <label
          :class="
            productImg
              ? 'aside__form-input aside__form-input--image aside__form-input--good'
              : 'aside__form-input aside__form-input--image'
          "
        >
          <input @change="imgUpload" type="file" accept="image/*" />
          <span
            :class="
              productImg ? 'aside__form-span--active' : 'aside__form-span'
            "
            >{{
              productImg ? (isEdit ? imgName : productImg.name) : "Фото"
            }}</span
          >
        </label>
        <textarea
          v-model="productDescr"
          :class="
            productDescr
              ? 'aside__form-textarea aside__form-textarea--active'
              : 'aside__form-textarea'
          "
          placeholder="Описание товара"
        ></textarea>
      </form>
      <Button
        v-if="!productsStore.isEdit"
        :func="postData"
        text="Добавить товар"
        type="post"
        :productDescr="productDescr"
        :productName="productName"
        :productPrice="productPrice"
        :productImg="productImg"
      />
      <Button
        v-if="productsStore.isEdit"
        :func="putData"
        text="Редактировать товар"
        type="edit"
      />
      <Button
        v-if="productsStore.isEdit"
        :func="productsStore.cancelEdit"
        text="Отменить редактирование"
        type="cancel"
      />
      <!-- <button
        :disabled="!productDescr & !productName & !productPrice & !productImg"
        @click="postData"
        v-if="!productsStore.isEdit"
        :class="
          productDescr || productName || productPrice || productImg
            ? 'aside__form-btn'
            : 'aside__form-btn--disabled'
        "
      >
        Добавить товар
      </button>
      <button
        v-if="productsStore.isEdit"
        @click="putData"
        class="aside__form-btn aside__form-btn--edit"
      >
        Редактировать товар
      </button>
      <button
        @click="productsStore.cancelEdit"
        v-if="productsStore.isEdit"
        class="aside__form-btn aside__form-btn--cancel"
      >
        Отменить редактирование
      </button> -->
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
    margin-bottom: 35px;
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
  &__form-input {
    box-shadow: 2px 4px 4px 0px $gray-border-opacity;
    padding: 7px 10px;
    border: 1px solid $gray-border;
    border-radius: 3px;
    outline: none;
    margin-bottom: 30px;

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
  }
  &__form-input--bad {
    border: 1px solid $red;
    box-shadow: 2px 4px 4px 0px $red-opacity;
    margin-bottom: 0;
  }
  &__form-input--image {
    position: relative;
    display: inline-block;
  }
  &__form-input--image::before {
    content: "";
    position: absolute;
    width: 19px;
    height: 19px;
    top: 6px;
    right: 10px;
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
    right: 10px;
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
  }
  &__form-textarea {
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
  &__form-btn--edit {
    margin-bottom: 30px;
  }
  &__form-btn--cancel {
    background-color: $red;
    border: 1px solid $red;
    box-shadow: 2px 4px 4px 0px $red-opacity;
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
