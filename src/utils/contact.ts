import type {
  ContactFormErrors,
  ContactFormField,
  ContactFormValues,
} from "@/types/contact";

const contactFormFields: ContactFormField[] = [
  "fullName",
  "subject",
  "email",
  "message",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactField(
  field: ContactFormField,
  value: string,
): string | undefined {
  const trimmedValue = value.trim();

  if (field === "fullName") {
    if (!trimmedValue) {
      return "Full name is required.";
    }

    if (trimmedValue.length < 3) {
      return "Full name must be at least 3 characters.";
    }
  }

  if (field === "subject") {
    if (!trimmedValue) {
      return "Subject is required.";
    }

    if (trimmedValue.length < 3) {
      return "Subject must be at least 3 characters.";
    }
  }

  if (field === "email") {
    if (!trimmedValue) {
      return "Email is required.";
    }

    if (!emailPattern.test(trimmedValue)) {
      return "Please enter a valid email address.";
    }
  }

  if (field === "message") {
    if (!trimmedValue) {
      return "Message is required.";
    }

    if (trimmedValue.length < 10) {
      return "Message must be at least 10 characters.";
    }
  }
}

export function validateContactForm(
  values: ContactFormValues,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  for (const field of contactFormFields) {
    const error = validateContactField(field, values[field]);

    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}
