import ColorPicker from "./ColorPicker";
import ToolWrapper from "./ToolWrapper";

export default function Toolbar({
  setters,
}: {
  setters: { setColor: (color: string) => void };
}) {
  return (
    <section
      className="fixed left-5 top-5 h-[calc(100vh-2.5rem)]
        w-12 rounded-2xl"
    >
      <div className="h-full w-full gap-2">
        <ToolWrapper>
          <ColorPicker getColor={setters.setColor} />
        </ToolWrapper>
        <ToolWrapper></ToolWrapper>
      </div>
    </section>
  );
}
