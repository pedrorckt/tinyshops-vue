<template>
  
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
          <img class="rounded" src="https://storage.googleapis.com/tinyshops/images/tinyshops_t.svg" alt="TinyShops" width="48" height="48">
        </a>

        <ul class="nav col-12 col-lg-auto ms-3 me-lg-auto mb-2 justify-content-center mb-md-0">
          <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/categories">Categories</router-link></li>
          <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/seen">Last seen</router-link></li>
          <li class="nav-item" v-if="auth"><router-link class="nav-link px-2 text-body-secondary" to="/dashboard">Dashboard</router-link></li>
        </ul>

        <!-- <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
        </form> -->

        <div class="dropdown text-end" v-if="auth">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://storage.googleapis.com/tinyshops/images/tinyshops_t.svg" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li><router-link class="dropdown-item" to="/products/new">New product...</router-link></li>
            <li><router-link class="dropdown-item" to="/dashboard">Dashboard</router-link></li>
            <!-- <li><router-link class="dropdown-item" to="#">Profile</router-link></li> -->
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" @click.prevent="logout">Sign out</a></li>
          </ul>
        </div>

        <div class="text-end" v-else>
          <router-link class="btn btn-outline-primary me-2" to="/login"><i class="bi bi-box-arrow-in-right"></i> Login</router-link>
          <router-link class="btn btn-primary" to="/register"><i class="bi bi-door-closed"></i> Sign-up</router-link>
        </div>

      </div>
    </div>
  </header>

</template>

<script>
import axios from 'axios';

export default {
  name: 'Header',
  data() {
    return {
      auth: (localStorage.getItem('auth'))
    }
  },
  methods: {
    logout() {
      axios.post('https://api.tinyshops.rckt.com.br/logout', null, {withCredentials: true}).then(response => {
          localStorage.removeItem('auth');
          localStorage.removeItem('shop_id');
          window.location.href = '/?logout#/';
        }).catch(error => {
          localStorage.removeItem('auth');
          localStorage.removeItem('shop_id');
          window.location.href = '/?logout#/';
          console.log(error);
      });
    }
  }
}
</script>
