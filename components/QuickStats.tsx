import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface Stat {
  label: string;
  value: string | number;
  icon: ReactNode;
  subtext?: string;
}

interface QuickStatsProps {
  stats: Stat[];
}

const QuickStats = ({ stats }: QuickStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    {stats.map((stat) => (
      <Card key={stat.label}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
          {stat.icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stat.value}</div>
          {stat.subtext && (
            <p className="text-xs text-muted-foreground">{stat.subtext}</p>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
);

export default QuickStats;