import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMC(props) {
  const { setContent, textContent } = props;
  debugger;
  return (
    <Editor
      onEditorChange={(content, editor) => setContent(content)}
      apiKey="pczt0a0v9fv4c4x5qd9pqzq1var1v24f7q83dy0igb9d4xcp"
      init={{
        language: "ru",
        plugins: [
          // Удаляем "tinymcespellchecker" из списка плагинов
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
        ],
        // Убираем spellcheckdialog из панели инструментов
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        ai_request: (request, respondWith) =>
          respondWith.string(() =>
            Promise.reject("See docs to implement AI Assistant")
          ),
        exportpdf_converter_options: {
          format: "Letter",
          margin_top: "1in",
          margin_right: "1in",
          margin_bottom: "1in",
          margin_left: "1in",
        },
        exportword_converter_options: { document: { size: "Letter" } },
        importword_converter_options: {
          formatting: {
            styles: "inline",
            resets: "inline",
            defaults: "inline",
          },
        },
      }}
      initialValue="Начнем создавать классный контент"
      value={textContent}
    />
  );
}
