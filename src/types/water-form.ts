export interface FormErrors {
  [key: string]: string;
}

export interface WaterFormData {
  type: "buyer" | "seller";
  name: string;
  phone: string;
  email: string;
  societyname?: string;
  quantity: string;
  address: string;
  pincode: string;
  deliveryDate?: string;
}

export interface CommonFieldsProps {
  errors: FormErrors;
}

export interface FormSectionProps extends CommonFieldsProps {
  type: "buyer" | "seller";
}