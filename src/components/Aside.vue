<script setup>
import { ref, watch } from "vue";
import { useProductsStore } from "../stores/ProductsStore";
const productsStore = useProductsStore();

const productName = ref(null);
const productPrice = ref(null);
const productDescr = ref("");
const errorPrice = ref("1");
const errorName = ref("1");
const productImg = ref(null);
const isEdit = ref(productsStore.isEdit);
const productId = ref(null);

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
              productImg ? (isEdit ? "Изменить фото" : productImg.name) : "Фото"
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
      <button
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
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  position: fixed;
  box-shadow: 5px 0px 5px 0px rgba(0, 0, 0, 0.25);
  height: 100vh;
  width: 480px;
  z-index: 999;
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
    box-shadow: 2px 4px 4px 0px rgba(198, 189, 189, 0.25);
    padding: 7px 10px;
    border: 1px solid rgba(198, 189, 189, 1);
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
    color: rgba(136, 136, 136, 1);
  }
  &__form-input:focus {
    border: 1px solid rgba(64, 111, 233, 1);
    box-shadow: 2px 4px 4px 0px rgba(64, 111, 233, 0.25);
  }
  &__form-input--good {
    border: 1px solid rgba(64, 111, 233, 1);
    box-shadow: 2px 4px 4px 0px rgba(64, 111, 233, 0.25);
  }
  &__form-input--bad {
    border: 1px solid rgba(242, 60, 60, 1);
    box-shadow: 2px 4px 4px 0px rgba(242, 60, 60, 0.25);
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
    z-index: 100;
    background-image: url(../assets/images/file-uploaded.svg);
    background-repeat: no-repeat;
    background-size: cover;
  }
  &__form-input--image input[type="file"] {
    position: absolute;
    z-index: -1;
    opacity: 0;
    display: block;
    width: 0;
    height: 0;
  }
  &__form-span {
    color: rgba(136, 136, 136, 1);
  }
  &__form-span--active {
    color: #000;
  }
  &__form-textarea {
    margin-bottom: 30px;
    resize: none;
    padding-top: 10px;
    padding-left: 10px;
    border-radius: 3px;
    min-height: 165px;
    outline: none;
    box-shadow: 2px 4px 4px 0px rgba(198, 189, 189, 0.25);
    border: 1px solid rgba(198, 189, 189, 1);
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
    color: rgba(136, 136, 136, 1);
  }
  &__form-textarea:focus {
    border: 1px solid rgba(64, 111, 233, 1);
    box-shadow: 2px 4px 4px 0px rgba(64, 111, 233, 0.25);
  }
  &__form-textarea--active {
    border: 1px solid rgba(64, 111, 233, 1);
    box-shadow: 2px 4px 4px 0px rgba(64, 111, 233, 0.25);
  }
  &__form-btn {
    padding-top: 10px;
    padding-bottom: 10px;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #fff;
    border: 1px solid rgba(64, 111, 233, 1);
    background: rgba(64, 111, 233, 1);
    box-shadow: 2px 4px 4px 0px rgba(64, 111, 233, 0.25);
    border-radius: 3px;
    cursor: pointer;
    transition: all ease 0.3s;
  }
  &__form-btn--edit {
    margin-bottom: 30px;
  }
  &__form-btn--cancel {
    background-color: rgba(242, 60, 60, 1);
    border: 1px solid rgba(242, 60, 60, 1);
    box-shadow: 2px 4px 4px 0px rgba(242, 60, 60, 0.25);
  }
  &__form-btn--cancel:hover {
    background-color: rgba(242, 60, 60, 0.85) !important;
    border: 1px solid rgba(242, 60, 60, 0.85) !important;
  }
  &__form-btn:hover {
    background: rgba(64, 111, 233, 0.85);
    border: 1px solid rgba(64, 111, 233, 0.85);
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
    color: #fff;
    border-radius: 3px;
    cursor: default;
    box-shadow: 2px 4px 4px 0px rgba(198, 189, 189, 0.25);
    border: 1px solid rgba(198, 189, 189, 1);
    background-color: rgba(198, 189, 189, 1);
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
  color: rgba(242, 60, 60, 1);
  margin-bottom: 21px;
  display: block;
  &--hidden {
    display: none;
  }
}
</style>
