import { gql } from '@/lib/graphql';

export async function subscribeToNewsletter(email: string) {
  const data = await gql({
    query: `
      mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
        subscribeToNewsletter(input: $input) {
          status
        }
      }
    `,
    variables: {
      input: {
        publicationId: process.env.HASHNODE_PUBLICATION_ID,
        email
      },
    }
  });

  if ( data.errors ) {
    return {
      status: 'ERROR',
      errors: data.errors
    }
  }

  return data?.data?.subscribeToNewsletter;
}