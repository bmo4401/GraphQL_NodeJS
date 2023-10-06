import { useEffect, useState } from 'react';
import {
   EditorState,
   convertFromHTML,
   convertToRaw,
   ContentState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { useLoaderData } from 'react-router-dom';
import { Note } from '@/type/graphql';
const Note = () => {
   const note = useLoaderData() as Note;
   console.log('❄️ ~ file: Note.tsx:13 ~ note:', note);

   const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty(),
   );
   const [rawHTML, setRawHTML] = useState(note.content);
   useEffect(() => {
      console.log('1');
      setRawHTML(note.content);
   }, [note.content]);
   useEffect(() => {
      const blocksFromHTML = convertFromHTML(rawHTML);

      const state = ContentState.createFromBlockArray(
         blocksFromHTML.contentBlocks,
         blocksFromHTML.entityMap,
      );

      setEditorState(EditorState.createWithContent(state));
   }, [rawHTML]);

   const handleOnChange = (e: EditorState) => {
      setEditorState(e);
      setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
   };
   return (
      <Editor
         editorState={editorState}
         onEditorStateChange={handleOnChange}
         placeholder="write something"
      />
   );
};
export default Note;
