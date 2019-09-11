<template>
<v-card  :color="item.color" dark class="d-flex align-stretch mb-6">
    <v-card class="shrink"> 

    <v-img
      class="white--text"
      height="200px"
      
      :src="item.src"
    >
      <v-card-title class="align-end fill-height">Top 10 Australian beaches</v-card-title>
    </v-img>
    </v-card >

    <v-card >
    <v-card-text>
      <span>{{head.title}}</span><br>
      <span class="text--primary">
        <span>Whitehaven Beach</span><br>
        <span>Whitsunday Island, Whitsunday Islands</span>
      </span>
    </v-card-text>
    <v-card-actions>
       <v-btn
        text
        color="orange"
      >
        Edytuj
      </v-btn>
    </v-card-actions>
    </v-card>

    </v-card>
</template>
<script>
export default {
  props:{
    head: Object
  },
}
</script>