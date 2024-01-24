import { getData } from '@/lib/actions/get-data';
import PlanOverview from '@/components/dashboard/settings/components/plan-overview';

const BillingTemplate: React.FC = async () => {
  const data = await getData();
  if (!data) return null;
  return (
    <div className="space-y-6">
      <PlanOverview data={data} />
    </div>
  );
};

export default BillingTemplate;
