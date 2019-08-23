<template>
<div>

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
      <editor-content class="editor__content" :editor="editor" />
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

  <v-btn @click="sumit">Save</v-btn>

</div>

</template>
<script>
//import Icon from 'Components/Icon'
import ArticleService from '@/services/ArticleService.js'
import AlbumService from '@/services/AlbumService.js'
import { mapState } from 'vuex' 
import axios from 'axios'

import { Editor, EditorContent, EditorMenuBar, EditorFloatingMenu } from 'tiptap'
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
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    EditorFloatingMenu,
    ArticleService,
    AlbumService
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
        ],
      content: '<p>Tekst testowy</p>',
      
      onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON()
          this.html = getHTML()
          this.article.body = this.html
      },

    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  methods: {
    sumit(){
      //console.log('Save text: ', this.html);
      this.$store.dispatch('articleModule/createNewArticle', this.article)   
    },
  },

  data (){
    return{
      article: {
          id: 0,
          title: 'test',
          body: 'Testujemy body pieprzonej zmiennej',
        },
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

<style lang="scss" scoped>
html {
    font-size: 18px;
  }

.editor {
  position: relative;
  max-width: 30rem;
  margin: 0 auto 5rem auto;
  
  

  &__content {

    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;

    * {
      caret-color: currentColor;
    }

    pre {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      
      font-size: 16px;
      overflow-x: auto;

      code {
        display: block;
        white-space: pre-wrap;
        font-size: 16px;
      }
    }

    p code {
      display: inline-block;
      padding: 0 0.4rem;
      border-radius: 5px;
      font-size: 16px;
      font-weight: italic;

    }

    ul,
    ol {
      padding-left: 1rem;
    }

    li > p,
    li > ol,
    li > ul {
      margin: 0;
    }

    a {
      color: inherit;
    }

    blockquote {
      
      padding-left: 0.8rem;
      font-style: italic;

      p {
        margin: 0;
      }
    }

    img {
      max-width: 100%;
      border-radius: 3px;
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td, th {
        min-width: 1em;
        
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;
        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0; right: 0; top: 0; bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px; top: 0; bottom: 0;
        width: 4px;
        z-index: 20;
        background-color: #adf;
        pointer-events: none;
      }
    }

    .tableWrapper {
      margin: 1em 0;
      overflow-x: auto;
    }

    .resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }

  }
}
</style>
