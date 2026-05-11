import { Utensils } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function RecipesPage() {
  return (
    <ComingSoon
      icon={Utensils}
      eyebrow="Recipes"
      title="A practical kitchen notebook is coming next."
      body="Recipes will eventually include ingredients, steps, notes, tags, and an admin editor."
    />
  );
}
