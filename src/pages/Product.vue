<template>

    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-xl-3">
                <img :src="product.image" class="img-fluid rounded" alt="">
            </div>
            <div class="col-lg-8 col-xl-9 my-2">
                <h1>Product: {{ product.name }}</h1>
                <p><strong>Price:</strong>
                    {{ (product.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD', }) }}
                </p>
                <p> <strong>Description:</strong> {{ product.description }}</p>
                <p>
                    <small class="text-muted">
                        Categories: <span v-for="(category, i) in product.categories">{{ (i != 0) ? ',' : '' }} <router-link :to="'/categories/' + category.id" >{{ category.name }}</router-link></span>
                    </small>
                </p>
            </div>
        </div>

        <hr>

        <div class="row" v-if="mine">
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <router-link class="btn btn-primary" :to="'/products/' + product.id + '/edit'">Edit this product</router-link>
                    </div>
                </div>
            </div>
        </div>

        <hr v-if="mine">

        <div class="row">
            <div class="col-12 my-2">
                <h2>Images gallery</h2>
                <p>Images of this product</p>
            </div>
            <div class="col-12">

                <div id="productCarousel" class="carousel slide" v-if="product.images">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img :src="product.images[0]?.url" class="d-block w-100">
                        </div>
                        <div class="carousel-item" v-for="image in product.images?.slice(1)">
                            <img :src="image.url" class="d-block w-100">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { Carousel } from 'bootstrap';

export default {
    name: 'Product',
    components: {
    },
    data() {
        return {
            product: {},
            shop_id: localStorage.getItem('shop_id'),
            mine: false,
            auth: !!localStorage.getItem("auth"),
            collections: [],
            current: null,
        }
    },
    methods: {

        initCarousel() {
            new Carousel(document.getElementById('productCarousel'), {
                interval: 2000
            });
        }
    },
    mounted() {
        axios.get('https://api.tinyshops.rckt.com.br/api/products/' + this.$route.params.id)
        .then(response => {
            this.product = response.data;
            this.mine = this.shop_id == this.product.shop_id;
            this.initCarousel();
        })
        .catch(error => {
            console.log(error);
        });

        let seen = localStorage.getItem("seen");
        seen = seen ? JSON.parse(seen) : [];
        seen.unshift(this.$route.params.id);
        seen = [...new Set(seen)];
        console.log(seen);
        if (seen.length > 10) {
            seen.pop();
        }
        localStorage.setItem("seen", JSON.stringify(seen));
    }
}
</script>

<style lang="scss"></style>