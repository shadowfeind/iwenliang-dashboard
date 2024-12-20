import React from "react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  name: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn("mx-auto max-w-xl", className)}>
      <ol role="list" className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li key={step.id} className="flex-1">
            <StepItem
              step={step}
              stepNumber={index + 1}
              status={
                index < currentStep
                  ? "complete"
                  : index === currentStep
                  ? "current"
                  : "upcoming"
              }
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface StepItemProps {
  step: Step;
  stepNumber: number;
  status: "complete" | "current" | "upcoming";
}

function StepItem({ step, stepNumber, status }: StepItemProps) {
  return (
    <div className="group flex flex-col items-center  pt-2 pb-0">
      <StepCircle status={status} stepNumber={stepNumber} />
      <div className="mt-2 text-center">
        <span className="mt-1 block text-sm font-medium">{step.name}</span>
      </div>
    </div>
  );
}

interface StepCircleProps {
  status: "complete" | "current" | "upcoming";
  stepNumber: number;
}

function StepCircle({ status, stepNumber }: StepCircleProps) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full",
        status === "complete" ? "bg-muted text-muted-foreground" : "",
        status === "current" ? "bg-primary text-primary-foreground" : "",
        status === "upcoming" ? "border border-slate-300" : ""
      )}
    >
      {status === "complete" ? (
        <CheckIcon className="h-5 w-5" />
      ) : (
        <span className="text-sm font-medium">{stepNumber}</span>
      )}
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
