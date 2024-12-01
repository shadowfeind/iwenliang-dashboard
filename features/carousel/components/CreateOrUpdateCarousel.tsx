"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { mode } from "@/config/types/mode.types";
import { createCarousel, updateCarousel } from "../carouse.action";
import { getCarouselById } from "../carouse.query";
import ImageUpload from "@/components/ImageUpload";
import { ErrorComponent } from "@/components/ErrorComponent";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: mode;
  carouselId?: string | null;
};

const CreateOrUpdateCarousel = ({
  isOpen,
  setIsOpen,
  mode,
  carouselId,
}: Props) => {
  const [error, setError] = useState("");
  const [image, setImage] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    setError("");
    if (!image.length) {
      setError("Image is required");
      return;
    }
    startTransition(() => {
      if (mode === "create") {
        createCarousel({ image: image[0] }).then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            setIsOpen(false);
          }
        });
      }
      if (mode === "edit") {
        updateCarousel({ image: image[0] }, carouselId ?? "").then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            setIsOpen(false);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (carouselId && mode === "edit") {
      getCarouselById(carouselId).then((data) => {
        if ("error" in data) {
          setError(data.error);
        } else {
          setImage([data.image]);
        }
      });
    }
    // eslint-disable-next-line
  }, [mode, carouselId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Carousel" : "Update Carousel"}
          </DialogTitle>
        </DialogHeader>
        <div className="my-4">
          <ErrorComponent message={error} />
          <ImageUpload
            size={2}
            maxFiles={1}
            mode={mode}
            images={image}
            setImages={setImage}
          />
        </div>
        <Button
          disabled={isPending}
          onClick={handleSubmit}
          className="mt-8"
          type="submit"
        >
          {isPending
            ? "Loading...."
            : mode === "edit"
            ? "Update Carousel"
            : "Create Carousel"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdateCarousel;
