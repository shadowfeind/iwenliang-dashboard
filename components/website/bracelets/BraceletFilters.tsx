"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filters } from "./BraceletClientPage";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader, Sparkles } from "lucide-react";

type Props = {
  filters: Filters;
  handleFilters: () => void;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filtersData: Filters;
  handleResetFilters: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

const BraceletFilters = ({
  filters,
  handleFilters,
  setFilters,
  filtersData,
  handleResetFilters,
  open,
  setOpen,
  loading,
}: Props) => {
  const sections = [
    {
      title: "Categories",
      items: filters?.categories,
      selected: filtersData.categories,
      key: "categories" as const,
    },
    {
      title: "Bead Sizes",
      items: filters?.beadSizes,
      selected: filtersData.beadSizes,
      key: "beadSizes" as const,
    },
    {
      title: "Stones",
      items: filters?.materials,
      selected: filtersData.materials,
      key: "materials" as const,
    },
    {
      title: "Colors",
      items: filters?.colors,
      selected: filtersData.colors,
      key: "colors" as const,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="h-12 rounded-full border-black/10 bg-[#fbf8f2] px-5"
        >
          Filter Bracelets
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-full max-w-md border-r-black/10 bg-[linear-gradient(180deg,_#fffaf2_0%,_#ffffff_100%)] px-0"
      >
        <SheetHeader>
          <div className="border-b border-black/8 px-6 pb-5 pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#f8f0d5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a5c12]">
              <Sparkles className="h-3.5 w-3.5" />
              Refine selection
            </div>
            <SheetTitle className="mt-4 text-left font-serif text-3xl text-neutral-950">
              Select the bracelet details you want to see.
            </SheetTitle>
            <p className="mt-3 text-left text-sm leading-6 text-neutral-600">
              Combine material, color, size, and category filters, then apply
              them to refresh the catalogue.
            </p>
          </div>
        </SheetHeader>
        {loading ? (
          <div className="mt-6 flex items-center px-6">
            <Loader className="w-4 h-4 animate-spin" /> Fetching
          </div>
        ) : (
          <div className="space-y-5 overflow-y-auto px-6 py-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-[24px] border border-black/8 bg-white/80 p-4 shadow-[0_12px_40px_-32px_rgba(15,23,42,0.4)]"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-neutral-950">
                    {section.title}
                  </span>
                  <span className="rounded-full bg-[#f6f0e2] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
                    {section.selected.length} selected
                  </span>
                </div>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <label
                      key={item._id}
                      htmlFor={item._id}
                      className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-transparent bg-[#faf8f3] px-3 py-3 transition hover:border-black/10 hover:bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={item._id}
                          checked={section.selected.some(
                            (selectedItem) => selectedItem._id === item._id
                          )}
                          onCheckedChange={(checked) => {
                            setFilters((prev) => {
                              if (checked) {
                                const isAlreadySelected = prev[
                                  section.key
                                ].some((selectedItem) => selectedItem._id === item._id);

                                return isAlreadySelected
                                  ? prev
                                  : {
                                      ...prev,
                                      [section.key]: [...prev[section.key], item],
                                    };
                              }

                              return {
                                ...prev,
                                [section.key]: prev[section.key].filter(
                                  (selectedItem) => selectedItem._id !== item._id
                                ),
                              };
                            });
                          }}
                        />
                        <span className="text-sm font-medium text-neutral-800">
                          {item.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-2 border-t border-black/8 px-6 py-5">
          <Button size={"sm"} onClick={handleFilters} variant={"default"}>
            Apply filters
          </Button>
          <Button
            size={"sm"}
            onClick={handleResetFilters}
            variant={"outline"}
          >
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BraceletFilters;
