import { PropsWithChildren } from "react";

export default function ToolWrapper({ children }: PropsWithChildren) {
  return (
    <div className="aspect-square w-full  rounded-full border bg-white p-0.5 shadow-md">
      <div className="aspect-square w-full overflow-hidden rounded-full">
        {children}
      </div>
    </div>
  );
}
