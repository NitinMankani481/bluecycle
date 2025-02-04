import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

interface WaterFormProps {
  type: "buyer" | "seller";
  onBack: () => void;
}

const WaterForm = ({ type, onBack }: WaterFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
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

    const transformedData = {
      type,
      name: rawData.name,
      phone: rawData.phone,
      email: rawData.email,
      societyname: type === "seller" ? rawData.societyName : "",
      quantity: rawData.quantity,
      date: rawData.deliveryDate,
      address: rawData.location,
      pincode: rawData.pinCode
    };

    const apiUrl = type === "seller" 
      ? "https://script.google.com/macros/s/AKfycbzh-YogQamRf9A1qCf_e7-Og0HQ0hS2PwSSQ52jhunWydg6uSmFAxHANmRB1QRv2Biu1A/exec"
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

      // Since we're using no-cors mode, we need to handle success differently
      // no-cors mode will always return status 0 and type 'opaque'
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

  return (
    <Card className="bg-transparent backdrop-blur-sm border-white/10">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="flex items-center mb-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="text-white hover:text-primary-light p-0 mr-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-2xl font-bold text-primary-light">
            {type === "buyer" ? "Water Purchase Request" : "Water Supply Details"}
          </h2>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-200">
            {type === "buyer" ? "Buyer Name*" : "Seller Name*"}
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            className={`bg-white/5 border-white/10 text-white ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-200">Phone Number*</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              pattern="[0-9]{10}"
              placeholder="Enter 10-digit phone number"
              className={`bg-white/5 border-white/10 text-white ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        {type === "buyer" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-gray-200">Quantity Needed (Liters)*</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                placeholder="Enter quantity in liters"
                className={`bg-white/5 border-white/10 text-white ${errors.quantity ? 'border-red-500' : ''}`}
              />
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate" className="text-gray-200">Delivery Date*</Label>
              <Input 
                id="deliveryDate" 
                name="deliveryDate" 
                type="date" 
                className={`bg-white/5 border-white/10 text-white ${errors.deliveryDate ? 'border-red-500' : ''}`}
              />
              {errors.deliveryDate && <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>}
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="societyName" className="text-gray-200">Society Name*</Label>
              <Input
                id="societyName"
                name="societyName"
                placeholder="Enter society name"
                className={`bg-white/5 border-white/10 text-white ${errors.societyName ? 'border-red-500' : ''}`}
              />
              {errors.societyName && <p className="text-red-500 text-sm mt-1">{errors.societyName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-gray-200">Quantity Available (Liters)*</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                placeholder="Enter available quantity in liters"
                className={`bg-white/5 border-white/10 text-white ${errors.quantity ? 'border-red-500' : ''}`}
              />
              {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-200">Delivery Address*</Label>
          <Input
            id="location"
            name="location"
            placeholder="Enter delivery address"
            className={`bg-white/5 border-white/10 text-white ${errors.location ? 'border-red-500' : ''}`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pinCode" className="text-gray-200">PIN Code*</Label>
          <Input
            id="pinCode"
            name="pinCode"
            pattern="[0-9]{6}"
            placeholder="Enter 6-digit PIN code"
            className={`bg-white/5 border-white/10 text-white ${errors.pinCode ? 'border-red-500' : ''}`}
          />
          {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode}</p>}
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-primary hover:bg-primary/80 text-white"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>

      </form>
    </Card>
  );
};

export default WaterForm;