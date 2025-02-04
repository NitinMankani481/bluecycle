import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormSectionProps } from "@/types/water-form";

export const SellerFields = ({ errors }: FormSectionProps) => {
  return (
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
  );
};