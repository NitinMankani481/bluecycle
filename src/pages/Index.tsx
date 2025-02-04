import { useState } from "react";
import { Link } from "react-router-dom";
import UserTypeSelector from "@/components/UserTypeSelector";
import WaterForm from "@/components/WaterForm";

const Index = () => {
  const [userType, setUserType] = useState<"buyer" | "seller" | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image layer with reduced opacity */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-sm"
        style={{
          backgroundImage: "url('/lovable-uploads/f4df978e-43be-41d6-b957-e85a214188fc.png')",
          opacity: 0.6
        }}
      />
      
      {/* Water pattern overlay with animation */}
      <div className="absolute inset-0 z-1 bg-primary/80 bg-water-pattern animate-float" />
      
      {/* Animated water waves */}
      <div className="absolute inset-0 z-2">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-primary/20 animate-wave" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-primary/20 animate-wave [animation-delay:7.5s]" />
      </div>
      
      <div className="container relative z-10 py-12">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
              alt="Water Trading"
              className="w-32 h-32 object-cover rounded-full border-4 border-primary-light mb-6 mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-white">
            BlueCycle Marketplace
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Connect with trusted buyers and sellers of treated water. Our platform makes
            water trading simple, efficient, and sustainable.
          </p>
          <Link 
            to="/about"
            className="inline-block text-white hover:text-primary-light transition-colors underline"
          >
            Learn more about us →
          </Link>
        </div>

        <div className="max-w-4xl mx-auto backdrop-blur-lg bg-primary/20 p-8 rounded-2xl border border-primary-light/20">
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