<template>

    <div class="container">
        <div class="row">
            <div class="col-8 my-2">
                <h1>Last seen products</h1>
                <p>Your last seen products.</p>
            </div>
            <div class="col-4 text-end">
                <button class="btn btn-primary py-2 my-2" @click="clear"><i class="bi bi-trash"></i> Clear history</button>
            </div>
        </div>

        <hr>

        <div class="row mb-2">
            <div class="col-md-6 col-lg-3 mb-3" v-for="product in products" :key="product.id">
                <Product :product="product"></Product>
            </div>
        </div>

        <Pagination :page="page" :last_page="last_page" :total="total" @pagechanged="pagechanged"></Pagination>

    </div>

</template>

<script>
import axios from 'axios';
import Product from '../components/Product.vue';
import Pagination from '../components/Pagination.vue';

export default {
    name: 'Platform',
    components: {
        Product,
        Pagination
    },
    data() {
        return {
            products: [],
            page: 1,
            last_page: 1,
            total: 0,
        }
    },
    methods: {
        
        getProducts() {
            let seen = localStorage.getItem('seen');
            seen = seen ? JSON.parse(seen) : [];
            if (!seen.length) {this.products = []; return;}
            axios.get('https://api.tinyshops.rckt.com.br/api/products?ids=' + seen.join(',') + '&page=' + this.page).then(response => {
                this.products = response.data.data;
                this.last_page = response.data.last_page || 1;
                this.total = response.data.total;
            }).catch(error => {
                console.log(error.response.data);
            });
        },

        pagechanged(page) {
            this.page = page;
        },

        clear() {
            localStorage.removeItem('seen');
            this.products = [];
        },

    },
    mounted() {
        this.getProducts();
    },
    watch: {
        page() {
            this.getProducts();
        }
    }
}
</script>

<style lang="scss"></style>