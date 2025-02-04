import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropletIcon, ShoppingCartIcon } from "lucide-react";

interface UserTypeSelectorProps {
  onSelect: (type: "buyer" | "seller") => void;
}

const UserTypeSelector = ({ onSelect }: UserTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-4">
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer animate-fadeIn bg-white/10" onClick={() => onSelect("buyer")}>
        <div className="flex flex-col items-center h-full">
          <ShoppingCartIcon className="w-16 h-16 text-primary" />
          <h3 className="text-2xl font-semibold text-white mt-4">I want to buy water</h3>
          <p className="text-center text-gray-300 flex-1">Looking to purchase treated water for your needs?</p>
          <Button 
            variant="secondary" 
            className="w-full bg-primary hover:bg-primary-dark text-white mt-4"
          >
            Continue as Buyer
          </Button>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer animate-fadeIn bg-white/10" onClick={() => onSelect("seller")}>
        <div className="flex flex-col items-center h-full">
          <DropletIcon className="w-16 h-16 text-primary" />
          <h3 className="text-2xl font-semibold text-white mt-4">I want to sell water</h3>
          <p className="text-center text-gray-300 flex-1">Have treated water to supply?</p>
          <Button 
            variant="secondary" 
            className="w-full bg-primary hover:bg-primary-dark text-white mt-4"
          >
            Continue as Seller
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserTypeSelector;