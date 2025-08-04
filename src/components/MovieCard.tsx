import { useState } from "react";
import { CircularProgress } from "./CircularProgress";

interface MovieCardProps {
  title: string;
  backgroundImage: string;
  rating: number;
  genres: string[];
  className?: string;
}

export default function MovieCard({
  title,
  backgroundImage,
  rating,
  genres,
  className = "",
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative h-96 w-64 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${backgroundImage})`,
        }}
      />

      <div className="to-mauvedark-1 absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-30%" />

      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-60"}`}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <CircularProgress value={rating} size={80} strokeWidth={6} />
        </div>
        <div className="text-center">
          <h3 className="text-mauve-1 mb-4 text-xl font-bold tracking-wide">
            {title}
          </h3>

          <div
            className={`transition-all duration-300 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <p className="text-mauve-1 text-sm">{genres.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
