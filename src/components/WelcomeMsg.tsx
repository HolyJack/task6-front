export default function WelcomeMessage({ username }: { username: string }) {
  return <h2 className="text-xl">{`Welcome, ${username}!`}</h2>;
}
