export default function ToolWrapper({
  children,
  ...props
}: React.PropsWithChildren & React.HTMLProps<HTMLLIElement>) {
  return (
    <li
      {...props}
      className="flex aspect-square w-12 items-center justify-center overflow-hidden
            rounded-[1.5rem] border border-gray-300  shadow hover:bg-blue-200
            hover:shadow-blue-200"
    >
      {children}
    </li>
  );
}
