import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";

export const useProductsStore = defineStore("productsStore", () => {
  //states
  const products = ref([]);
  const isLoading = ref(false);
  const isEdit = ref(false);
  const editId = ref(null);
  const editingProduct = ref([]);

  //actions
  const getProducts = async () => {
    try {
      isLoading.value = true;
      const { data } = await axios.get("http://localhost:3030/api/products");
      products.value = JSON.parse(data);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const postProducts = async (formData) => {
    try {
      isLoading.value = true;
      const { data } = await axios.post(
        "http://localhost:3030/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const tempId = data.id;
      products.value.products.push({ ...formData, id: tempId });
    } catch (err) {
      console.log(err);
    } finally {
      isLoading.value = false;
    }
  };
  const putProducts = async (formData) => {
    try {
      isLoading.value = true;
      const { data } = await axios.put(
        "http://localhost:3030/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //изменение элемента в массиве
      const index = products.value.products.findIndex(
        (product) => product.id === formData.id
      );
      if (index !== -1) {
        products.value.products[index] = data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      isLoading.value = false;
      isEdit.value = false;
      editId.value = null;
    }
  };
  const deleteProducts = async (id) => {
    try {
      isLoading.value = true;
      const { data } = await axios.delete(
        `http://localhost:3030/api/products/${id}`
      );
    } catch (err) {
      console.error(err);
    } finally {
      //удаление элемента
      products.value.products = products.value.products.filter(
        (product) => product.id !== id
      );
      isLoading.value = false;
      isEdit.value = false;
      editId.value = null;
      editingProduct.value = [];
    }
  };

  const editProduct = (id) => {
    isEdit.value = true;
    editId.value = id;
    getProductById(editId.value);
  };
  const cancelEdit = () => {
    isEdit.value = false;
    editId.value = null;
  };
  const getProductById = (id) => {
    editingProduct.value = [];
    editingProduct.value = products.value.products.filter((el) => el.id === id);
  };

  watch(products.value.products, getProducts(), { deep: true });
  return {
    products,
    getProducts,
    postProducts,
    deleteProducts,
    isLoading,
    isEdit,
    editProduct,
    editId,
    cancelEdit,
    getProductById,
    editingProduct,
    putProducts,
  };
});
