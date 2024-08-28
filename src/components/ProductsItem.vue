<script setup>
import Edit from "../assets/images/edit__inactive.svg";
import EditActive from "../assets/images/edit__active.svg";
import Delete from "../assets/images/delete__inactive.svg";
import DeleteActive from "../assets/images/delete__active.svg";
import { useProductsStore } from "../stores/ProductsStore";
import { ref } from "vue";
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

const isHoveredEdit = ref(false);
const isHoveredDel = ref(false);
const deleteItem = async (id) => {
  await productsStore.deleteProducts(id);
};
</script>

<template>
  <div class="item">
    <div
      v-if="!productsStore.isLoading"
      :class="
        productsStore.isEdit && productsStore.editId == id
          ? 'item__inner item__inner--active'
          : 'item__inner'
      "
    >
      <button
        @mouseenter="isHoveredEdit = true"
        @mouseleave="isHoveredEdit = false"
        @click="productsStore.editProduct(id)"
        class="item__edit"
      >
        <component
          :is="
            productsStore.isEdit && productsStore.editId == id
              ? EditActive
              : isHoveredEdit
              ? EditActive
              : Edit
          "
        />
      </button>
      <button
        @mouseenter="isHoveredDel = true"
        @mouseleave="isHoveredDel = false"
        @click="deleteItem(id)"
        class="item__delete"
      >
        <component :is="isHoveredDel ? DeleteActive : Delete" />
      </button>
      <div
        :class="
          product.image === '' || !product.image
            ? 'item__box item__box--sample'
            : 'item__box'
        "
      >
        <img
          v-if="product.image === '' || !product.image"
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

<style lang="scss" scoped>
.item {
  &__inner {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 400px;
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 1);
    position: relative;
  }
  &__inner--active {
    box-shadow: 10px 10px 5px 0px rgba(64, 111, 233, 0.25);
  }
  &__inner:hover button {
    display: inline-block;
  }
  &__edit,
  &__delete {
    z-index: 999;
    background-color: transparent;
    border: none;
    position: absolute;
    right: 10px;
    top: 10px;
    display: none;
    cursor: pointer;
    outline: none;
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
    border: 1px solid rgba(198, 189, 189, 1);
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
    /* переполнение */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
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
