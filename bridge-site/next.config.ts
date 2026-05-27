import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  trailingSlash: false,
  async redirects() {
    return [
      // Retired free squeeze variant — $1 is the locked tripwire price.
      {
        source: "/shadow-audit-free",
        destination: "/shadow-audit-1",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
