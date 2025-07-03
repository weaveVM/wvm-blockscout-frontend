import { useQuery } from '@tanstack/react-query';

import customAddressLabelsConfig from 'configs/customAddressLabels.json';

interface Props {
  address: string | undefined;
}

export interface CustomAddressLabel {
  label: string;
  bgColor: string;
  textColor: string;
}

export function useCustomAddressLabels({ address }: Props): CustomAddressLabel | null {
  const { data: customLabels } = useQuery({
    queryKey: [ 'custom-address-labels' ],
    queryFn: async() => {
      // In development, we can load from the JSON file directly
      // In production, this could be from an API or environment config
      return customAddressLabelsConfig as Record<string, CustomAddressLabel>;
    },
    // Cache this data as it's relatively static
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (!address || !customLabels) {
    return null;
  }

  // Check if the address (case-insensitive) has a custom label
  const normalizedAddress = address.toLowerCase();
  const labelKey = Object.keys(customLabels).find(
    key => key.toLowerCase() === normalizedAddress,
  );

  return labelKey ? customLabels[labelKey] : null;
}
