import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormSectionProps } from "@/types/water-form";

export const BuyerFields = ({ errors }: FormSectionProps) => {
  return (
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
  );
};