import { Link } from "react-router";

interface CategoryCardProps {
  text: string;
}

export function CategoryCard({ text }: CategoryCardProps) {
  return (
    <Link to={`/${text}`}>
      <div className="flex flex-col">
        <div className="bg-black w-40 h-60 flex items-center justify-center">
          <div className="bg-[url('/src/assets/placeholder.png')] bg-cover bg-center bg-no-repeat w-20 h-40 flex items-center justify-center">
            <h3 className="uppercase font-bold text-3xl text-white">{text}</h3>
          </div>
        </div>
        <h4 className="mt-2 capitalize">Popular {text}</h4>
      </div>
    </Link>
  );
}
