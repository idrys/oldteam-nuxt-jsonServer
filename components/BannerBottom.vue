<template>
      <section>
        <v-parallax :src="img1" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">NAJGORSZE SĄ PRZESTOJE</div>
            <em>Klub zapaleńców i starych przyjaciół</em>
          </v-layout>
        </v-parallax>
      </section>
</template>

<script>
export default {
  data(){
    return {
      img1: require('@/assets/img/section.jpg')
    }
  }
}
</script>
