import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface WaterFormProps {
  type: "buyer" | "seller";
  onBack: () => void;
}

const WaterForm = ({ type, onBack }: WaterFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Replace this URL with your Google Apps Script Web App URL
      const response = await fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          ...data,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "Success!",
        description: "Your information has been submitted successfully.",
      });

      e.currentTarget.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 animate-fadeIn">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center">
            {type === "buyer" ? "Water Purchase Request" : "Water Supply Details"}
          </h2>
          <p className="text-gray-600 text-center">
            Please fill in your details below
          </p>
        </div>

        {type === "buyer" ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity Needed (Liters)</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                required
                min="1"
                placeholder="Enter quantity in liters"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select name="frequency" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="one-time">One-Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" required />
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="quantityAvailable">Quantity Available (Liters)</Label>
            <Input
              id="quantityAvailable"
              name="quantityAvailable"
              type="number"
              required
              min="1"
              placeholder="Enter available quantity in liters"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="location">
            {type === "buyer" ? "Delivery Address" : "Society Name"}
          </Label>
          <Input
            id="location"
            name="location"
            required
            placeholder={
              type === "buyer"
                ? "Enter your delivery address"
                : "Enter your society name"
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pinCode">PIN Code</Label>
          <Input
            id="pinCode"
            name="pinCode"
            required
            pattern="[0-9]{6}"
            placeholder="Enter 6-digit PIN code"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              pattern="[0-9]{10}"
              placeholder="Enter 10-digit phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default WaterForm;