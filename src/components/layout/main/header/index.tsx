const Header = () => {
  return (
    <header className="py-4 px-8">
        <div className="grid grid-cols-12 items-center gap-4">
          <div className="col-span-2">
            <span className="animate-pulse text-2xl">ini search</span>
          </div>
          <div className="col-span-8 flex justify-center">
          </div>
          <div className="col-span-2 flex justify-end">
            ini icon
          </div>
        </div>
    </header>
  );
};

export default Header;
