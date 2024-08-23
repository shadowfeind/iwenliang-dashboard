"use client";

import { useState, useTransition } from "react";

export const ChangePassword = () => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  return <div>ChangePassword</div>;
};
