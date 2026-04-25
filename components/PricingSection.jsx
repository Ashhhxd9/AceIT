"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { PLANS } from "@/lib/data";

export default function PricingSection() {
  const { has, userId } = useAuth();
  const clerk = useClerk();

  const isSignedIn = !!userId;
  const isOnStarter = isSignedIn && has({ plan: "starter" });
  const isOnPro = isSignedIn && has({ plan: "pro" });
  const isOnFree = isSignedIn && !isOnStarter && !isOnPro;

  const activePlan = isOnPro
    ? "pro"
    : isOnStarter
    ? "starter"
    : isOnFree
    ? "free"
    : null;

  const handleCheckout = (planId) => {
    clerk.__internal_openCheckout({
      planId,
      planPeriod: "month",
      appearance: {
        elements: {
          drawerRoot: { zIndex: 2000 },
        },
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PLANS.map((plan) => {
        const isActive = activePlan === plan.slug;

        return (
          <div key={plan.name} className="relative group">
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl" />

            <div
              className={`relative rounded-2xl p-10 h-full flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 ${
                plan.featured
                  ? "bg-[#141417] border border-cyan-400/30 scale-[1.03] shadow-[0_0_40px_rgba(6,182,212,0.15)]"
                  : "bg-[#0f0f11] border border-white/10 hover:border-cyan-400/20"
              } ${isActive ? "ring-1 ring-cyan-400/30" : ""}`}
            >
              {/* Most Popular Badge */}
              {plan.featured && !isActive && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-black text-xs font-semibold tracking-wide px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              {/* Plan Name */}
              <p className="text-xs font-semibold text-stone-500 tracking-widest uppercase mb-5">
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-1.5">
                <span
                  className={`font-serif text-5xl leading-none tracking-tight ${
                    plan.featured
                      ? "bg-gradient-to-br from-cyan-300 to-cyan-500 bg-clip-text text-transparent"
                      : "bg-gradient-to-br from-stone-100 to-stone-400 bg-clip-text text-transparent"
                  }`}
                >
                  {plan.price}
                </span>
                <span className="text-sm text-stone-500 font-light mb-1.5">
                  /month
                </span>
              </div>

              {/* Credits */}
              <p className="text-sm text-cyan-400 mb-7">{plan.credits}</p>

              <div className="h-px bg-white/10 mb-7" />

              {/* Features */}
              <ul className="flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-stone-400 leading-relaxed"
                  >
                    <span className="text-cyan-400 text-xs mt-1">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8">
                {isActive ? (
                  <Button
                    variant={plan.featured ? "blue" : "default"}
                    disabled
                    className="w-full opacity-50 cursor-not-allowed"
                  >
                    ✓ Current Plan
                  </Button>
                ) : plan.planId === null ? (
                  isSignedIn ? (
                    <Button
                      variant="outline"
                      disabled
                      className="w-full opacity-50 cursor-not-allowed"
                    >
                      Default plan
                    </Button>
                  ) : (
                    <SignInButton mode="modal">
                      <Button
                        variant="outline"
                        className="w-full transition-all duration-300 hover:scale-[1.02]"
                      >
                        Get Started for Free
                      </Button>
                    </SignInButton>
                  )
                ) : isSignedIn ? (
                  <Button
                    variant={plan.featured ? "blue" : "outline"}
                    className={`w-full transition-all duration-300 hover:scale-[1.02] ${
                      plan.featured
                        ? "shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                        : ""
                    }`}
                    onClick={() => handleCheckout(plan.planId)}
                  >
                    {activePlan === "pro" && plan.slug === "starter"
                      ? "Downgrade"
                      : activePlan === "starter" && plan.slug === "pro"
                      ? "Upgrade →"
                      : "Get Started →"}
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button
                      variant={plan.featured ? "blue" : "outline"}
                      className="w-full transition-all duration-300 hover:scale-[1.02]"
                    >
                      Get Started →
                    </Button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}