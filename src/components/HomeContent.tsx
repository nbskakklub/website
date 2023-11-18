'use client';

import { MDXRemote } from "next-mdx-remote";

type Props = {
  source: any;
  components: any;
};
export default function HomeContent({source, components}: Props) {
  return (
    <MDXRemote {...source} components={components} />
  );
}
