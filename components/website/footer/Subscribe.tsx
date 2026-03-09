"use client";

import { Input } from "@/components/ui/input";
import { createSubscriber } from "@/features/subscriber/subscriber.action";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubscribe = () => {
    if (!email) toast("Email is required");
    startTransition(() => {
      createSubscriber(email).then((data) => {
        if (data?.error) {
          toast(data.error);
        } else {
          setEmail("");
          toast("Subscribed successfully");
        }
      });
    });
  };

  return (
    <>
      <div className="w-full bg-neutral-950 py-20 text-white">
        <div className="mx-auto flex flex-col gap-y-6 justify-center items-center px-4">
          <h5 className="font-serif text-xl md:text-2xl font-medium tracking-[0.15em] text-center text-[#D4AF37]">
            JOIN OUR EXCLUSIVE LIST
          </h5>
          <div className="flex w-full md:w-5/12 max-w-md rounded-none shadow-sm">
            <Input
              id="input-21"
              className="flex-1 rounded-none border-neutral-800 bg-neutral-900/50 text-white placeholder:text-neutral-500 focus-visible:ring-[#D4AF37] focus-visible:border-transparent h-12 px-4"
              placeholder="Enter your email address"
              type="email"
              value={email}
              disabled={isPending}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              disabled={isPending}
              onClick={handleSubscribe}
              className="inline-flex h-12 items-center justify-center bg-[#D4AF37] border border-[#D4AF37] px-6 text-[13px] uppercase tracking-widest font-semibold text-black transition-colors hover:bg-[#b8962e] hover:border-[#b8962e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
          <p className="text-[11px] text-neutral-400 text-center tracking-wide mt-2">
            By subscribing you agree to our Terms & Conditions.
            <br /> You can unsubscribe at any time.
          </p>
        </div>
      </div>
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row justify-between items-center py-6 border-b border-gray-200">
        <div>
          <Image
            src={"/images/30daygurantee.png"}
            alt="master-card"
            height={90}
            width={90}
          />
        </div>
        <div>
          <Image
            src={"/images/fedex.png"}
            alt="fedex"
            height={35}
            width={113}
          />
        </div>

        <div>
          <Image
            src={"/images/Cards_logo.png"}
            alt="paypal"
            height={22}
            width={142}
          />
        </div>
      </div>
    </>
  );
};
