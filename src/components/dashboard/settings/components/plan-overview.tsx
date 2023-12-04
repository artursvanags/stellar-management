'use client';

import { Progress } from '@/components/ui/progress';
import { Filaments } from '@/types/database';

interface PlanOverviewProps {
  data: {
    filaments: Filaments[];
  };
}

const PlanOverview: React.FC<PlanOverviewProps> = ({ data }) => {
  const count = data.filaments.length;
  const limit = 100;
  const percentage = Math.round((count / limit) * 100);

  return (
    <div className="space-y-4 rounded border p-4">
      <div className="grid grid-cols-2">
        <div className="flex flex-col">
          Current subscription
          <span className="text-3xl font-bold">Free</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground">Filament usage:</span>
        <Progress className="h-2" value={percentage} />
        <div className="flex">
          <p className="text-sm text-muted-foreground">
            {count} ({percentage} %)
          </p>
          <p className="ml-auto text-sm text-muted-foreground">{limit}</p>
        </div>
      </div>
    </div>
  );
};

export default PlanOverview;
