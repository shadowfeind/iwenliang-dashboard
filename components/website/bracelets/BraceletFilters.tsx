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
import { Loader } from "lucide-react";

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
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setOpen(true)} variant="outline">
          Filter Bracelets
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Select to filter bracelets</SheetTitle>
        </SheetHeader>
        {loading ? (
          <div className="mt-4 flex items-center">
            <Loader className="w-4 h-4 animate-spin" /> Fetching
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-2 mb-3">
              <span className=" text-sm font-bold text-black">Categories</span>

              {filters?.categories.map((category) => (
                <div key={category._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category._id}
                    checked={filtersData.categories.some(
                      (selectedColor) => selectedColor._id === category._id
                    )}
                    onCheckedChange={(checked) => {
                      setFilters((prev) => {
                        if (checked) {
                          const isAlreadySelected = prev.categories.some(
                            (c) => c._id === category._id
                          );
                          return isAlreadySelected
                            ? prev
                            : {
                                ...prev,
                                categories: [...prev.categories, category],
                              };
                        } else {
                          return {
                            ...prev,
                            categories: prev.categories.filter(
                              (c) => c._id !== category._id
                            ),
                          };
                        }
                      });
                    }}
                  />
                  <label
                    htmlFor={category._id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-2 mb-3">
              <span className=" text-sm font-bold text-black">Bead Sizes</span>
              {filters?.beadSizes.map((beadSize) => (
                <div key={beadSize._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={beadSize._id}
                    value={beadSize._id}
                    checked={filtersData.beadSizes.some(
                      (selectedBeadSize) =>
                        selectedBeadSize._id === beadSize._id
                    )}
                    onCheckedChange={(checked) => {
                      setFilters((prev) => {
                        if (checked) {
                          const isAlreadySelected = prev.beadSizes.some(
                            (c) => c._id === beadSize._id
                          );
                          return isAlreadySelected
                            ? prev
                            : {
                                ...prev,
                                beadSizes: [...prev.beadSizes, beadSize],
                              };
                        } else {
                          return {
                            ...prev,
                            beadSizes: prev.beadSizes.filter(
                              (c) => c._id !== beadSize._id
                            ),
                          };
                        }
                      });
                    }}
                  />
                  <label
                    htmlFor={beadSize._id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {beadSize.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-2 mb-3">
              <span className=" text-sm font-bold text-black">Stones</span>
              {filters?.materials.map((material) => (
                <div key={material._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={material._id}
                    value={material._id}
                    checked={filtersData.materials.some(
                      (selectedColor) => selectedColor._id === material._id
                    )}
                    onCheckedChange={(checked) => {
                      setFilters((prev) => {
                        if (checked) {
                          const isAlreadySelected = prev.materials.some(
                            (c) => c._id === material._id
                          );
                          return isAlreadySelected
                            ? prev
                            : {
                                ...prev,
                                materials: [...prev.materials, material],
                              };
                        } else {
                          return {
                            ...prev,
                            materials: prev.materials.filter(
                              (c) => c._id !== material._id
                            ),
                          };
                        }
                      });
                    }}
                  />
                  <label
                    htmlFor={material._id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {material.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-2 mb-3">
              <span className=" text-sm font-bold text-black">Colors</span>
              {filters?.colors.map((color) => (
                <div key={color._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={color._id}
                    value={color._id}
                    checked={filtersData.colors.some(
                      (selectedColor) => selectedColor._id === color._id
                    )}
                    onCheckedChange={(checked) => {
                      setFilters((prev) => {
                        if (checked) {
                          const isAlreadySelected = prev.colors.some(
                            (c) => c._id === color._id
                          );
                          return isAlreadySelected
                            ? prev
                            : {
                                ...prev,
                                colors: [...prev.colors, color],
                              };
                        } else {
                          return {
                            ...prev,
                            colors: prev.colors.filter(
                              (c) => c._id !== color._id
                            ),
                          };
                        }
                      });
                    }}
                  />
                  <label
                    htmlFor={color._id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {color.name}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex gap-2 mt-4">
          <Button size={"sm"} onClick={handleFilters} variant={"default"}>
            Filter Bracelet
          </Button>
          <Button
            size={"sm"}
            onClick={handleResetFilters}
            variant={"destructive"}
          >
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BraceletFilters;
