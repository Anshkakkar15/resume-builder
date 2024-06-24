"use client";

import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export const TextEditor = React.forwardRef((props, ref) => {
  const editorRef = useRef(null);
  return (
    <Editor
      ref={ref}
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      initialValue={props?.defaultValue || ""}
      apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
      init={{
        initialValue: props?.defaultValue || "",
        height: 500,
        toolbar: "bold italic underline | bullist",
        plugins: ["lists"],
        formats: {
          p: { block: "p", remove: "all" },
        },
        invalid_elements: "p",
        valid_elements: "ul,li,strong,em,span[style]",
        content_style: "body { font-family:popins,sans-serif; font-size:14px }",
      }}
      onEditorChange={props.onChange}
    />
  );
});

TextEditor.displayName = "TextEditor";
