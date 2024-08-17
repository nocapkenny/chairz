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
</template>

<style scoped>
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
  background-color: rgba(233, 233, 233, 0.2);
  padding-right: 500px;
  z-index: 999;
}
.container--void {
  background-color: rgba(233, 233, 233, 1);
  z-index: 1;
}
.products__inner {
  background-color: rgba(233, 233, 233, 1);
  margin-left: 480px;
  padding-left: 40px;
  padding-bottom: 110px;
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  z-index: 1;
  min-height: 100vh;
}
</style>
