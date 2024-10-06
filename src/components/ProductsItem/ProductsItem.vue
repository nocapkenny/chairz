<script setup>
import { computed } from "vue";
import Button from "../Button.vue";
import { useProductsStore } from "../../stores/ProductsStore.js";

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
          src="../../assets/images/sample.png"
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
@import url('../ProductsItem/ProductsItem.scss');
</style>
