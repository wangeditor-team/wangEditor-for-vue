# wangEditor for Vue

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/@wangeditor/editor-for-vue.svg)](https://www.npmjs.com/package/@wangeditor/editor-for-vue/v/next) [![build status](https://github.com/vuejs/vue-next/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/wangeditor-team/wangEditor-for-vue/actions)

[English documentation](./README-en.md)

## Introduction

An out-of-the-box vue2 component based on the [wangEditor v5](https://www.wangeditor.com/v5/guide/for-frame.html#vue2)

## Installation

1. Install the `wangeditor` core package

```shell
yarn add @wangeditor/editor
```

2. Install the current component package

```shell
yarn add @wangeditor/editor-for-vue
```

## Usage

### template

```html
<div>
  <div>
    <button @click="insertText">insert text</button>
  </div>
  <div style="border: 1px solid #ccc;">
    <!-- toolbar -->
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editorId="editorId"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />

    <!-- editor -->
    <Editor
      style="height: 500px"
      :editorId="editorId"
      :defaultConfig="editorConfig"
      :defaultContent="getDefaultContent"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
      @onDestroyed="onDestroyed"
      @onMaxLength="onMaxLength"
      @onFocus="onFocus"
      @onBlur="onBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</div>
```

### Script

```ts
import Vue from 'vue';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue';
import cloneDeep from 'lodash.clonedeep';

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      // Particular attention:
      // 1. `editorId` is used to relate Toolbar and Editor
      // 2. When you create multiple editors in one page, every editor must be unique
      editorId: 'w-e-1',

      toolbarConfig: {
        /* toolbar config */
      },
      defaultContent: [
        {
          type: 'paragraph',
          children: [{ text: 'hello world' }],
        },
      ],
      editorConfig: {
        placeholder: 'Type your text',
        // other editor config
        // menus config
      },
      mode: 'default', // or 'simple'
      curContent: [],
    };
  },

  computed: {
    // Deep clone `content`
    getDefaultContent() {
      return cloneDeep(this.defaultContent);
    },
  },

  methods: {
    onCreated(editor) {
      console.log('onCreated', editor);
    },
    onChange(editor) {
      console.log('onChange', editor.children);
      this.curContent = editor.children;
    },
    onDestroyed(editor) {
      console.log('onDestroyed', editor);
    },
    onMaxLength(editor) {
      console.log('onMaxLength', editor);
    },
    onFocus(editor) {
      console.log('onFocus', editor);
    },
    onBlur(editor) {
      console.log('onBlur', editor);
    },
    customAlert(info: string, type: string) {
      window.alert(`customAlert in Vue demo\n${type}:\n${info}`);
    },
    customPaste(editor, event, callback) {
      console.log('ClipboardEvent is paste event data', event);

      // insert your custom text
      editor.insertText('xxx');

      // You can not `return xxx` in Vue event function, use `callback`
      callback(false); // return false ，prevent default paste behavior
      // callback(true) // return true ，go on default paste behavior
    },

    insertText() {
      // get editor instance by `editorId`
      const editor = getEditor(this.editorId);
      if (editor == null) return;
      if (editor.selection == null) return;

      // Insert text in selection
      editor.insertText('hello wangEditor.');
    },
  },

  // Timely destroy editor
  beforeDestroy() {
    const editor = getEditor(this.editorId);
    if (editor == null) return;

    // destroy and remove editor
    editor.destroy();
    removeEditor(this.editorId);
  },
});
```
