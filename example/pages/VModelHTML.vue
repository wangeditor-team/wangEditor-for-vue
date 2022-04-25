<script>
import Vue from 'vue';
import { Editor, Toolbar } from '../../src/index';

export default Vue.extend({
  //【注意】单独写 <template>...</template> 时，rollup 打包完浏览器运行时报错，所以先在这里写 template
  template: `
    <div>
      <textarea v-model="valueHtml" style="width: 100%; height: 100px;"></textarea>
      <div style="border: 1px solid #ccc; margin-top: 10px">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
        />

        <Editor
          style="height: 500px"
          :defaultConfig="editorConfig"
          v-model="valueHtml"
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
      toolbarConfig: {
        // 工具栏配置
      },
      editorConfig: {
        placeholder: '请输入内容...',
        // autoFocus: false,
        // readOnly: true,
      },
      valueHtml: '<p>hello</p>'
    };
  },
  mounted() {
    setTimeout(() => {
      this.valueHtml = '<p>hello world</p>'
    }, 1500);
  },
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
