<script>
import Vue from 'vue';
import { Editor, Toolbar } from '../../src/index';

export default Vue.extend({
  //【注意】单独写 <template>...</template> 时，rollup 打包完浏览器运行时报错，所以先在这里写 template
  template: `
  <div>
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />

      <Editor
        style="height: 500px"
        :defaultHtml="defaultHtml"
        :defaultConfig="editorConfig"
        :defaultContent="defaultContent"
        :mode="mode"
        @onCreated="onCreated"
        @onChange="onChange"
      />
    </div>
  </div>
  `,
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      // 编辑器默认内容 - HTML 格式 <p>hello&nbsp;<strong>world</strong></p>\n<p><br></p>
      defaultHtml: '',
      defaultContent: [
        { type: 'paragraph', children: [{ text: 'simple mode' }] },
        { type: 'paragraph', children: [{ text: '简化 toolbar 和 hoverbar' }] },
      ],
      curContent: [],

      toolbarConfig: {
        // 工具栏配置
      },
      editorConfig: {
        placeholder: '请输入内容123...',
      },
      mode: 'simple',
    };
  },
  mounted() {},
  methods: {
    onCreated(editor) {
      // console.log('onCreated', editor)
      this.editor = Object.seal(editor) // 注意，一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      console.log('onChange', editor.getHtml());
      this.curContent = editor.children;
    },
  },

  // 及时销毁 editor
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;

    // 销毁，并移除 editor
    editor.destroy();
  },
});
</script>
