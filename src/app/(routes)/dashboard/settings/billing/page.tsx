import SubHeading from '@/components/dashboard/settings/components/sub-heading';
import BillingTemplate from '@/components/dashboard/settings/templates/billing';

const BillingPage = () => {
  return (
    <div className="space-y-6">
      <SubHeading title="Billing" description="Review your billing details." />
      <BillingTemplate />
    </div>
  );
};

export default BillingPage;
