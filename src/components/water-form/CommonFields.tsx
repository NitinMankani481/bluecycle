import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CommonFieldsProps } from "@/types/water-form";

export const CommonFields = ({ errors }: CommonFieldsProps) => {
  return (
    <>
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
    </>
  );
};