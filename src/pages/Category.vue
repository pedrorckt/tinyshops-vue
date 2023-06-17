<template>

    <div class="container">
        <div class="row">
            <div class="col my-2">
                <h1>Category: {{ category.name }}</h1>
                <p>Products in this category:</p>
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
            category: {},
            products: [],
            page: 1,
            last_page: 1,
            total: 0,
        }
    },
    methods: {
        getCategory() {
            axios.get('https://api.tinyshops.rckt.com.br/api/categories/' + this.$route.params.id + '?page=' + this.page).then(response => {
                this.category = response.data;
                this.products = response.data.products?.data;
                this.last_page = response.data.products?.last_page || 1;
                this.total = response.data.products?.total;
            }).catch(error => {
                console.log(error.response.data);
            });
        },
        pagechanged(page) {
            this.page = page;
        },
    },
    mounted() {
        this.getCategory();
    },
    watch: {
        page() {
            this.getCategory();
        }
    }
}
</script>

<style lang="scss"></style>