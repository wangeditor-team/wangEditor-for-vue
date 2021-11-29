# wangEditor for Vue

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/@wangeditor/editor-for-vue.svg)](https://www.npmjs.com/package/@wangeditor/editor-for-vue/v/next) [![build status](https://github.com/vuejs/vue-next/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/wangeditor-team/wangEditor-for-vue/actions)

[English documentation](./README-en.md)

## 介绍

基于 [wangEditor](https://www.wangeditor.com/v5/) 封装的开箱即用的 [vue2 组件](https://www.wangeditor.com/v5/guide/for-frame.html#vue2)

## 安装

1. 安装 `wangeditor` 核心包

```shell
yarn add @wangeditor/editor
```

2. 安装组件包

```shell
yarn add @wangeditor/editor-for-vue
```

## 使用

### 模板

```html
<div>
  <div>
    <button @click="insertText">insert text</button>
  </div>
  <div style="border: 1px solid #ccc;">
    <!-- 工具栏 -->
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editorId="editorId"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />

    <!-- 编辑器 -->
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
      //【特别注意】
      // 1. editorId Toolbar 和 Editor 的关联，要保持一致
      // 2. 多个编辑器时，每个的 editorId 要唯一
      editorId: 'w-e-1',

      toolbarConfig: {
        /* 工具栏配置 */
      },
      defaultContent: [
        {
          type: 'paragraph',
          children: [{ text: '一行文字' }],
        },
      ],
      editorConfig: {
        placeholder: '请输入内容...',
        // 其他编辑器配置
        // 菜单配置
      },
      mode: 'default', // or 'simple'
      curContent: [],
    };
  },

  computed: {
    // 注意，深度拷贝 content ，否则会报错
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
      console.log('ClipboardEvent 粘贴事件对象', event);

      // 自定义插入内容
      editor.insertText('xxx');

      // 返回值（注意，vue 事件的返回值，不能用 return）
      callback(false); // 返回 false ，阻止默认粘贴行为
      // callback(true) // 返回 true ，继续默认的粘贴行为
    },

    insertText() {
      // 获取 editor 实例，即可执行 editor API
      const editor = getEditor(this.editorId);
      if (editor == null) return;
      if (editor.selection == null) return;

      // 在选区插入一段文字
      editor.insertText('一段文字');
    },
  },

  // 及时销毁 editor
  beforeDestroy() {
    const editor = getEditor(this.editorId);
    if (editor == null) return;

    // 销毁，并移除 editor
    editor.destroy();
    removeEditor(this.editorId);
  },
});
```
