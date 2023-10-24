import { ClientSafeProvider, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useProviders = () => {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const p = await getProviders();
        setProviders(p);
      } catch (error) {
        // Handle any errors that occur during the async operation.
        console.error('Error fetching data:', error);
      } finally {
      }
    };

    fetchData();
  }, []);

  return providers;
};
