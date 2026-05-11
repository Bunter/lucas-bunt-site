import { NotebookText } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function BlogPage() {
  return (
    <ComingSoon
      icon={NotebookText}
      eyebrow="Writing"
      title="Work, industry, and technology writing will live here."
      body="The writing section will reuse the same admin-backed content pattern after the CV slice is complete."
    />
  );
}
