import { CubosLogo } from "@/components/icons/CubosIcon";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-mauve-6 dark:border-mauvedarka-6 dark:bg-mauvedark-1 bg-mauvea-1 flex h-20 w-full items-center-safe justify-between border-b p-4 transition-all duration-200 ease-in-out">
      <div className="flex w-fit items-center-safe gap-3">
        <CubosLogo className="dark:text-mauvedark-12 text-mauve-12 h-9 w-[160px]" />
        <strong className="dark:text-mauvedark-12 text-mauve-12">Movies</strong>
      </div>
      <ThemeToggle />
    </header>
  );
}
