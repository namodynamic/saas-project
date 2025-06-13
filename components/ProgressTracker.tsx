import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SubjectProgress {
  subject: string;
  percent: number;
}

interface Goal {
  label: string;
  value: string;
  completed?: boolean;
}

interface ProgressTrackerProps {
  subjects: SubjectProgress[];
  goals: Goal[];
}

const ProgressTracker = ({ subjects, goals }: ProgressTrackerProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>
            Your progress across different subjects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {subjects.map((s) => (
            <div key={s.subject}>
              <div className="flex justify-between text-sm mb-2">
                <span className="capitalize">{s.subject}</span>
                <span>{s.percent}%</span>
              </div>
              <Progress value={s.percent} />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Goals</CardTitle>
          <CardDescription>
            Track your learning objectives
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((g, i) => (
            <div className="flex items-center justify-between" key={i}>
              <span className="text-sm">{g.label}</span>
              <Badge
                variant={g.completed ? "default" : "secondary"}
                className={g.completed ? "bg-green-100 text-green-800" : ""}
              >
                {g.value} {g.completed && "✓"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default ProgressTracker