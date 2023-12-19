export default function ToolbarPanel({ children }: React.PropsWithChildren) {
  return (
    <section
      className="fixed left-5 top-5 flex flex-col rounded-full border
      border-gray-300 bg-white px-1 py-2 shadow-xl"
    >
      <ul className="flex flex-col gap-2">{children}</ul>
    </section>
  );
}
