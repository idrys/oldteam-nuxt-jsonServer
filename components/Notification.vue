<template>
   <div>
      <v-alert
        v-model="alert"
        dismissible
        type="success"
        >
        <div class="text-xs-center">
          This is a success alert that is closable.
        <v-btn>Cofnij</v-btn>
        </div>
      </v-alert>
   </div> 
</template>
