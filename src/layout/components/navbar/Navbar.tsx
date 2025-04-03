export function Navbar() {
  return (
    <nav className="custom-container flex items-center justify-between mx-auto py-2">
      <h1 className="text-white w-[100px] text-2xl md:w-fit md:text-3xl font-semibold">DEMO Streaming</h1>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button className="text-white font-semibold">Log In</button>
        <button className="bg-gray-600 text-white px-2 sm:px-3 py-1 font-semibold">Start your free trial</button>
      </div>
    </nav>
  );
}
