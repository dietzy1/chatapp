import { Code, Code2 } from "lucide-react";

function Navbar() {
  return (
    <>
      <nav className="flex items-center ">
        <Code className="my-auto h-6 w-6 text-orange-300" />

        <span className="bg-gradient-to-b from-orange-200  to-orange-600 bg-clip-text text-center font-sans text-lg  font-bold text-transparent ">
          Chatapp
        </span>
        <Code2 className="my-auto h-6 w-6 text-orange-400" />
      </nav>
    </>
  );
}

export default Navbar;
