"use client";

import { SurveyLayout } from "@/components/survey-layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { relationshipOptions, UserInfoForm } from "./user-info-form";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface UserInfo {
  firstName: string;
  lastName?: string;
  company: string;
  email: string;
  role: string;
  relationship?: string;
}

export default function Survey() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const resetSurvey = () => {
    setIsCompleted(false);
    setUserInfo(null);
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (data: UserInfo) => {
    const relationship = relationshipOptions.find(
      (option) => option.optionId.toString() === data.relationship,
    );
    console.log("🚀 ~ handleSubmit ~ data:", data);

    const formData = new FormData();
    formData.append("Name", (data.firstName + " " + data.lastName).trim());
    formData.append("Email", data.email);
    formData.append("Company", data.company);
    formData.append("Role", data.role);
    formData.append("Relationship", relationship?.id ?? "");

    fetch(
      "https://script.google.com/macros/s/AKfycbwEgox6SGY0Durv2jzkj5OtMKPvR75D4GrDsYtzKFu-ao3GV0gRRMifU5D9ztm8L-vjsQ/exec",
      {
        method: "POST",
        body: formData,
      },
    )
      .then((res) => {
        console.log("🚀 ~ handleSubmit ~ res:", res);
      })
      .catch((err) => {
        console.error("🚀 ~ handleSubmit ~ err:", err);
      });

    setIsCompleted(true);
  };

  if (!isCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
        <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-xl sm:p-8">
          <h1 className="mb-4 text-2xl font-bold text-purple-600 sm:text-3xl">
            Thank You!
          </h1>
          <p className="mb-6 text-base text-gray-600 sm:text-lg">
            We appreciate you taking the time to share your perspective with
            Nutanix. <br />
            We&apos;ll be in touch soon with more opportunities to contribute to
            our research initiatives.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full bg-gradient-to-r from-purple-600 to-pink-600 py-2 text-white shadow-md hover:from-purple-700 hover:to-pink-700 disabled:cursor-not-allowed disabled:opacity-50",
              )}
              href={"https://nutanix.design/#/"}
              target="_blank"
            >
              Learn more about us
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SurveyLayout title={"Tell us about yourself"} onBack={handleBack}>
      <UserInfoForm
        onSubmit={handleSubmit}
        initialData={userInfo ?? undefined}
      />
    </SurveyLayout>
  );
}
