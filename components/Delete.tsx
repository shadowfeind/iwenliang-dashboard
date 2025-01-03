"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { ErrorComponent } from "@/components/ErrorComponent";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
  action: (userId: string) => Promise<void | {
    error: string;
  }>;
};

const Delete = ({ isOpen, setIsOpen, userId, action }: Props) => {
  const [error, setError] = useState("");
  const [isDeleting, startDelete] = useTransition();
  const handleDelete = () => {
    startDelete(() => {
      action(userId ?? "").then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          setIsOpen(false);
        }
      });
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Are You Sure You Want To Delete?</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex gap-2 p-2">
          <ErrorComponent message={error} />
          <form action={handleDelete}>
            <Button type="submit">
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </form>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
