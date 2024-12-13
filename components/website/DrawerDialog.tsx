import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useState } from "react";

type DrawerDialogProps = {
  children: React.ReactNode;
  mobile: boolean;
  title: string;
  style?: string;
};
export function DrawerDialog({
  children,
  mobile,
  title,
  style,
}: DrawerDialogProps) {
  const [open, setOpen] = useState(false);

  if (!mobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={cn("w-full", style)} variant="secondary">
            {title}
          </Button>
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent className="max-w-4xl">{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className={cn("w-full", style)} variant="secondary">
          {title}
        </Button>
      </DrawerTrigger>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
