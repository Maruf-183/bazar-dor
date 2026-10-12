/* eslint-disable @next/next/no-img-element */

export default function Avatar({ user, size = 40 }) {
  const name = user?.name || "User";
  const initials = name.trim().charAt(0).toUpperCase();

  if (user?.image) {
    return (
      <img
        src={user.image}
        alt={name}
        className="rounded-lg object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-lg bg-brand text-white font-semibold"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}
