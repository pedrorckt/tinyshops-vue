
<template>
  <div class="container">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <p class="col-md-4 mb-0 text-body-secondary">&copy; 2023 - TinyShops, São Paulo, Brazil</p>

      <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img class="rounded" src="https://storage.googleapis.com/tinyshops/images/tinyshops_t.svg" alt="TinyShops" width="32" height="32">
      </a>

      <ul class="nav col-md-4 justify-content-end">
        <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/">Home</router-link></li>
        <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/categories">Categories</router-link></li>
      </ul>
    </footer>
  </div>
</template>