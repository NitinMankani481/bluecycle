import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useWaterForm } from "@/hooks/useWaterForm";
import { CommonFields } from "./water-form/CommonFields";
import { BuyerFields } from "./water-form/BuyerFields";
import { SellerFields } from "./water-form/SellerFields";

interface WaterFormProps {
  type: "buyer" | "seller";
  onBack: () => void;
}

const WaterForm = ({ type, onBack }: WaterFormProps) => {
  const { loading, errors, formRef, handleSubmit } = useWaterForm(type);

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

        <CommonFields errors={errors} />
        
        {type === "buyer" ? (
          <BuyerFields type={type} errors={errors} />
        ) : (
          <SellerFields type={type} errors={errors} />
        )}

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