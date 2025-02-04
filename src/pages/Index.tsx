import { useState } from "react";
import UserTypeSelector from "@/components/UserTypeSelector";
import WaterForm from "@/components/WaterForm";

const Index = () => {
  const [userType, setUserType] = useState<"buyer" | "seller" | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-white py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-dark mb-4">
            Water Trading Marketplace
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with trusted buyers and sellers of treated water. Whether you need
            water or have it to supply, we make the process simple and efficient.
          </p>
        </div>

        {!userType ? (
          <UserTypeSelector onSelect={setUserType} />
        ) : (
          <WaterForm type={userType} onBack={() => setUserType(null)} />
        )}
      </div>
    </div>
  );
};

export default Index;