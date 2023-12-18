export default function LeaveRoom({
  onLeaveRoom,
}: {
  onLeaveRoom: () => void;
}) {
  return (
    <button
      className="fixed right-5 top-5 h-10 w-40 border bg-white shadow"
      onClick={onLeaveRoom}
    >
      Leave room
    </button>
  );
}
