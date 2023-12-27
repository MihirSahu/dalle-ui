import Link from "next/link";

const Navbar = () => {

  return(
    <div className="flex flex-row w-full justify-between p-10 text-black">
      <Link href='\' className="font-bold">DALLE UI</Link>
      <div className="flex flex-row space-x-10">
        <button className="text-darkGray hover:text-black">About</button>
        <Link href="\login" className="text-darkGray hover:text-black">Log in</Link>
      </div>
    </div>
  );
}

export default Navbar;