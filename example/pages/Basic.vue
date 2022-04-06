<script lang="ts">
import { IDomEditor } from '@wangeditor/editor';
import Vue from 'vue';
import { Editor, Toolbar } from '../../src/index';

export default Vue.extend({
  template: `
  <div>
    <div>
      <button @click="onToggleReadOnly">toggle readOnly</button>
      <button @click="onGetHtml">get html</button>
    </div>

    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />

      <Editor
        style="height: 500px"
        :defaultConfig="editorConfig"
        :defaultContent="defaultContent"
        :defaultHtml="defaultHtml"
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

    <div style="border: 1px solid #ccc; margin-top: 10px">
      <pre v-html="curContentStr"></pre>
    </div>
  </div>
`,
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      toolbarConfig: {},
      //编辑器默认内容 - JSON格式 { type: 'paragraph', children: [{ text: 'basic demo' }] }
      defaultContent: [],
      // 编辑器默认内容 - HTML 格式
      defaultHtml: '<p>hello&nbsp;<strong>world</strong></p>\n<p><br></p>',
      editorConfig: {
        placeholder: '请输入内容123...',
        // 菜单配置
        MENU_CONF: {
          uploadImage: {
            server: 'http://106.12.198.214:3000/api/upload-img', // 上传图片地址
            fieldName: 'vue-demo-fileName',
          },
          insertImage: {
            checkImage(src: string, alt: string, href: string) {
              if (src.indexOf('http') !== 0) {
                return '图片网址必须以 http/https 开头';
              }
              return true;
            },
          },
        },
      },
      curContent: [],
      mode: 'default',
    };
  },
  computed: {
    curContentStr() {
      // @ts-ignore
      return JSON.stringify(this.curContent, null, 2);
    },
  },
  mounted() {},
  methods: {
    //【注意】vue 和 React 不一样，无法在 props 传递事件，所以 callbacks 只能单独定义，通过事件传递
    onCreated(editor: IDomEditor) {
      // console.log('onCreated', editor)
      this.editor = Object.seal(editor) as any // 注意，一定要用 Object.seal() 否则会报错
    },
    onChange(editor: IDomEditor) {
      console.log('onChange', editor.children);
      this.curContent = editor.children as any;
    },
    onDestroyed(editor: IDomEditor) {
      console.log('onDestroyed', editor);
    },
    onMaxLength(editor: IDomEditor) {
      console.log('onMaxLength', editor);
    },
    onFocus(editor: IDomEditor) {
      console.log('onFocus', editor);
    },
    onBlur(editor: IDomEditor) {
      console.log('onBlur', editor);
    },
    customAlert(info: string, type: string) {
      window.alert(`customAlert in Vue demo\n${type}:\n${info}`);
    },
    customPaste(editor: IDomEditor, event: any, callback: any) {
      // console.log('paste event', event)
      // editor.insertText('xxx')
      // // 返回值（注意，vue 事件的返回值，不能用 return）
      // callback(false)
      // // callback(true)
    },

    onToggleReadOnly() {
      const editor = this.editor as any;
      if (editor == null) return;

      if (editor.getConfig().readOnly) {
        editor.enable();
      } else {
        editor.disable();
      }
    },
    onGetHtml() {
      const editor = this.editor as any;
      if (editor == null) return;

      // 使用 editor API
      console.log(editor.getHtml());
    },
  },

  // 及时销毁 editor
  beforeDestroy() {
    const editor = this.editor as any;
    if (editor == null) return;
    editor.destroy();
  },
});
</script>
