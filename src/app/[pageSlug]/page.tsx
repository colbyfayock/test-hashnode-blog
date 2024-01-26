import { redirect } from 'next/navigation'
import Image from 'next/image';

import { getPageBySlug } from '@/lib/pages';

import Container from '@/components/Container';

export default async function Page({ params }: { params: { pageSlug: string }}) {
  const page = await getPageBySlug(params.pageSlug);

  if ( !page ) {
    return redirect('/404');
  }
  
  return (
    <>
      <Container className="max-w-5xl xl:max-w-7xl mt-12 mb-24">
        <article className="prose mx-auto">
          <h1>{ page?.title }</h1>
          <div dangerouslySetInnerHTML={{
            __html: page?.content.html
          }} />
        </article>
      </Container>
    </>
  )
}
