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
      <div className="w-11/12 md:w-10/12 mx-auto bg-[#f5f5f5] py-16">
        <div className=" mx-auto flex flex-col gap-y-4 justify-center items-center">
          <h5 className="text-xs font-bold tracking-wider">
            FOR NEWS LETTER AND UPDATES
          </h5>
          <div className="flex w-10/12 md:w-3/12 rounded-lg shadow-xs shadow-black/5">
            <Input
              id="input-21"
              className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
              placeholder="Email"
              type="email"
              value={email}
              disabled={isPending}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              disabled={isPending}
              onClick={handleSubscribe}
              className="inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm font-medium text-foreground outline-offset-2 transition-colors hover:bg-accent hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Subscribing" : "Subscribe"}
            </button>
          </div>
          <p className="text-[12px] text-center">
            By Signing you agree with Terms & Conditions.
            <br /> To unsubscribe click the link in our email
          </p>
        </div>
      </div>
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row justify-between items-center py-2">
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
