import type { ReactNode } from "react";

export default function CardsContainer({ children }: { children: ReactNode }) {
  return (
    <div className="dark:bg-mauvedarka-2 bg-mauvea-5 mx-auto mt-8 grid max-w-[1322px] grid-cols-2 gap-4 rounded-sm p-4 sm:gap-6 sm:p-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {children}
    </div>
  );
}
