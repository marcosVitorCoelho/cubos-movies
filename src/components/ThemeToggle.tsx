import { MoonIcon } from "./icons/MoonIcon";
import { SunIcon } from "./icons/SunIcon";
import { useTheme } from "../hooks/useTheme";

interface ThemeToggleProps {
  variant?: "button" | "dropdown";
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group bg-purple-3 hover:bg-purple-4 active:bg-purple-5 dark:bg-purpledarka-2 dark:hover:bg-purpledarka-4 dark:active:bg-purpledark-5 border-purple-6 dark:border-purpledark-6 text-purple-11 dark:text-purpledark-11 focus:ring-purple-9 focus:ring-offset-purple-1 dark:focus:ring-offset-purpledark-1 relative flex h-12 w-16 items-center justify-center rounded-sm border transition-all duration-200 ease-out focus:ring-2 focus:ring-offset-2 focus:outline-none ${className} `}
      aria-label={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
      title={`Alternar para tema ${theme === "dark" ? "claro" : "escuro"}`}
    >
      <div className="relative h-5 w-5">
        <SunIcon
          className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            theme === "dark"
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 rotate-90 opacity-0"
          } `}
        />
        <MoonIcon
          className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            theme === "dark"
              ? "scale-0 -rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          } `}
        />
      </div>

      <div className="bg-purple-9 absolute inset-0 rounded-lg opacity-0 transition-opacity duration-150 group-active:opacity-10" />
    </button>
  );
}
