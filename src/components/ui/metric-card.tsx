import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconColor = "text-primary",
  className 
}: MetricCardProps) {
  return (
    <Card className={cn("shadow-card hover:shadow-elevated transition-smooth", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={cn(
                "text-xs font-medium mt-1",
                change.trend === "up" ? "text-success" : "text-destructive"
              )}>
                {change.trend === "up" ? "+" : ""}{change.value}% vs last month
              </p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-full bg-primary/10",
            iconColor
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}