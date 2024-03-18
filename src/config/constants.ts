
export type FilamentStatusType = 'new' | 'used' | 'archived' | 'in_use';

export interface FilamentStatusOption {
  value: FilamentStatusType;
  label: string;
}

export const filamentStatus: Record<FilamentStatusType, FilamentStatusOption> = {
  new: {
    value: 'new',
    label: 'New',
  },
  used: {
    value: 'used',
    label: 'Used',
  },
  archived: {
    value: 'archived',
    label: 'Archived',
  },
  in_use: {
    value: 'in_use',
    label: 'In Use',
  },
};


export const filamentDiameter = {
  default: {
    value: '175',
    label: '1.75 mm',
  },
  large: {
    value: '285',
    label: '2.85 mm',
  },
};
