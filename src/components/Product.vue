<template>

    <div class="card h-100">
        <img :src="product.image" class="card-img-top">
        <div class="card-body d-flex flex-column justify-content-between">

            <div class="mb-2">

                <h5 class="card-title mb-2"><router-link :to="'/products/' + product.id">{{ product.name }}</router-link></h5>

                <p class="card-text text-muted mb-0">{{ (product.price / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD', }) }}</p>
                <p class="card-text text-muted mb-2" v-if="product.is_pinned">TOP product</p>

                <p class="card-text">{{ product.description }}</p>

            </div>

            <div class="mb-2">
                <p class="card-text mb-0">
                    <small class="text-muted">
                        Categories: <span v-for="(category, i) in product.categories">{{ (i != 0) ? ',' : '' }} <router-link :to="'/categories/' + category.id" >{{ category.name }}</router-link></span>
                    </small>
                </p>
                <div v-if="mine">
                    <router-link class="btn btn-primary me-2" :to="'/products/' + product.id + '/edit'"><i class="bi bi-pencil-square"></i> Edit</router-link>
                    <button class="btn btn-light" @click="deleteProduct"><i class="bi bi-trash"></i> Delete</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Product',
    props: ['product', 'me'],
    methods: {
        deleteProduct() {
            console.log('delete', this.product.id);
            this.$emit('delete', this.product.id);
        },
    },
    data() {
        return {
            mine: false,
        }
    },
    mounted() {
        this.mine = this.me?.shop_id == this.product.shop_id;
    }
}
</script>