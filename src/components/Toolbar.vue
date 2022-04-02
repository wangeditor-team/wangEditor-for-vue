<script lang="ts">
import Vue from 'vue';
import { createToolbar, DomEditor } from '@wangeditor/editor';

export default Vue.extend({
  name: 'Toolbar',
  render(h) {
    return h('div', { ref: 'box' });
  },
  props: ['editor', 'defaultConfig', 'mode'],
  methods: {
    // 创建 toolbar
    create(editor: any) {
      if (this.$refs.box == null) return;
      if (editor == null) return;
      if (DomEditor.getToolbar(editor)) return // 不重复创建

      createToolbar({
        editor,
        selector: this.$refs.box as Element,
        config: this.defaultConfig || {},
        mode: this.mode || 'default',
      });
    },
  },
  watch: {
    editor: {
      handler(e) {
        if (e == null) return;
        this.create(e);
      },
      immediate: true,
    }
  }
});
</script>
