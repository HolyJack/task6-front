import { useState } from "react";

export default function SubmitUsername({
  onSubmit,
}: {
  onSubmit: (username: string) => void;
}) {
  const [enteredName, setEnteredName] = useState("");
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(enteredName);
  }

  return (
    <div className="flex w-full justify-center p-10">
      <form onSubmit={submitForm} className=" flex gap-2">
        <input
          type="text"
          className="border p-2 shadow"
          value={enteredName}
          onChange={(e) => setEnteredName(e.target.value)}
          placeholder="Enter your username"
        />
        <button
          type="submit"
          className="h-10 w-20 border shadow hover:bg-black/10"
        >
          OK
        </button>
      </form>
    </div>
  );
}
