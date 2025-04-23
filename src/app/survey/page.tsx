import Survey from "./_components/survey";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Take the Survey | Research Group Survey",
  description:
    "Join our research group and help us build better solutions with your valuable feedback.",
  openGraph: {
    title: "Take the Survey | Research Group Survey",
    description:
      "Join our research group and help us build better solutions with your valuable feedback.",
    type: "website",
    locale: "en_US",
    siteName: "Research Group Survey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Take the Survey | Research Group Survey",
    description:
      "Join our research group and help us build better solutions with your feedback.",
  },
};

export default async function SurveyPage() {
  return <Survey />;
}
