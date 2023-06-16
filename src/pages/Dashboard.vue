<template>

    <div class="container">
        <div class="row">
            <div class="col-6 my-2">
                <h1>My store</h1>
            </div>
            <div class="col-6 d-flex align-items-end justify-content-end my-2">
                <router-link class="btn btn-primary" to="/products/new"><i class="bi bi-folder-plus"></i> Create a product</router-link>
            </div>
        </div>

        <hr>

        <div class="row mb-2">
            <div class="col-lg-3 mb-3" v-for="product in products" :key="product.id">
                <Product :product="product" :me="me"></Product>
            </div>
        </div>

        <p class="my-3" v-if="!products.length">You don't have any products yet.</p>

    </div>

</template>

<script>
import axios from 'axios';
import Product from '../components/Product.vue';

export default {
    name: 'Dashboard',
    components: {
        Product,
    },
    data() {
        return {
            user: [],
            products: [],
        }
    },
    methods: {

        getMe() {
            axios.get('http://localhost:8000/api/me', {withCredentials: true}).then(response => {
                this.user = response.data;
                this.products = response.data.products?.data || [];
            }).catch(error => {
                console.log(error.response.data);
            });
        },

        deleteProduct(id) {
            if (!confirm('Are you sure you want to delete this product?')) return;
            axios.delete('http://localhost:8000/api/products/' + id, {withCredentials: true}).then(response => {
                this.getMe();
            }).catch(error => {
                console.log(error.response.data);
            });
        },

    },
    mounted() {
        this.getMe();
    }
}
</script>

<style lang="scss"></style>