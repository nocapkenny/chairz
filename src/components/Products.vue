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
  background-color: var(--gray-bg);
  padding-right: 500px;
  z-index: var(--top);
  &--void {
    background-color: var(--gray-bg);
    z-index: var(--bot);
  }
}

.products {
  &__inner {
    align-items: stretch;
    background-color: var(--gray-bg);
    margin-left: 480px;
    padding: 50px 0 110px 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    z-index: var(--bot);
    min-height: 100vh;
  }
}
</style>
