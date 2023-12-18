export default function WelcomeMessage({ username }: { username: string }) {
  return (
    <div className="flex w-full justify-center p-10">
      <h2 className="text-xl">{`Welcome ${username}!`}</h2>
    </div>
  );
}
