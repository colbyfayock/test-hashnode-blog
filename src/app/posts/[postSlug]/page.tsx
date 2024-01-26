import { redirect } from 'next/navigation'
import Image from 'next/image';

import { getPostBySlug } from '@/lib/posts';

import Container from '@/components/Container';

export default async function Post({ params }: { params: { postSlug: string }}) {
  const post = await getPostBySlug(params.postSlug);

  if ( !post ) {
    return redirect('/404');
  }
  
  return (
    <>
      <Container className="max-w-5xl xl:max-w-7xl xl:grid xl:grid-cols-[auto_1fr] gap-12 mt-12 mb-24">
        <aside className="mb-12 xl:order-2">
          <Image width="1920" height="1080" className="w-full h-auto mb-6" src={String(post?.coverImage?.url)} alt="" />
        </aside>
        <article className="prose mx-auto xl:order-1">
          <h1>{ post?.title }</h1>
          <div dangerouslySetInnerHTML={{
            __html: post?.content.html
          }} />
        </article>
      </Container>
    </>
  )
}
