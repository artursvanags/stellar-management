import SectionInformation from '@/components/global/section-information';
import BillingTemplate from '@/components/dashboard/settings/templates/billing';

const BillingPage = () => {
  return (
    <div className="space-y-6">
      <SectionInformation
        title="Billing"
        description="Review your billing details."
      />
      <BillingTemplate />
    </div>
  );
};

export default BillingPage;
