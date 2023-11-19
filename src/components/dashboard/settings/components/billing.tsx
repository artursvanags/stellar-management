import BillingForm from '@/components/forms/billing-form';
import { getData } from '@/hooks/getData';

const BillingComponent = async () => {
  const data = await getData();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Update your billing information.
        </p>
      </div>
      <BillingForm data={data} />
    </div>
  );
};

export default BillingComponent;
