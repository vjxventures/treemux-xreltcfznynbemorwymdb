'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DebateStatsProps {
  totalTurns: number;
  userTurns: number;
}

export function DebateStats({ totalTurns, userTurns }: DebateStatsProps) {
  return (
    <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Debate Progress</h3>
          <p className="text-2xl font-bold">{userTurns} arguments made</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant="outline" className="text-lg px-3 py-1">
            Round {Math.ceil(totalTurns / 2)}
          </Badge>
          <p className="text-xs text-muted-foreground">{totalTurns} total exchanges</p>
        </div>
      </div>
    </Card>
  );
}
