<script setup>
const props = defineProps({
  func: Function,
  text: String,
  type: String,
  productDescr: String,
  productName: String,
  productPrice: Number,
  productImg: File,
});

</script>

<template>
  <button
    :disabled="type === 'post' & !productDescr & !productName & !productPrice & !productImg"
    :class="
      productDescr || productName || productPrice || productImg
        ? 'aside__form-btn'
        : type === 'edit'
        ? 'aside__form-btn aside__form-btn--edit'
        : type === 'cancel'
        ? 'aside__form-btn aside__form-btn--cancel'
        : 'aside__form-btn--disabled'
    "
    @click="func"
  >
    {{ text }}
  </button>

  <!-- 
  тернарный оператор: 
  if естьДанные{ 
    обычная кнопка
  } elif тип = редактировать{
  кнопка редактирования 
  } elif тип = отмена{ 
    кнопка отмены 
  } else{ 
    выключенная кнопка 
  } 
  алгоритм добавления новой кнопки на сайт:
  1. убрать 'aside__form-btn--disabled'
  2. добавить условие type === тип кнопки
  3. true ==> прописать дефолт класс или особый
  4. false ==> 'aside__form-btn--disabled'
  -->
</template>
