export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: {
    html: string;
  }
  coverImage: {
    url?: string;
  };
  brief: string;
  readTimeInMinutes: number;
  publishedAt: string;
  seo: {
    title: string;
    description: string;
  }
  ogMetaData: {
    image: string;
  }
  author?: {
    id: string;
    name: string;
    profilePicture: string;
    socialMediaLinks?: {
      twitter: string;
      youtube: string;
      github: string;
    }
  }
}