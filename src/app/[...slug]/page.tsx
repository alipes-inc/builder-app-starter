import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  isPreviewing,
} from '@builder.io/sdk-react-nextjs';
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string[];
  };
  searchParams: Record<string, string>;
}

const PUBLIC_API_KEY = process.env.BUILDER_PUBLIC_API_KEY!;

export default async function Page(props: PageProps) {
  const urlPath = '/' + (props.params?.slug?.join('/') || '');

  const content = await fetchOneEntry({
    options: getBuilderSearchParams(props.searchParams),
    apiKey: PUBLIC_API_KEY,
    model: 'page',
    userAttributes: { urlPath },
  });

  const canShowContent = content || isPreviewing(props.searchParams);

  if (!canShowContent) {
    notFound();
  }
  return <Content content={content} apiKey={PUBLIC_API_KEY} model="page" />;
}
