/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: false,
  },
};

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default nextConfig;
