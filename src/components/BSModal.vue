<template>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Choisi une difficulté</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="d-flex flex-column align-items-center">
            <router-link :to="{ name: 'RandomWord',  params: { difficulty: 'easy' } }" class="text-decoration-none btn btn-primary my-3 px-5"> Facile </router-link>
            <router-link :to="{ name: 'RandomWord',  params: { difficulty: 'medium' } }" class="text-decoration-none btn btn-primary my-3 px-5"> Moyen </router-link>
            <router-link :to="{ name: 'RandomWord',  params: { difficulty: 'hard' } }" class="text-decoration-none btn btn-primary my-3 px-5"> Difficile </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>