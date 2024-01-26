import { gql } from '@/lib/graphql';

import { Page } from '@/types/page';

export async function getPageBySlug(slug: Page['slug']) {
  const { data: { publication } } = await gql({
    query: `
      query($host: String!, $slug: String!) {
        publication(host: $host) {
          staticPage(slug: $slug) {
            title
            slug
            id
            content {
              html
            }
          }
        }
      }
    `,
    variables: {
      host: process.env.HASHNODE_HOST,
      slug
    }
  });

  return publication?.staticPage;
}