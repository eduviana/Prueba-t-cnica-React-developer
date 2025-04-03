import { useState } from "react";
import { Entry } from "../../interfaces";
import imageNotFound from "../../assets/Image-not-found.png";
import { Popup } from "./popup";

interface EntryCardProps {
  entry: Entry;
}

export function EntryCard({ entry }: EntryCardProps) {
  const { images, title } = entry;

  const [imageSrc, setImageSrc] = useState(images["Poster Art"].url);
  const [showPopup, setShowPopup] = useState(false);

  const toggleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div className="flex flex-col w-full  cursor-pointer transition-all">
        <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center border-2 border-transparent hover:border-gray-600">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageSrc(imageNotFound)}
          />
        </div>
        <div className="mt-2 capitalize" onClick={toggleShowPopup}>
          {title}
        </div>
      </div>

      {showPopup && <Popup data={entry} onClose={toggleShowPopup}/>}
    </>
  );
}
