<template>
<div class="pa-2" >
  <v-container fluid>
    <v-layout justify-center>
    <v-card md="3"
        class="pa-2" justify-center>
      
          <v-img 
            :src=articleProp.image            
            width="700"
          >
        </v-img>
        
    </v-card>
    </v-layout>
  </v-container>
<v-container fluid>
      <v-layout justify-center > 
        <v-card md="3" color="#fafafa" flat class="pa-2" justify-center max-width="750">

        <br>
        <v-text-field
                   
            label="Zdjęcie"
            required
            v-model='articleProp.image'
          ></v-text-field>
          <!-- <v-file-input label="File input" v-model='articleProp.image'></v-file-input> -->
  
  
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
          
          <v-btn class="menubar__button" @click="showImagePrompt(commands.image)" >
            <v-icon>image</v-icon>
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

  <!-- <v-card>
    <v-card-text>    -->
    <div class="editor">

    <editor-content class="myFonts editor__content" :editor="editor" />
      </div>
    <!-- </v-card-text>
  </v-card> -->
  
  <div>
    <br />
    <div class="export">
      <h3>HTML</h3>
      <pre><code>{{ html }}</code></pre>
    </div>
    <br />
  </div>
        </v-card>
      </v-layout>
</v-container>
  <v-btn @click="sumit">Save</v-btn>
  <v-btn @click="preview">Podgląd</v-btn>

</div>

</template>
<script>
//import Icon from 'Components/Icon'
import SWView from '@/components/Articles/View.vue'
import ArticleService from '@/services/ArticleService.js'
import AlbumService from '@/services/AlbumService.js'
import { mapState } from 'vuex' 
import axios from 'axios'

//import Icon from 'Components/Icon'
import { Editor, EditorContent, EditorMenuBar, EditorFloatingMenu, EditorMenuBubble} from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
} from 'tiptap-extensions'

export default {
  props:{
    articleProp: Object
  },

  components: {
    EditorContent,
    EditorMenuBar,
    EditorFloatingMenu,
    //EditorMenuBubble,
    ArticleService,
    AlbumService,
  
    SWView
  },
  computed: mapState(['articleModule']),

  mounted() {
    this.editor = new Editor({
      extensions: [
         new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
        ],
      content: "test",
      
      onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON()
          this.html = getHTML()
          this.article.body = this.html
          //this.test
      },

    }),
    this.editor.setContent(this.articleProp.body)
  },

  beforeDestroy() {
    this.editor.destroy()
    console.log('Test')
  },

  methods: {
    sumit(){
      console.log('Save text: ', this.editor);
         
    },
    preview(){

      
      this.$router.push('/Articles/Preview/1')
    },

    dialogImg(){
      console.log('Nowe !!')
    },
    
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
  },

  data (){
    return{
      keepInBounds: true,
      article: {
          id: 0,
          title: this.articleProp.title,
          body: this.articleProp.body,
          //image: this.articleProp.image,
        },
        test: this.articleProp,
      dropdown_font: [
          { text: 'Arial' },
          { text: 'Calibri' },
          { text: 'Courier' },
          { text: 'Verdana' },
        ],
        dropdown_edit: [
          { text: '100%' },
          { text: '75%' },
          { text: '50%' },
          { text: '25%' },
          { text: '0%' },
        ],
        toggle_exclusive: 2,
        toggle_multiple: [1, 2, 3],
      
        editor: null,
        json: 'Update content to see changes',
        html: 'Update content to see changes',
        //body: `Test`
    }
  }
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Questrial");

.display-2 {
  font-family:'Times New Roman', sans-serif !important;
};

.display-1 {
  font-family:'Times New Roman', sans-serif !important;
};

.subheading {
    font-size: 26px !important;
    font-weight: 400;
}

:focus {
  outline :none;
}

.myFonts {
  font-family: 'Times New Roman', sans-serif;
  line-height: 1.5;
  font-size: 20px;
}

img {
    border-style: none;
    width: 700px;
    padding: 5px;
    

     border: solid 1px #CCC;
    -moz-box-shadow: 1px 1px 5px #999;
    -webkit-box-shadow: 1px 1px 5px #999;
        box-shadow: 1px 1px 5px #999;
}

#myImage {
  width: 200px;
}

</style>
