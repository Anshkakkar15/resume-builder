import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export const TextEditor = React.forwardRef((props, ref) => {
  const editorRef = useRef(null);

  return (
    <Controller
      name={props?.name}
      control={props?.control}
      render={({ field: { onChange } }) => (
        <Editor
          ref={ref}
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={props?.defaultValue || ""}
          apiKey="9nf1nllqu574cxdfqfe5sdah93bhag187zqn4gkbmmw5rfop"
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
            content_style:
              "body { font-family:popins,sans-serif; font-size:14px }",
          }}
          onEditorChange={onChange}
        />
      )}
    />
  );
});

TextEditor.displayName = "TextEditor";
