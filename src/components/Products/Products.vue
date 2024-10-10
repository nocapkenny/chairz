<script setup>
import ProductsItem from "../../components/ProductsItem/ProductsItem.vue";
import Loader from "../../components/Loader/Loader.vue";
import Void from "../../components/Void/Void.vue";
import { useProductsStore } from "../../stores/ProductsStore";
const productsStore = useProductsStore();
</script>

<template>
  <div class="products">
    <div v-auto-animate class="products__inner">
      <ProductsItem
        v-if="productsStore.products.products && !productsStore.isLoading"
        v-for="product in productsStore.products.products"
        :key="product.id"
        :product="product"
        :id="product.id"
      />
      <div v-else class="products__template">
        <Loader v-if="productsStore.isLoading"/>
        <Void v-if="!productsStore.products.products && !productsStore.isLoading"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  &__template {
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
    padding-right: 500px;
    z-index: var(--top);
  }
}
</style>
