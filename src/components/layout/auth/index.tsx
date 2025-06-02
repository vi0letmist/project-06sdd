"use client";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative grid-cols-2 flex w-100 h-screen">
      <div className="col-span-1 bg-rose-100 w-1/2 flex items-end py-12 px-12">
        <span className="text-sm">
          © {new Date().getFullYear()} jaffarjjati.
        </span>
      </div>
      <div
        className={`col-span-1 flex-1 flex flex-col transition-all duration-300 w-1/2`}
      >
        <main className="flex-1 pt-20 pb-12 pl-12 pr-8 mr-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
