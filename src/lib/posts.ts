import { gql } from '@/lib/graphql';

import { Post } from '@/types/post';


export async function getPosts() {
  const { data: { publication } } = await gql({
    query: `
      query($host: String!) {
        publication(host: $host) {
          posts(first:10) {
            edges {
              node {
                title
                slug
                id
                subtitle
                coverImage {
                  url
                }
                brief
                readTimeInMinutes
                publishedAt
                seo {
                  title
                  description
                }
                ogMetaData {
                  image
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      host: process.env.HASHNODE_HOST
    }
  });

  const posts: Array<Post> = publication?.posts.edges.map(({ node }: { node: Post }) => node);
  
  return posts;
}

export async function getPostBySlug(slug: Post['slug']) {
  const { data: { publication } } = await gql({
    query: `
      query($host: String!, $slug: String!) {
        publication(host: $host) {
          post(slug: $slug) {
            title
            slug
            id
            subtitle
            coverImage {
              url
            }
            content {
              html
            }
            brief
            readTimeInMinutes
            publishedAt
            seo {
              title
              description
            }
            ogMetaData {
              image
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

  return publication?.post as Post;
}