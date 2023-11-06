import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <header className="flex justify-between py-4 items-center border-b-gray-400 border-b">
      <ModeToggle />
      <h1 className="text-3xl font-semibold">Noble Qur'an</h1>
    </header>
  )
}