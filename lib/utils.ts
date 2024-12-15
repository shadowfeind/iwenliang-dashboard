import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// creates an array of objects with value and label for multiselect component
export const multiSelectNameCreator = (result: any, errorToSet: any) => {
  if ("error" in result) {
    errorToSet = result.error;
    return;
  }

  return result.map((value: any) => {
    return { value: value._id, label: value.name };
  });
};

export const isMobile = (breakpoint: number = 600): boolean => {
  if (typeof window === "undefined") return false;

  return window.innerWidth < breakpoint;
};
