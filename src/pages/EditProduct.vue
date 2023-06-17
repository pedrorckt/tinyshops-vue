<template>

    <div class="d-flex align-items-center py-4">
        <main class="form-signin w-100 m-auto">
            <form @submit.prevent="update()">
                
                <h1 class="h3 mb-3 fw-normal">New product</h1>
                
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="name" maxlength="250" v-model="name" placeholder="My product">
                    <label for="name">Name</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="description" maxlength="500" v-model="description" placeholder="Description">
                    <label for="description">Description</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="price" step="0.01" v-model="price">
                    <label for="price">Price</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="url" class="form-control" id="image" v-model="image">
                    <label for="image">Image link</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="1" id="is_pinned" v-model="is_pinned">
                    <label class="form-check-label" for="is_pinned">
                        Top
                    </label>
                </div>
                
                <button class="btn btn-primary w-100 py-2" type="submit">Update</button>

                <p class="text-danger my-2" v-if="error">{{ error }}</p>

            </form>
        </main>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'NewProduct',
    components: {
    },
    data() {
        return {
            name: '',
            description: '',
            price: 0,
            image: '',
            is_pinned: false,
            error: '',
        }
    },
    mounted() {
        axios.get('http://localhost:8000/api/products/' + this.$route.params.id, {withCredentials: true}).then(response => {
            this.name = response.data.name;
            this.description = response.data.description;
            this.price = response.data.price / 100;
            this.image = response.data.image;
            this.is_pinned = response.data.is_pinned;
        }).catch(error => {
            this.error = error.response.data?.message;
        });
    },
    methods: {
        update() {
            axios.put('http://localhost:8000/api/products/' + this.$route.params.id, {
                name: this.name,
                description: this.description,
                price: Math.round(this.price * 100),
                image: this.image,
                is_pinned: this.is_pinned,
            }, {withCredentials: true}).then(response => {
                this.$router.push('/dashboard');
            }).catch(error => {
                this.error = error.response.data?.message;
            });
        }
    }
}
</script>

<style lang="scss">
.form-signin {
    max-width: 350px;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>