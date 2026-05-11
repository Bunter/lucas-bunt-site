import { Globe2 } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function TravelPage() {
  return (
    <ComingSoon
      icon={Globe2}
      eyebrow="Travel"
      title="Trips, country tracking, and map views will live here."
      body="The travel section will combine posts with a visited-countries tracker and visual map."
    />
  );
}
