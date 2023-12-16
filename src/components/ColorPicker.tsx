import { useRef, useState } from "react";

export default function ColorPicker({
  getColor,
}: {
  getColor?: (color: string) => void;
}) {
  const [color, setColor] = useState("#000000");
  const ref = useRef<HTMLInputElement>(null);

  return (
    <button
      className="aspect-square w-full "
      style={{ backgroundColor: color }}
      onClick={() => ref.current?.click()}
    >
      <input
        ref={ref}
        className="absolute left-1/2 top-0 scale-0"
        type="color"
        onChange={(e) => {
          setColor(e.target.value);
          getColor && getColor(e.target.value);
        }}
      />
    </button>
  );
}
