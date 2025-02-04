import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormErrors, WaterFormData } from "@/types/water-form";

export const useWaterForm = (type: "buyer" | "seller") => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};
    const requiredFields = ['name', 'phone', 'quantity', 'location', 'pinCode'];

    requiredFields.forEach(field => {
      if (!formData.get(field)) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    const phone = formData.get('phone') as string;
    if (phone && !/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    const pinCode = formData.get('pinCode') as string;
    if (pinCode && !/^\d{6}$/.test(pinCode)) {
      newErrors.pinCode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!validateForm(formData)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const rawData = Object.fromEntries(formData.entries());

    const transformedData: WaterFormData = {
      type,
      name: rawData.name as string,
      phone: rawData.phone as string,
      email: rawData.email as string || "",
      societyname: type === "seller" ? rawData.societyName as string : "",
      quantity: rawData.quantity as string,
      address: rawData.location as string,
      pincode: rawData.pinCode as string,
      deliveryDate: type === "buyer" ? rawData.deliveryDate as string : undefined
    };

    const apiUrl = type === "seller" 
      ? "https://script.google.com/macros/s/AKfycbxEi8rUjpLxd5O30DJRJwUoyJviCoeU7QvfcU_S5Nuoed1tP0NNy6Iqp4ui6xJ8c2qLIw/exec"
      : "https://script.google.com/macros/s/AKfycbzJkvI57RBhg87xDDWM8nfRH0qHtdir4wAZAFx50hWjV0YPb1MLYEKGHehqgkuioQY8ig/exec";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (response.type === 'opaque') {
        toast({
          title: "Success!",
          description: "Your request has been submitted. Our team will contact you shortly.",
        });

        formRef.current?.reset();
        setErrors({});
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, errors, formRef, handleSubmit };
};