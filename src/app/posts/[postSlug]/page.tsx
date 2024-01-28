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
          <Image width="984" height="554" className="w-full rounded h-auto mb-6" src={String(post.coverImage?.url)} alt="" />
          <div className="flex items-center gap-4">
            <Image width="100" height="100" className="w-14 h-auto rounded-full" src={String(post.author?.profilePicture)} alt="" />
            <div>
              <p className="text-xl font-bold mb-[.1rem]">{ post.author?.name }</p>
              <ul className="flex gap-3">
                <li className="text-sm">
                  <a className="hover:underline hover:text-blue-500" href={post.author?.socialMediaLinks?.twitter}>
                    Twitter
                  </a>
                </li>
                <li className="text-sm">
                  <a className="hover:underline hover:text-blue-500" href={post.author?.socialMediaLinks?.youtube}>
                    YouTube
                  </a>
                </li>
                <li className="text-sm">
                  <a className="hover:underline hover:text-blue-500" href={post.author?.socialMediaLinks?.github}>
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <article className="prose mx-auto xl:order-1 prose-img:rounded">
          <h1>{ post?.title }</h1>
          <div dangerouslySetInnerHTML={{
            __html: post?.content.html
          }} />
        </article>
      </Container>
    </>
  )
}
