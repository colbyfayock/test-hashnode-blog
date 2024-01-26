import { gql } from '@/lib/graphql';

interface Publication {
  title?: string;
  displayTitle?: string;
  descriptionSEO?: string;
  preferences?: {
    navbarItems?: Array<{
      label?: string;
      url?: string;
    }>
  }
}

export async function getPublication() {
  const { data } = await gql({
    query: `
      query($host: String) {
        publication(host: $host) {
          title
          displayTitle
          descriptionSEO
          preferences {
            navbarItems{
              label
              url
            }
          }
        }
      }
    `,
    variables: {
      host: process.env.HASHNODE_HOST
    }
  });

  const publication: Publication = data?.publication;

  return {
    ...publication,
    preferences: {
      ...publication.preferences,
      navbarItems: publication?.preferences?.navbarItems?.map(item => {
        return {
          ...item,
          url: item?.url?.replace(`https://${process.env.HASHNODE_HOST}`, '')
        }
      })
    }
  };
}