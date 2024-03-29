export async function gql({ query, variables, tags }: { query?: string; variables?: object; tags?: Array<string>; }) {
  const data = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      tags,
    },
  }).then((r) => r.json());

  return data;
}