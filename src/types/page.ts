export interface Page {
  id: string;
  slug: string;
  title: string;
  content: {
    html: string;
  }
}