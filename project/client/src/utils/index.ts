export const graphqlRequest = async ({
   query,
   variables,
   options,
}: {
   query: string;
   variables?: string;
   options?: {};
}) => {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         ...options,
      },
      body: JSON.stringify({
         query,
         variables,
      }),
   });
   return await res.json();
};
