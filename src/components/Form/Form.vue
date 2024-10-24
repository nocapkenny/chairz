<script setup>
import { computed, ref, watch, defineProps } from "vue";
import { useProductsStore } from "../../stores/ProductsStore.js";
const productsStore = useProductsStore();
import Button from "../_UiComponents/Button.vue";
import TextInput from "../_UiComponents/TextInput.vue";
import FileInput from "../_UiComponents/FileInput.vue";
import TextArea from "../_UiComponents/TextArea.vue";
import Error from "../_UiComponents/Error.vue";

const props = defineProps({
  formHeader: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  putData: {
    type: Function,
    required: false,
  },
  postData: {
    type: Function,
    required: false,
  },
});

const productName = ref(null);
const productPrice = ref(null);
const productDescr = ref("");
const errorPrice = ref("1");
const errorName = ref("1");
const productImg = ref();
const isEdit = ref(productsStore.isEdit);
const productId = ref(null);
const imgName = ref("");

//дисейбл кнопки
const isDisabled = computed(
  () =>
    !!(
      !productDescr.value &&
      !productName.value &&
      !productPrice.value &&
      !productImg.value
    )
);
//computed для стилей инпута Название*
const isTextBad = computed(() => {
  if (productName.value) {
    return false;
  }
  if (errorName.value && errorName.value !== "1") {
    return true;
  }
});
//computed для стилей инпута Название*
const isTextGood = computed(() => !!productName.value);
//computed для стилей инпута Цена*
const isPriceBad = computed(() => {
  if (productPrice.value && productPrice.value > 0) {
    return false;
  } else if (errorPrice.value && errorPrice.value !== "1") {
    return true;
  } else if (productPrice.value && productPrice.value <= 0) {
    return true;
  }
});

//computed для стилей инпута Цена*
const isPriceGood = computed(() => {
  if (productPrice.value && productPrice.value > 0) {
    return true;
  }
});

//загрузка фото
const imgUpload = (event) => {
  productImg.value = event.target.files[0];
};

//действия при клике на кнопку
const handleSubmit = () => {
  if (!isEdit.value) {
    props.postData(
      productName.value,
      errorName.value,
      productPrice.value,
      errorPrice.value,
      productDescr.value,
      productImg.value
    );
  } else{
    props.putData(
      productName.value,
      errorName.value,
      productPrice.value,
      errorPrice.value,
      productId.value,
      productDescr.value,
      productImg.value
    )
  }
  clearForm()
};

//очистка формы
const clearForm = () => {
  productName.value = null;
  productPrice.value = null;
  productDescr.value = "";
  errorPrice.value = "1";
  errorName.value = "1";
  productImg.value = null;
};

//очистка поля Фото
const removeFile = () => {
  productImg.value = null;
};

//обновление значений, если карточка редактируется
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

//при измении isEdit обновляются все значения переменных
watch(
  () => productsStore.isEdit,
  (newVal) => {
    isEdit.value = newVal;
    checkEdit(
      productName.value,
      productPrice.value,
      productDescr.value,
      errorPrice.value,
      errorName.value,
      productImg.value
    );
  }
);
//ловим айди редактируемой карточки
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
        {{ props.formHeader }}
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
      
      <Button
        class="aside__form-btn"
        :disabled="isDisabled"
        :isDisabled="isDisabled"
        @handle-submit="handleSubmit"
        >{{ buttonText }}</Button
      >
      <Button
        class="aside__form-btn"
        v-if="isEdit"
        @handle-submit="productsStore.cancelEdit"
        isCancel
        >Отменить редактирование</Button
      >
    </div>
  </div>
</template>

<style lang="scss" src="./Form.scss" />
