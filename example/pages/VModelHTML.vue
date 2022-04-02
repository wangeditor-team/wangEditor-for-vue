<script>
import Vue from 'vue';
import { getEditor, removeEditor, Editor, Toolbar } from '../../src/index';

export default Vue.extend({
  //【注意】单独写 <template>...</template> 时，rollup 打包完浏览器运行时报错，所以先在这里写 template
  template: `
    <div>
      <textarea v-model="valueHtml" style="width: 100%; height: 100px;"></textarea>
      <div style="border: 1px solid #ccc; margin-top: 10px">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editorId="editorId"
          :defaultConfig="toolbarConfig"
        />

        <Editor
          style="height: 500px"
          :editorId="editorId"
          :defaultConfig="editorConfig"
          v-model="valueHtml"
        />
      </div>
    </div>
  `,
  components: { Editor, Toolbar },
  data() {
    return {
      //【注意】1. editorId 用于 Toolbar 和 Editor 的关联，保持一直。2. 多个编辑器时，每个的 editorId 要唯一
      editorId: `w-e-${Date.now().toString().slice(-5)}`,
      toolbarConfig: {
        // 工具栏配置
      },
      editorConfig: {
        placeholder: '请输入内容...',
      },
      valueHtml: '<p>hello</p>'
    };
  },
  mounted() {
    setTimeout(() => {
      this.valueHtml = '<p>hello world</p>'
    }, 1500);
  },
  methods: {},

  // 及时销毁 editor
  beforeDestroy() {
    const editor = getEditor(this.editorId);
    if (editor == null) return;

    // 销毁，并移除 editor
    editor.destroy();
    removeEditor(this.editorId);
  },
});
</script>
