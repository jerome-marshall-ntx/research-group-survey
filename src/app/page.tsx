import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Group Survey",
  description:
    "Join our research group and help us build better solutions with your valuable feedback.",
  openGraph: {
    title: "Research Group Survey",
    description:
      "Join our research group and help us build better solutions with your valuable feedback.",
    type: "website",
    locale: "en_US",
    siteName: "Research Group Survey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Group Survey",
    description:
      "Join our research group and help us build better solutions with your feedback.",
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-purple-200 via-purple-100 to-pink-100">
      <div className="container px-4 py-8 text-center sm:py-16">
        <div className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
          <h1 className="flex flex-col gap-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-5xl md:text-6xl">
            <span className="text-4xl">Help Us Improve</span>{" "}
            <span>Join Our Research Group!</span>
          </h1>

          <p className="mx-auto max-w-2xl px-4 text-base text-gray-600 sm:px-0 sm:text-lg">
            We&apos;d love to hear from you. Your feedback helps us build better
            solutions for you.
          </p>

          <div className="flex flex-col items-center gap-4 px-4 sm:px-0">
            <Link
              href="/survey"
              className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-lg active:scale-[0.98] sm:w-auto sm:px-8 sm:text-lg"
            >
              Sign up here!
            </Link>

            <p className="text-sm text-gray-500">
              Interested in joining our research group?
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
