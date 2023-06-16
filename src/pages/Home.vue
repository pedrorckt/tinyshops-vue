<template>

    <div class="container">
        <div class="row">
            <div class="col my-2">
                <h1>TinyShops</h1>
                <p>Make your own shop on our marketplace!</p>
            </div>
        </div>

        <hr>

        <div class="text-bg-light rounded p-3 mb-3">

            <div class="row">
                <div class="col-6 col-md-3">
                    <label for="orderby" class="form-label">Order by</label>
                    <select class="form-select form-select-sm" id="orderby" v-model="orderby">
                        <option value="default">Default (top first)</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                </div>
                <div class="col-6 col-md-3">
                    <label for="orderby" class="form-label">Order</label>
                    <select class="form-select form-select-sm" v-model="order">
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row my-2">
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
    name: 'Home',
    components: {
        Product,
        Pagination,
    },
    data() {
        return {
            products: [],
            page: 1,
            last_page: 1,
            total: 0,
            orderby: 'default',
            order: 'asc',
        }
    },
    methods: {

        getProducts() {

            let url = 'http://localhost:8000/api/products?page=' + this.page;
            
            if (this.orderby != 'default') {
                url += '&orderby=' + this.orderby + '&order=' + this.order
            }
            
            axios.get(url).then(response => {
                this.products = response.data.data;
                this.last_page = response.data.last_page;
                this.total = response.data.total;
            }).catch(error => {
                console.log(error.response.data);
            });

        },

        pagechanged(page) {
            this.page = page;
        },

    },
    
    mounted() {
        this.getProducts();
    },

    watch: {
        
        orderby() {
            this.getProducts();
        },
        
        order() {
            this.getProducts();
        },

        page() {
            this.getProducts();
        }
    }
}
</script>

<style lang="scss"></style>