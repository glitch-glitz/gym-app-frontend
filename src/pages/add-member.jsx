import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

// Validation schema
const validationSchema = z.object({
  full_name: z.string().nonempty({ message: "Member name is required" }),
  weight: z.string().nonempty({ message: "Weight is required" }),
  passport: z.string().url({ message: "Passport must be a valid URL" }),
  subscription_id: z.string().nonempty({ message: "Subscription is required" }),
});

export const AddMemberPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/subscription")
      .then((res) => res.json())
      .then((data) => setSubscriptions(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to load subscriptions");
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      full_name: "",
      weight: "",
      passport: "",
      subscription_id: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:8000/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: values.full_name,
          weight: values.weight,
          passport: values.passport, // just a string URL now
          subscription_id: parseInt(values.subscription_id),
        }),
      });

      if (!response.ok) throw new Error("Failed to add member");

      toast.success("Member added successfully!");
      reset();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Error adding member. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Add New Member</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white rounded shadow-md"
      >
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Full Name"
            {...register("full_name")}
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm">{errors.full_name.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Weight"
            {...register("weight")}
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Passport URL"
            {...register("passport")}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.passport && (
            <p className="text-red-500 text-sm">{errors.passport.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <select
            {...register("subscription_id")}
            className="p-3 rounded-md border border-gray-300"
          >
            <option value="">Select a subscription</option>
            {subscriptions.map((subscription) => (
              <option key={subscription.id} value={subscription.id}>
                {subscription.plan_name}
              </option>
            ))}
          </select>
          {errors.subscription_id && (
            <p className="text-red-500 text-sm">
              {errors.subscription_id.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
