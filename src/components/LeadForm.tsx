"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Calendar, Car, Settings } from "lucide-react";

const USPhoneRegex = /^\+?1?\s*\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/;
const ZIPRegex = /^[0-9]{5}$/;

const leadSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  email: z.string().trim().toLowerCase().email('Invalid email address').max(255),
  phone: z.string().trim().regex(USPhoneRegex, 'Invalid US phone number format'),
  zipCode: z.string().trim().regex(ZIPRegex, 'ZIP code must be exactly 5 digits'),
  carYear: z.string({ message: 'Car year is required' }).min(1, 'Car year is required'),
  carMake: z.string({ message: 'Car make is required' }).min(1, 'Car make is required').max(50),
  carModel: z.string({ message: 'Car model is required' }).min(1, 'Car model is required').max(50),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export default function LeadForm() {
  const [years, setYears] = useState<number[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);

  const [loadingYears, setLoadingYears] = useState(true);
  const [loadingMakes, setLoadingMakes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    resetField,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      zipCode: "",
      carYear: "",
      carMake: "",
      carModel: "",
    },
  });

  const selectedYear = watch("carYear");
  const selectedMake = watch("carMake");

  // Fetch Years
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await fetch("/api/vehicles/years");
        if (res.ok) {
          const data = await res.json();
          setYears(data);
        }
      } catch (error) {
        console.error("Failed to fetch years", error);
      } finally {
        setLoadingYears(false);
      }
    };
    fetchYears();
  }, []);

  // Fetch Makes based on Year
  useEffect(() => {
    if (!selectedYear) {
      setMakes([]);
      return;
    }
    const fetchMakes = async () => {
      setLoadingMakes(true);
      try {
        const res = await fetch(`/api/vehicles/makes?year=${selectedYear}`);
        if (res.ok) {
          const data = await res.json();
          setMakes(data);
        }
      } catch (error) {
        console.error("Failed to fetch makes", error);
      } finally {
        setLoadingMakes(false);
      }
    };
    fetchMakes();
  }, [selectedYear]);

  // Fetch Models based on Year and Make
  useEffect(() => {
    if (!selectedYear || !selectedMake) {
      setModels([]);
      return;
    }
    const fetchModels = async () => {
      setLoadingModels(true);
      try {
        const res = await fetch(`/api/vehicles/models?year=${selectedYear}&make=${encodeURIComponent(selectedMake)}`);
        if (res.ok) {
          const data = await res.json();
          setModels(data);
        }
      } catch (error) {
        console.error("Failed to fetch models", error);
      } finally {
        setLoadingModels(false);
      }
    };
    fetchModels();
  }, [selectedYear, selectedMake]);

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        carYear: parseInt(data.carYear, 10),
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to submit lead");
      }

      toast.success("Quote request submitted successfully!");
      reset();
      setModels([])
      setMakes([])
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md sm:max-w-lg mx-auto shadow-lg border-t-4 border-t-blue-600">
      <CardHeader className="bg-slate-50 border-b pb-6">
        <CardTitle className="text-2xl font-bold text-center text-slate-800">Get Your Free Quote</CardTitle>
        <CardDescription className="text-center text-slate-600">
          Enter your details below to see how much you could save.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input id="firstName" placeholder="First Name" className="h-10 md:h-12" {...register("firstName")} />
              <div className="error-spacer min-h-[1.5rem]">{errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}</div>
            </div>
            <div>
              <Input id="lastName" placeholder="Last Name" className="h-10 md:h-12" {...register("lastName")} />
              <div className="error-spacer min-h-[1.5rem]">{errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}</div>
            </div>
          </div>

          <div>
            <Input id="email" type="email" placeholder="Email Address" className="h-10 md:h-12" {...register("email")} />
            <div className="error-spacer min-h-[1.5rem]">{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input id="phone" type="tel" placeholder="Phone Number" className="h-10 md:h-12" {...register("phone")} />
              <div className="error-spacer min-h-[1.5rem]">{errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}</div>
            </div>
            <div>
              <Input id="zipCode" placeholder="ZIP Code" className="h-10 md:h-12" {...register("zipCode")} />
              <div className="error-spacer min-h-[1.5rem]">{errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode.message}</p>}</div>
            </div>
          </div>

          <div className="pt-2 border-t">
            <h3 className="font-semibold text-base text-slate-700 mb-4">Vehicle Details</h3>

            <div className="flex flex-col space-y-4">
              <div className="space-y-1">
                <Label htmlFor="carYear"><Calendar className="inline-block mr-1 h-4 w-4" /> Year</Label>
                <Controller
                  name="carYear"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={loadingYears}
                      onValueChange={(val) => {
                        field.onChange(val);
                        resetField("carMake");
                        resetField("carModel");
                      }}
                      value={field.value}
                    >
                      <SelectTrigger id="carYear" className="w-full">
                        <SelectValue placeholder={loadingYears ? "Loading..." : "Select Year"} />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <div className="error-spacer min-h-[1.5rem]">{errors.carYear && <p className="text-sm text-red-500">{errors.carYear.message}</p>}</div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="carMake"><Car className="inline-block mr-1 h-4 w-4" /> Make</Label>
                <Controller
                  name="carMake"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={!selectedYear || loadingMakes}
                      onValueChange={(val) => {
                        field.onChange(val);
                        resetField("carModel"); // Reset dependent field
                      }}
                      value={field.value}
                    >
                      <SelectTrigger id="carMake" className="w-full">
                        <SelectValue placeholder={!selectedYear ? "Select Year First" : loadingMakes ? "Loading..." : "Select Make"} />
                      </SelectTrigger>
                      <SelectContent>
                        {makes.map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <div className="error-spacer min-h-[1.5rem]">{selectedYear && errors.carMake && <p className="text-sm text-red-500">{errors.carMake.message}</p>}</div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="carModel"><Settings className="inline-block mr-1 h-4 w-4" /> Model</Label>
                <Controller
                  name="carModel"
                  control={control}
                  render={({ field }) => (
                    <Select
                      disabled={!selectedMake || loadingModels}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger id="carModel" className="w-full">
                        <SelectValue placeholder={!selectedMake ? "Select Make First" : loadingModels ? "Loading..." : "Select Model"} />
                      </SelectTrigger>
                      <SelectContent>
                        {models.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <div className="error-spacer min-h-[1.5rem]">{selectedMake && errors.carModel && <p className="text-sm text-red-500">{errors.carModel.message}</p>}</div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full mt-2 h-12 md:h-14 text-lg font-semibold" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Get My Free Quote
          </Button>
          <p className="text-xs text-center text-slate-500 mt-4">
            By clicking &ldquo;Get My Free Quote&rdquo;, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
