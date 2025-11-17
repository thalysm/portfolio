<script setup>
defineProps({
  editor: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="editor-toolbar" v-if="editor">
    <button
      type="button"
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
      class="toolbar-button"
    >
      Bold
    </button>
    <button
      type="button"
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
      class="toolbar-button"
    >
      Italic
    </button>
    <button
      type="button"
      @click="editor.chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
      class="toolbar-button"
    >
      Strike
    </button>
    <button
      type="button"
      @click="editor.chain().focus().setParagraph().run()"
      :class="{ 'is-active': editor.isActive('paragraph') }"
      class="toolbar-button"
    >
      P
    </button>
    <button
      type="button"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      class="toolbar-button"
    >
      H1
    </button>
    <button
      type="button"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      class="toolbar-button"
    >
      H2
    </button>
    <button
      type="button"
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
      class="toolbar-button"
    >
      Lista
    </button>
    <button
      type="button"
      @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
      class="toolbar-button"
    >
      Lista (N)
    </button>
    <button
      type="button"
      @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
      class="toolbar-button"
    >
      Citação
    </button>
    <button
      type="button"
      @click="editor.chain().focus().setHorizontalRule().run()"
      class="toolbar-button"
    >
      Linha HR
    </button>
  </div>
</template>

<style scoped>
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  border: 3px solid #000;
  border-bottom: none; /* O editor terá a borda inferior */
  background-color: #f2f2f2;
}
.toolbar-button {
  /* Estilo Neobrutalism para botões */
  border: 3px solid black;
  font-weight: 600;
  padding: 4px 8px;
  font-size: 14px;
  background-color: #f2f2f2;
  cursor: pointer;
}
.toolbar-button.is-active {
  background: #5093fe;
  color: #000;
  box-shadow: 3px 3px 0px 0px #1f1f1f;
}
</style>