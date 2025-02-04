import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropletIcon, ShoppingCartIcon } from "lucide-react";

interface UserTypeSelectorProps {
  onSelect: (type: "buyer" | "seller") => void;
}

const UserTypeSelector = ({ onSelect }: UserTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-4">
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer animate-fadeIn" onClick={() => onSelect("buyer")}>
        <div className="flex flex-col items-center space-y-4">
          <ShoppingCartIcon className="w-16 h-16 text-primary" />
          <h3 className="text-2xl font-semibold">I want to buy water</h3>
          <p className="text-center text-gray-600">Looking to purchase treated water for your needs?</p>
          <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-0">Continue as Buyer</Button>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer animate-fadeIn" onClick={() => onSelect("seller")}>
        <div className="flex flex-col items-center space-y-4">
          <DropletIcon className="w-16 h-16 text-primary" />
          <h3 className="text-2xl font-semibold">I want to sell water</h3>
          <p className="text-center text-gray-600">Have treated water to supply?</p>
          <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-0">Continue as Seller</Button>
        </div>
      </Card>
    </div>
  );
};

export default UserTypeSelector;