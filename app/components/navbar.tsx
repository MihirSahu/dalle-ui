const Navbar = () => {

  return(
    <div className="flex flex-row w-full justify-between p-10 text-black">
      <div className="font-bold">DALLE UI</div>
      <div className="flex flex-row space-x-10">
        <button className="text-darkGray">API Key</button>
        <button className="text-darkGray">History</button>
      </div>
    </div>
  );
}

export default Navbar;