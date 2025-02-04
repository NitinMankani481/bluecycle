import { useState } from "react";
import UserTypeSelector from "@/components/UserTypeSelector";
import WaterForm from "@/components/WaterForm";

const Index = () => {
  const [userType, setUserType] = useState<"buyer" | "seller" | null>(null);

  return (
    <div className="min-h-screen bg-[#1A1F2C] bg-water-pattern relative overflow-hidden">
      {/* Animated water waves */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-primary/20 animate-wave" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-primary/20 animate-wave [animation-delay:7.5s]" />
      </div>
      
      <div className="container relative z-10 py-12">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
              alt="Water Trading"
              className="w-32 h-32 object-cover rounded-full border-4 border-primary mb-6 mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-light via-primary to-primary-dark bg-clip-text text-transparent">
            BlueCycle Marketplace
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with trusted buyers and sellers of treated water. Our platform makes
            water trading simple, efficient, and sustainable.
          </p>
        </div>

        <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10">
          {!userType ? (
            <UserTypeSelector onSelect={setUserType} />
          ) : (
            <WaterForm type={userType} onBack={() => setUserType(null)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;