import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const FeatureCards = ({ features }: { features: Feature[] }) => {
  return (
    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, idx) => (
        <Card key={feature.title + idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.iconBg}`}>
              <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
            </div>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default FeatureCards