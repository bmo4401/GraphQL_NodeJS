import { Query } from '@/type/graphql';

const noteLoader = async ({ noteId }: { noteId: string }) => {
   const query = `query($noteId: String!){
    noteId(noteId: $noteId) {
      content
    }
  }`;
   const res = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
      },
      body: JSON.stringify({
         query,
         variables: {
            noteId,
         },
      }),
   });
   const {
      data: { noteId: note },
   }: { data: Query } = await res.json();

   return note;
};

export default noteLoader;
