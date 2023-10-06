import { Note, Query } from '@/type/graphql';

const notesLoader = async ({ folderId }: { folderId: string }) => {
   const query = `query($folderId: String!)
   {notes(folderId: $folderId) {
      _id
      content
      folderId
    }}`;
   const res = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      body: JSON.stringify({
         query,
         variables: {
            folderId,
         },
      }),
   });
   const {
      data: { notes },
   }: { data: Query } = await res.json();

   return notes;
};

export default notesLoader;
