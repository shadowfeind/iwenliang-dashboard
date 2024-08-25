"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { deleteUser } from "@/actions/userActions";
import { ErrorComponent } from "../ErrorComponent";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
};

const DeleteUser = ({ isOpen, setIsOpen, userId }: Props) => {
  const [error, setError] = useState("");
  const [isDeleting, startDelete] = useTransition();
  const handleDelete = () => {
    startDelete(() => {
      deleteUser(userId ?? "").then((data) => {
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

export default DeleteUser;
