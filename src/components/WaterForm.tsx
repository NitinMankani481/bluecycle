import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface WaterFormProps {
  type: "buyer" | "seller";
  onBack: () => void;
}

const WaterForm = ({ type, onBack }: WaterFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    const requiredFields = ['quantity', 'location', 'pinCode', 'phone'];
    
    if (type === 'buyer') {
      requiredFields.push('frequency', 'startDate', 'endDate');
    }

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
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          ...data,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "Success!",
        description: "Your information has been submitted successfully.",
      });

      e.currentTarget.reset();
      setErrors({});
    } catch (error) {
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
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center text-primary-light">
            {type === "buyer" ? "Water Purchase Request" : "Water Supply Details"}
          </h2>
          <p className="text-gray-400 text-center">
            Please fill in your details below
          </p>
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
              <Label htmlFor="frequency" className="text-gray-200">Frequency*</Label>
              <Select name="frequency">
                <SelectTrigger className={`bg-white/5 border-white/10 text-white ${errors.frequency ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="one-time">One-Time</SelectItem>
                </SelectContent>
              </Select>
              {errors.frequency && <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-gray-200">Start Date*</Label>
                <Input 
                  id="startDate" 
                  name="startDate" 
                  type="date" 
                  className={`bg-white/5 border-white/10 text-white ${errors.startDate ? 'border-red-500' : ''}`}
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-gray-200">End Date*</Label>
                <Input 
                  id="endDate" 
                  name="endDate" 
                  type="date" 
                  className={`bg-white/5 border-white/10 text-white ${errors.endDate ? 'border-red-500' : ''}`}
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="quantityAvailable" className="text-gray-200">Quantity Available (Liters)*</Label>
            <Input
              id="quantityAvailable"
              name="quantity"
              type="number"
              min="1"
              placeholder="Enter available quantity in liters"
              className={`bg-white/5 border-white/10 text-white ${errors.quantity ? 'border-red-500' : ''}`}
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-200">
            {type === "buyer" ? "Delivery Address*" : "Society Name*"}
          </Label>
          <Input
            id="location"
            name="location"
            placeholder={type === "buyer" ? "Enter your delivery address" : "Enter your society name"}
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

        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onBack}
            className="bg-white/10 hover:bg-white/20 text-white border-0"
          >
            Back
          </Button>
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