import type { Metadata } from "next";
import { CvPage } from "@/components/cv-page";
import { getCvData } from "@/lib/cv-data";

export const metadata: Metadata = {
  title: "Work",
  description: "Professional background, experience, projects, and skills for Lucas Bunt.",
};

export default async function Page() {
  const data = await getCvData();

  return <CvPage data={data} />;
}
