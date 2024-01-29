import { redirect } from 'next/navigation'
import Image from 'next/image';

import { getPostBySlug } from '@/lib/posts';

import Container from '@/components/Container';
import FormNewsletter from '@/components/FormNewsletter';

export default async function Post({ params }: { params: { postSlug: string }}) {
  const post = await getPostBySlug(params.postSlug);

  if ( !post ) {
    return redirect('/404');
  }
  
  return (
    <>
      <Container className="max-w-5xl xl:max-w-7xl xl:grid xl:grid-cols-[auto_1fr] gap-12 mt-12 mb-24">
        <aside className="mb-12 xl:order-2">
          <Image width="984" height="554" className="w-full rounded h-auto mb-6 xl:mb-12" src={String(post.coverImage?.url)} alt="" />
          <div className="hidden xl:block">
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <p className="mb-6">Get weekly tutorials like this straight to your inbox!</p>
            <FormNewsletter />
          </div>
        </aside>
        <article className="max-w-3xl xl:order-1 mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            { post?.title }
          </h1>
          <div className="max-w-3xl flex items-center gap-4 mb-8">
            <Image width="48" height="48" className="w-12 h-auto rounded-full" src={String(post.author?.profilePicture)} alt="" />
            <div>
              <p className="text-lg font-bold mb-[.1rem]">{ post.author?.name }</p>
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
          <div className="prose max-w-3xl prose-img:rounded" dangerouslySetInnerHTML={{
            __html: post?.content.html
          }} />
        </article>
      </Container>
      <Container className="flex flex-col items-center justify-center max-w-3xl xl:hidden mx-auto">
        <h2 className="text-xl font-bold mb-4">Newsletter</h2>
        <p className="mb-6">Get weekly tutorials like this straight to your inbox!</p>
        {/* <FormNewsletter className="text-center" /> */}
      </Container>
    </>
  )
}
