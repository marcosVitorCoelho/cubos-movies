import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="dark:bg-mauvedark-1 bg-mauvea-1 flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow flex-col">
        <div className="relative w-full flex-1 bg-cover dark:bg-[url(./assets/background.png)]">
          <div className="dark:to-mauvedark-1 dark:via-mauvedark-1 absolute inset-0 bg-gradient-to-b from-transparent via-80%" />
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
