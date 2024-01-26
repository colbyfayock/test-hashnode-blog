import Link from 'next/link';
import Image from 'next/image';

import { getPosts } from '@/lib/posts';

import Container from '@/components/Container';

export default async function Home() {
  const posts = await getPosts();
  const latestPost = posts.shift();
  
  return (
    <>
      {latestPost && (
        <Container className="max-w-4xl lg:max-w-7xl grid lg:grid-cols-2 xl:grid-cols-[4fr_3fr] items-center gap-8 lg:gap-12 mt-12 mb-16 sm:mb-24">
          <Link href={`/posts/${latestPost.slug}`}>
            <Image width="1920" height="1080" className="rounded border border-zinc-200 lg:mb-6" src={String(latestPost.coverImage?.url)} alt="" />
          </Link>
          <div>
            <h2 className="text-2xl lg:text-4xl lg:leading-[2.75rem] pb-6 border-b-2 mb-6">
              <Link href={`/posts/${latestPost.slug}`}>
                { latestPost.title }
              </Link>
            </h2>
            <p className="text-zinc-500">
              {
                new Date(latestPost.publishedAt).toLocaleDateString('en-us', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              }
            </p>
          </div>
        </Container>
      )}

      <Container className="max-w-4xl">
        <ul>
          {posts?.map(post => {
            return (
              <li key={post.id} className="grid sm:grid-cols-2 gap-8 mb-16">
                <div>
                  {post.coverImage?.url && (
                    <Link href={`/posts/${post.slug}`}>
                      <Image width="1920" height="1080" className="rounded border border-zinc-200" src={String(post.coverImage?.url)} alt="" />
                    </Link>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl pb-5 border-b-2 mb-5">
                    <Link href={`/posts/${post.slug}`}>
                      { post.title }
                    </Link>
                  </h2>
                  <p className="text-zinc-500">
                    {
                      new Date(post.publishedAt).toLocaleDateString('en-us', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    }
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
