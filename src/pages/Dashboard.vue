<template>

    <div class="container">
        <div class="row">
            <div class="col-6 my-2">
                <h1>My store</h1>
                <p>Manage your products here.</p>
            </div>
            <div class="col-6 d-flex align-items-end justify-content-end my-2">
                <router-link class="btn btn-primary" to="/products/new"><i class="bi bi-folder-plus"></i> Create a product</router-link>
            </div>
        </div>

        <hr>

        <div class="row mb-2">
            <div class="col-lg-3 mb-3" v-for="product in products" :key="product.id">
                <Product :product="product" :me="user" @delete="deleteProduct"></Product>
            </div>
        </div>

        <Pagination :page="page" :last_page="last_page" :total="total" @pagechanged="pagechanged"></Pagination>

        <p class="my-3" v-if="!products.length">You don't have any products yet.</p>

    </div>

</template>

<script>
import axios from 'axios';
import Product from '../components/Product.vue';
import Pagination from '../components/Pagination.vue';

export default {
    name: 'Dashboard',
    components: {
        Product,
        Pagination,
    },
    data() {
        return {
            user: [],
            products: [],
            page: 1,
            last_page: 1,
            total: 0,
        }
    },
    methods: {

        getMe() {
            axios.get('https://api.tinyshops.rckt.com.br/api/me?page=' + this.page, {withCredentials: true}).then(response => {
                this.user = response.data;
                this.products = response.data.products?.data || [];
                this.last_page = response.data.products?.last_page || 1;
                this.total = response.data.products?.total || 0;
            }).catch(error => {
                console.log(error.response.data);
            });
        },

        deleteProduct(id) {
            if (!confirm('Are you sure you want to delete this product?')) return;
            axios.delete('https://api.tinyshops.rckt.com.br/api/products/' + id, {withCredentials: true}).then(response => {
                this.getMe();
            }).catch(error => {
                console.log(error.response.data);
            });
        },

        pagechanged(page) {
            this.page = page;
            this.getMe();
        },

    },
    mounted() {
        this.getMe();
    },

    watch: {
        page() {
            this.getMe();
        }
    }
}
</script>

<style lang="scss"></style>