import { getData } from '@/lib/utils/get-data';
import PlanOverview from '@/components/dashboard/settings/components/plan-overview';

const GeneralSettingsTemplate: React.FC = async () => {
  const data = await getData();
  if (!data) return null;
  return (
    <div className="space-y-6">
      <PlanOverview data={data} />
    </div>
  );
};

export default GeneralSettingsTemplate;
