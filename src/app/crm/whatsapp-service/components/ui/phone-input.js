"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PhoneInput = React.forwardRef(function PhoneInput(
  { className, value = "", onChange, ...props },
  ref
) {
  const formatPhoneNumber = (input) => {
    // Remove all non-digits
    const digits = input.replace(/\D/g, "");

    // Turkish phone number formatting
    if (digits.length === 0) return "";

    // Handle country code
    let formatted = "";
    if (digits.startsWith("90")) {
      // Already has country code
      const phoneDigits = digits.slice(2);
      if (phoneDigits.length <= 3) {
        formatted = `+90 ${phoneDigits}`;
      } else if (phoneDigits.length <= 6) {
        formatted = `+90 ${phoneDigits.slice(0, 3)} ${phoneDigits.slice(3)}`;
      } else if (phoneDigits.length <= 8) {
        formatted = `+90 ${phoneDigits.slice(0, 3)} ${phoneDigits.slice(
          3,
          6
        )} ${phoneDigits.slice(6)}`;
      } else {
        formatted = `+90 ${phoneDigits.slice(0, 3)} ${phoneDigits.slice(
          3,
          6
        )} ${phoneDigits.slice(6, 8)} ${phoneDigits.slice(8, 10)}`;
      }
    } else {
      // No country code, add +90
      if (digits.length <= 3) {
        formatted = `+90 ${digits}`;
      } else if (digits.length <= 6) {
        formatted = `+90 ${digits.slice(0, 3)} ${digits.slice(3)}`;
      } else if (digits.length <= 8) {
        formatted = `+90 ${digits.slice(0, 3)} ${digits.slice(
          3,
          6
        )} ${digits.slice(6)}`;
      } else {
        formatted = `+90 ${digits.slice(0, 3)} ${digits.slice(
          3,
          6
        )} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
      }
    }

    return formatted;
  };

  const handleChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (onChange) onChange(formatted);
  };

  const validatePhoneNumber = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return (
      digits.length >= 12 && digits.length <= 13 && digits.startsWith("90")
    );
  };

  const isValid = value ? validatePhoneNumber(value) : true;

  return (
    <Input
      type="tel"
      inputMode="tel"
      placeholder="+90 5XX XXX XX XX"
      className={cn(
        className,
        !isValid && value && "border-red-500 focus-visible:ring-red-500"
      )}
      value={value}
      onChange={handleChange}
      ref={ref}
      {...props}
    />
  );
});

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
