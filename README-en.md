# wangEditor for Vue

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/@wangeditor/editor-for-vue.svg)](https://www.npmjs.com/package/@wangeditor/editor-for-vue/v/next) [![build status](https://github.com/wangeditor-team/wangEditor-for-vue/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/wangeditor-team/wangEditor-for-vue/actions)

[中文文档](./README.md)

## Introduction

An out-of-the-box [vue2 component](https://www.wangeditor.com/v5/guide/for-frame.html#vue2)
based on the [wangEditor v5](https://www.wangeditor.com/v5/guide/for-frame.html#vue2)

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
    />

    <!-- editor -->
    <Editor
      style="height: 500px"
      :editorId="editorId"
      :defaultConfig="editorConfig"
      :defaultContent="getDefaultContent"
      @onChange="onChange"
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
      toolbarConfig: {},
      defaultContent: [],
      editorConfig: {
        placeholder: 'Type your text',
      },
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

    onChange(editor) {
      console.log('onChange', editor.children);
      this.curContent = editor.children;
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
