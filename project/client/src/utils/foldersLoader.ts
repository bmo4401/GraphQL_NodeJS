import { Query } from '@/type/graphql';
import { graphqlRequest } from '.';
const foldersLoader = async () => {
   const query = `query Folders{
    folder {
      id
      name
    }
  }`;
   const options = {
      Authorization: localStorage.getItem('accessToken'),
   };
   const {
      data: { folder },
   }: { data: Query } = await graphqlRequest({ query, options });

   return folder;
};

export default foldersLoader;
