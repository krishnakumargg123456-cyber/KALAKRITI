export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isValidIndianPhone = (value: string) =>
  /^[6-9]\d{9}$/.test(value);

export const isValidPincode = (value: string) =>
  /^\d{6}$/.test(value);

export const isRequired = (value: string) =>
  value.trim().length > 0;
