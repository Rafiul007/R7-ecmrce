import { CheckoutFormValues } from "@/app/checkout/page";

export const shippingFieldsConfig: {
  name: keyof CheckoutFormValues;
  placeholder: string;
  optional?: boolean;
}[] = [
  { name: "firstName", placeholder: "First name" },
  { name: "lastName", placeholder: "Last name" },
  { name: "company", placeholder: "Company (optional)", optional: true },
  { name: "address", placeholder: "Address" },
  {
    name: "apartment",
    placeholder: "Apartment, suite, etc. (optional)",
    optional: true,
  },
  { name: "city", placeholder: "City" },
  { name: "state", placeholder: "State" },
  { name: "zipCode", placeholder: "ZIP code" },
  { name: "phone", placeholder: "Phone (optional)", optional: true },
];
