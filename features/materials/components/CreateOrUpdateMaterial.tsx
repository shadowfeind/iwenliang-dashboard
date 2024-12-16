"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { ErrorComponent } from "@/components/ErrorComponent";
import { z } from "zod";
import { mode } from "@/config/types/mode.types";
import {
  createMaterial,
  updateMaterial,
} from "@/features/materials/material.action";
import { getMaterialById } from "@/features/materials/material.query";
import { materialSchema } from "../material.schema";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: mode;
  materialId?: string | null;
};

const CreateOrUpdateMaterial = ({
  isOpen,
  setIsOpen,
  mode,
  materialId,
}: Props) => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof materialSchema>>({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof materialSchema>) => {
    setError("");
    startTransition(() => {
      if (mode === "create") {
        const createValues = values;
        createMaterial(createValues).then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
            setIsOpen(false);
          }
        });
      }
      if (mode === "edit") {
        const updateValues = values as z.infer<typeof materialSchema>;
        updateMaterial(updateValues, materialId ?? "").then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
            setIsOpen(false);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (materialId && mode === "edit") {
      getMaterialById(materialId).then((data) => {
        if ("error" in data) {
          setError(data.error);
        } else {
          form.setValue("name", data.name ?? "");
        }
      });
    }
    // eslint-disable-next-line
  }, [mode, materialId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Material" : "Update Material"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <ErrorComponent message={error} />
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col space-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Stone name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isPending} className="mt-8" type="submit">
              {isPending
                ? "Loading...."
                : mode === "edit"
                ? "Update Stone"
                : "Create Stone"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdateMaterial;
