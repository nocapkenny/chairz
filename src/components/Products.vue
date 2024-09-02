<script setup>
import ProductsItem from "../components/ProductsItem.vue";
import Loader from "../components/Loader.vue";
import Void from "../components/Void.vue";
import { useProductsStore } from "../stores/ProductsStore";
const productsStore = useProductsStore();
</script>

<template>
  <div
    v-if="!productsStore.products.products && !productsStore.isLoading"
    class="container container--void"
  >
    <Void />
  </div>
  <div v-if="productsStore.isLoading" class="container">
    <Loader />
  </div>
  <div class="products">
    <div
      v-auto-animate
      v-if="!productsStore.isLoading && productsStore.products.products"
      class="products__inner"
    >
      <ProductsItem
        v-for="product in productsStore.products.products"
        :key="product.id"
        :product="product"
        :id="product.id"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/_vars.scss';
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  margin-left: 480px;
  text-align: center;
  top: 0;
  left: 0;
  background-color: $gray-bg;
  padding-right: 500px;
  z-index: $top;
  &--void {
    background-color: $gray-bg;
    z-index: $bot;
  }
}

.products {
  &__inner {
    background-color: $gray-bg;
    margin-left: 480px;
    padding-left: 40px;
    padding-bottom: 110px;
    padding-top: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    z-index: $bot;
    min-height: 100vh;
  }
}
</style>
