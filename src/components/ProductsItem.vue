<script setup>
import { useProductsStore } from '../stores/ProductsStore'
const productsStore = useProductsStore()
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  id:{
    type: Number,
    required: true,
  }
});

const deleteItem = async (id) => {
    await productsStore.deleteProducts(id)
}
</script>

<template>
  <div v-if="!productsStore.isLoading" :class="productsStore.isEdit && productsStore.editId == id ? 'item__inner item__inner--active' : 'item__inner'">
    <button @click="productsStore.editProduct(id)" :class="productsStore.isEdit && productsStore.editId == id ? 'item__edit item__edit--active' : 'item__edit'">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_6_336)">
          <rect x="3" width="30" height="30" rx="15" fill="#D9D9D9" />
        </g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M26.7175 6.365C26.2031 5.85473 25.508 5.56813 24.7834 5.5675C24.1557 5.56955 23.5475 5.78627 23.06 6.18167L14.4709 13.1667L14.3334 13.3042C13.1362 14.4911 12.8707 16.3276 13.6825 17.805C13.3494 17.7034 13.004 17.6479 12.6559 17.64C10.6308 17.64 8.9892 19.2816 8.9892 21.3067V23.5983C8.9892 24.3577 9.60481 24.9733 10.3642 24.9733H12.6559C13.9288 24.9664 15.107 24.2997 15.7684 23.2122C16.4299 22.1246 16.4801 20.7718 15.9009 19.6383C16.2672 19.762 16.6509 19.827 17.0375 19.8308C18.0528 19.8377 19.0278 19.4344 19.7417 18.7125L19.8334 18.6117L26.8642 10.0225C27.7516 8.94314 27.6886 7.36984 26.7175 6.365ZM12.6925 23.5983H10.4009V21.3067C10.4009 20.041 11.4269 19.015 12.6925 19.015C13.9582 19.015 14.9842 20.041 14.9842 21.3067C14.9842 22.5723 13.9582 23.5983 12.6925 23.5983ZM18.8067 17.75L25.8375 9.15167C26.2685 8.61184 26.225 7.83438 25.7366 7.34593C25.2482 6.85749 24.4707 6.81403 23.9309 7.24501L15.3417 14.2758C14.3823 15.2327 14.3803 16.7861 15.3371 17.7454C16.2939 18.7048 17.8473 18.7068 18.8067 17.75Z"
          fill="black"
        />
        <path
          d="M19.1 13.0108L16.35 15.7608C16.0819 16.0293 16.0819 16.4641 16.35 16.7325C16.6184 17.0006 17.0533 17.0006 17.3217 16.7325L20.0717 13.9825C20.2556 13.8111 20.3313 13.553 20.2691 13.3094C20.2069 13.0658 20.0167 12.8756 19.7731 12.8134C19.5295 12.7512 19.2714 12.8269 19.1 13.0108Z"
          fill="black"
        />
        <defs>
          <filter
            id="filter0_d_6_336"
            x="0"
            y="0"
            width="40"
            height="40"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="2" dy="5" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_6_336"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_6_336"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </button>
    <button @click="deleteItem(id)" class="item__delete">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_6_339)">
          <rect x="3" width="30" height="30" rx="15" fill="#D9D9D9" />
        </g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.7083 5.30164H20.2916C23.3292 5.30164 25.7916 7.76407 25.7916 10.8016V19.0516C25.7916 22.0892 23.3292 24.5516 20.2916 24.5516H15.7083C12.6707 24.5516 10.2083 22.0892 10.2083 19.0516V10.8016C10.2083 7.76407 12.6707 5.30164 15.7083 5.30164ZM20.2916 22.865C22.3977 22.865 24.105 21.1577 24.105 19.0516V10.8016C24.105 8.69559 22.3977 6.9883 20.2916 6.9883H15.7083C13.6023 6.9883 11.895 8.69559 11.895 10.8016V19.0516C11.895 21.1577 13.6023 22.865 15.7083 22.865H20.2916Z"
          fill="black"
        />
        <path
          d="M20.8691 9.26164C19.2955 10.311 17.2453 10.311 15.6716 9.26164C15.4494 9.09049 15.1504 9.05732 14.896 9.1756C14.6417 9.29388 14.4744 9.54394 14.4621 9.82417C14.4498 10.1044 14.5945 10.3682 14.8375 10.5083C15.8512 11.1892 17.0446 11.553 18.2658 11.5533C19.4774 11.546 20.66 11.1826 21.6666 10.5083C21.9096 10.3682 22.0544 10.1044 22.0421 9.82417C22.0297 9.54394 21.8624 9.29388 21.6081 9.1756C21.3538 9.05732 21.0547 9.09049 20.8325 9.26164H20.8691Z"
          fill="black"
        />
        <defs>
          <filter
            id="filter0_d_6_339"
            x="0"
            y="0"
            width="40"
            height="40"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="2" dy="5" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_6_339"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_6_339"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </button>
    <img
      v-if="product.image === '' || !product.image"
      src="../assets/images/sample.png"
      alt="sample"
      class="item__img item__img--sample"
    />
    <img v-else :src="`../../database${product.image}`" alt="product-img " class="item__img" />
    <h4 class="item__title">{{ product.title }}</h4>
    <p class="item__descr">
      <span class="item__descr-span">Описание:</span> {{ product.description }}
    </p>
    <p class="item__price">{{ product.price }} ₽</p>
  </div>
</template>

<style scoped>
.item__inner {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 1);
  position: relative;
}
.item__inner--active{
  box-shadow: 10px 10px 5px 0px rgba(64, 111, 233, 0.25);
}
.item__edit,
.item__delete {
  background-color: transparent;
  border: none;
  position: absolute;
  right: 10px;
  top: 10px;
  display: none;
  cursor: pointer;
  outline: none;
}
.item__delete {
  top: 50px;
}
.item__inner:hover button {
  display: inline-block;
}
.item__delete:hover rect,
.item__edit:hover rect{
    fill: rgba(64, 111, 233, 1);
}
.item__delete:hover path,
.item__edit:hover path{
    fill: white;
}
.item__edit--active rect{
  fill: rgba(64, 111, 233, 1);
}
.item__edit--active path{
  fill: white;
}
.item__img {
  height: 200px;
  width: 300px;
  border: 1px solid rgba(198, 189, 189, 1);
  border-radius: 12px;
  margin-bottom: 10px;
  object-fit: cover;
}
.item__img--sample {
  border: none;
}
.item__title {
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  margin-bottom: 10px;
  margin-left: 10px;
}
.item__descr {
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  margin-bottom: 10px;
  margin-left: 10px;
  max-width: 280px;
}
.item__descr-span {
  font-weight: 700;
}
.item__price {
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-top: auto;
}
</style>
