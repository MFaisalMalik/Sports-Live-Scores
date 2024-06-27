import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  BlockTypeSelect,
  linkDialogPlugin,
  CreateLink,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  InsertImage,
  imagePlugin,
  ListsToggle,
  InsertAdmonition,
  AdmonitionDirectiveDescriptor,
  markdownShortcutPlugin,
  linkPlugin
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useRef } from "react";

export default function RichTextEditor({ editorRef, value, setValue }) {
  const inserImageRef = useRef()
  return (
    <div className="bg-white rounded-lg">
    <MDXEditor
      ref={editorRef}
      onChange={setValue}
      markdown={value}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        linkDialogPlugin(),
        linkPlugin(),
        imagePlugin(),
        listsPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({ toolbarContents: () => (
          <>
              <BlockTypeSelect/>
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <CreateLink />
              <CodeToggle />
              <InsertImage ref={inserImageRef} />
            </>
        )})
      ]}
      contentEditableClassName="min-h-80 prose prose-headings:p-0 prose-headings:mb-2 prose-a:no-underline prose-a:text-blue-500"
    />
    </div>
  );
}
