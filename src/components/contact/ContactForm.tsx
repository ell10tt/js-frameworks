"use client";

import { useState, type FormEvent } from "react";
import type {
  ContactFormErrors,
  ContactFormField,
  ContactFormValues,
} from "@/types/contact";
import { validateContactField, validateContactForm } from "@/utils/contact";

const initialValues: ContactFormValues = {
  fullName: "",
  subject: "",
  email: "",
  message: "",
};

function getFieldClassName(hasError: boolean) {
  const stateClassName = hasError
    ? "border-red-700 focus:border-red-700 focus-visible:ring-red-700"
    : "border-[#eaeaea] focus:border-[#8377d1] focus-visible:ring-[#8377d1]";

  return `mt-2 w-full rounded-sm border bg-white px-3 py-3 text-base text-[#333333] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 ${stateClassName}`;
}

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

  function handleChange(field: ContactFormField, value: string) {
    setIsSubmissionSuccessful(false);
    setValues((previousValues) => ({
      ...previousValues,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [field]: validateContactField(field, value),
      }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmissionSuccessful(false);

    const validationErrors = validateContactForm(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setValues(initialValues);
    setErrors({});
    setIsSubmissionSuccessful(true);
  }

  return (
    <form
      className="mt-8"
      noValidate
      onSubmit={handleSubmit}
    >
      {isSubmissionSuccessful ? (
        <p
          aria-live="polite"
          className="mb-5 rounded-sm border border-[#9cbfa7] bg-white px-4 py-3 text-sm leading-6 text-[#333333]"
          role="status"
        >
          Thank you! Your message has been submitted.
        </p>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            className="block text-sm font-medium text-[#333333]"
            htmlFor="full-name"
          >
            Full Name
          </label>
          <input
            aria-describedby={errors.fullName ? "full-name-error" : undefined}
            aria-invalid={Boolean(errors.fullName)}
            autoComplete="name"
            className={getFieldClassName(Boolean(errors.fullName))}
            id="full-name"
            name="fullName"
            onChange={({ target }) => handleChange("fullName", target.value)}
            type="text"
            value={values.fullName}
          />
          {errors.fullName ? (
            <p
              className="mt-2 text-sm leading-6 text-red-700"
              id="full-name-error"
              role="alert"
            >
              {errors.fullName}
            </p>
          ) : null}
        </div>
        <div>
          <label
            className="block text-sm font-medium text-[#333333]"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            aria-describedby={errors.subject ? "subject-error" : undefined}
            aria-invalid={Boolean(errors.subject)}
            className={getFieldClassName(Boolean(errors.subject))}
            id="subject"
            name="subject"
            onChange={({ target }) => handleChange("subject", target.value)}
            type="text"
            value={values.subject}
          />
          {errors.subject ? (
            <p
              className="mt-2 text-sm leading-6 text-red-700"
              id="subject-error"
              role="alert"
            >
              {errors.subject}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <label
            className="block text-sm font-medium text-[#333333]"
            htmlFor="email"
          >
            Email
          </label>
          <input
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            className={getFieldClassName(Boolean(errors.email))}
            id="email"
            name="email"
            onChange={({ target }) => handleChange("email", target.value)}
            type="email"
            value={values.email}
          />
          {errors.email ? (
            <p
              className="mt-2 text-sm leading-6 text-red-700"
              id="email-error"
              role="alert"
            >
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <label
            className="block text-sm font-medium text-[#333333]"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            aria-describedby={errors.message ? "message-error" : undefined}
            aria-invalid={Boolean(errors.message)}
            className={`${getFieldClassName(Boolean(errors.message))} min-h-36 resize-y`}
            id="message"
            name="message"
            onChange={({ target }) => handleChange("message", target.value)}
            value={values.message}
          />
          {errors.message ? (
            <p
              className="mt-2 text-sm leading-6 text-red-700"
              id="message-error"
              role="alert"
            >
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>
      <button
        className="mt-6 inline-flex w-full justify-center rounded-sm bg-[#9cbfa7] px-5 py-3 text-base font-medium text-white transition-[filter] hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9cbfa7]"
        type="submit"
      >
        Send Message
      </button>
    </form>
  );
}
