import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        <Card
          key={feature.title + idx}
          className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer"
        >
          <CardHeader className="pb-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.iconBg}`}
            >
              <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
            </div>
            <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
              {feature.title}
            </CardTitle>
            <CardDescription className="text-gray-600 leading-relaxed">
              {feature.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
