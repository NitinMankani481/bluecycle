import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropletIcon, ShoppingCartIcon } from "lucide-react";

interface UserTypeSelectorProps {
  onSelect: (type: "buyer" | "seller") => void;
}

const UserTypeSelector = ({ onSelect }: UserTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-4">
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer animate-fadeIn bg-primary/30" onClick={() => onSelect("buyer")}>
        <div className="flex flex-col items-center h-full">
          <ShoppingCartIcon className="w-16 h-16 text-white" />
          <h3 className="text-2xl font-semibold text-white mt-4">I want to buy water</h3>
          <p className="text-center text-gray-200 mt-4">Looking to purchase treated water for your needs?</p>
          <div className="mt-auto pt-8">
            <Button 
              variant="secondary" 
              className="w-full bg-secondary hover:bg-secondary/80 text-white"
            >
              Continue as Buyer
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer animate-fadeIn bg-primary/30" onClick={() => onSelect("seller")}>
        <div className="flex flex-col items-center h-full">
          <DropletIcon className="w-16 h-16 text-white" />
          <h3 className="text-2xl font-semibold text-white mt-4">I want to sell water</h3>
          <p className="text-center text-gray-200 mt-4">Have treated water to supply?</p>
          <div className="mt-auto pt-8">
            <Button 
              variant="secondary" 
              className="w-full bg-secondary hover:bg-secondary/80 text-white"
            >
              Continue as Seller
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserTypeSelector;