import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  style?: string;
};

const StaticContentContainer = ({ children, style }: Props) => {
  return (
    <div className={cn("max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12", style)}>
      {children}
    </div>
  );
};

export default StaticContentContainer;
