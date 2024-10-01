<script setup>
import { computed } from "vue";
import Button from "./Button.vue";
import { useProductsStore } from "../stores/ProductsStore";

const productsStore = useProductsStore();
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const innerClasses = computed(() => ({
  "item__inner--active":
    productsStore.isEdit && productsStore.editId === props.id,
}));
const boxClasses = computed(() => ({
  "item__box--sample": props.product.image === "" || !props.product.image,
}));

const deleteItem = async (id) => {
  await productsStore.deleteProducts(id);
};
const editItem = (id) => {
  productsStore.editProduct(id);
};
</script>

<template>
  <div class="item">
    <div
      v-if="!productsStore.isLoading"
      class="item__inner"
      :class="innerClasses"
    >
      <Button
        class="item__edit"
        :isEdit="!!(id === productsStore.editId)"
        isCircle
        action="edit"
        @click="editItem(id)"
      />
      <Button
        class="item__delete"
        isCircle
        action="delete"
        @click="deleteItem(id)"
      />

      <div class="item__box" :class="boxClasses">
        <img
          v-if="product.image === '' || product.image === null"
          src="../assets/images/sample.png"
          alt="sample"
          class="item__img"
        />
        <img
          v-else
          :src="`${product.image}`"
          alt="product-img "
          class="item__img"
        />
      </div>
      <h4 class="item__title">{{ product.title }}</h4>
      <p class="item__descr">
        <span class="item__descr-span">Описание:</span>
        {{ product.description }}
      </p>
      <p class="item__price">{{ product.price }} ₽</p>
    </div>
  </div>
</template>

<style lang="scss">
.item {
  &__inner {
    display: flex;
    height: 100%;
    flex-direction: column;
    width: 300px;
    min-height: 400px;
    box-shadow: 5px 5px 5px 0px var(--black-opacity);
    border-radius: 12px;
    background-color: white;
    position: relative;
  }
  &__inner--active {
    box-shadow: 10px 10px 5px 0px var(--blue-opacity);
  }
  &__inner:hover button {
    display: inline-block;
  }
  &__edit,
  &__delete {
    z-index: var(--top);
    background-color: transparent;
    border: none;
    position: absolute;
    right: 10px;
    top: 10px;
    display: none;
    cursor: pointer;
    outline: none;
  }
  &__edit:hover path,
  &__delete:hover path {
    fill: white;
  }
  &__edit:hover rect,
  &__delete:hover rect {
    fill: var(--blue);
  }
  &__edit-icon--active:hover {
    display: inline-block;
  }
  &__delete {
    top: 50px;
  }
  &__box {
    height: 200px;
    width: 300px;
    overflow: hidden;
    position: relative;
    border: 1px solid var(--gray-border);
    border-radius: 12px;
    margin-bottom: 10px;
  }
  &__box--sample {
    border: none;
  }
  &__img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
  &__title {
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  &__descr {
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 10px;
    margin-left: 10px;
    max-width: 280px;
  }
  &__descr--span {
    font-weight: 700;
  }
  &__price {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    margin-left: 10px;
    margin-bottom: 10px;
    margin-top: auto;
  }
}
</style>
