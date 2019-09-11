<template>
<div>
    
    <v-img 
          :src=articleProp.image 
        >
        </v-img>
        <br>
        <v-text-field
                   
            label="Zdjęcie"
            required
            v-model='articleProp.image'
          ></v-text-field>
  
  
  <br>
  <v-text-field
            class="display-1"        
            label="Tytuł"
            required
            v-model=articleProp.title
          ></v-text-field>
          <br>
  <v-text-field  
            label="Podtytuł"
            required
            v-model=articleProp.subtitle
          ></v-text-field>
  <br>

  <editor-floating-menu :editor="editor" v-slot="{ commands, isActive, menu }">
    <v-toolbar dense >
      <v-overflow-btn
        :items="dropdown_font"
        label="Select font"
        hide-details
        class="pa-0"
      ></v-overflow-btn>

      <template >
        <v-divider vertical></v-divider>

        <v-overflow-btn
          :items="dropdown_edit"
          editable
          label="Select size"
          hide-details
          class="pa-0"
          overflow
        ></v-overflow-btn>

        <v-divider vertical></v-divider>

        <div class="flex-grow-1"></div>

        <v-btn-toggle
          v-model="toggle_multiple"
          multiple
          
        >
          <v-btn :value="1" text @click="commands.bold">
            <v-icon>format_bold</v-icon>
          </v-btn>

          <v-btn :value="2" text @click="commands.italic">
            <v-icon>format_italic</v-icon>
          </v-btn>

          <v-btn :value="3" text @click="commands.underline">
            <v-icon>format_underlined</v-icon>
          </v-btn>

          <v-btn :value="4" text>
            <v-icon>format_color_fill</v-icon>
          </v-btn>
          
          <v-btn :value="5" text @click="commands.code">
            <v-icon>code</v-icon>
          </v-btn>

          <v-btn :value="6" text>
            <v-icon>format_list_bulleted</v-icon>
          </v-btn>

        </v-btn-toggle>

        <div class="mx-4"></div>

        <v-btn-toggle v-model="toggle_exclusive">
          <v-btn :value="1" text>
            <v-icon>format_align_left</v-icon>
          </v-btn>

          <v-btn :value="2" text>
            <v-icon>format_align_center</v-icon>
          </v-btn>

          <v-btn :value="3" text>
            <v-icon>format_align_right</v-icon>
          </v-btn>

          <v-btn :value="4" text>
            <v-icon>format_align_justify</v-icon>
          </v-btn>


        </v-btn-toggle>
      </template>
    </v-toolbar>
  </editor-floating-menu>

  <v-card>
    <v-card-text>   
      
    </v-card-text>
  </v-card>
  
  <div>
    <br />
    <div class="export">
      <h3>HTML</h3>
      <pre><code>{{ html }}</code></pre>
    </div>
    <br />
  </div>

  
  <v-btn @click="sumit">Wróć</v-btn>

</div>

</template>