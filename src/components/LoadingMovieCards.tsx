import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingMovieCards() {
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <Skeleton
          key={i}
          className="bg-mauvedark-3 border-mauvedarka-9 h-[281px] w-[183px] rounded-sm border p-4 sm:h-[355px] sm:w-[235px]"
        ></Skeleton>
      ))}
    </>
  );
}
