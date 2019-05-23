<template>
  <v-parallax :src="background" height="600">
    <v-layout  row column  align-center  justify-center  class="white--text"> 
      <v-layout  row  align-center  justify-center  class="white--text"> 
        <v-flex xs12 elevation-24 style="background: rgba( 80, 80, 80, 0.2);">
          <v-responsive>
            <v-img :src="logo" height="200" contain ></v-img>
          </v-responsive>
          <v-card-text>
            <h1 class="white--text mb-2 display-1 text-xs-center">{{title}}</h1>

            <div class="subheading mb-3 text-xs-center">{{subtitle}}</div>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-parallax>
</template>
<script>
export default {
  data () {
    return {
      title: 'Oldteam Club',
      subtitle: 'Klub zapaleńców i WWWWW starych przyjaciół',
      subtitle2: '1Zdobywamy koronę Europy',
      subtitle3: '... a przy okazji dobrze się bawimy',
      info: 'Informacje o naszym klubie',
      opis: '',
      logo: require('@/assets/img/logo.png'),
      background: require('@/assets/img/hero.jpeg'),
    }
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>

