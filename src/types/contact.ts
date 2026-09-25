export interface ContactFormValues {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

export type ContactFormField = keyof ContactFormValues;

export type ContactFormErrors = Partial<Record<ContactFormField, string>>;
