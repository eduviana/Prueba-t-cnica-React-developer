import { useState } from "react";
import { Entry } from "../../../interfaces";
import imageNotFound from "../../../assets/Image-not-found.png";

interface PopupProps {
  onClose: () => void;
  data: Entry;
}

export function Popup({ data, onClose }: PopupProps) {
  const { title, description, releaseYear, images } = data;
  const [imageSrc, setImageSrc] = useState(images["Poster Art"].url);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[800px] relative">
        <button
          className="absolute top-1 right-1 text-red-600 text-xl cursor-pointer"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Contenedor principal con diseño adaptable */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Imagen */}
          <div className="w-full md:w-[40%] h-[300px] md:h-[500px] flex-shrink-0">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover rounded-lg"
              onError={() => setImageSrc(imageNotFound)}
            />
          </div>

          {/* Contenido */}
          <div className="flex-1">
           <div className="flex flex-col gap-4 md:gap-14">
           <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-2">{description}</p>
            <p className="text-gray-500">Año: {releaseYear}</p>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}
