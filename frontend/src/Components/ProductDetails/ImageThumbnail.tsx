interface ImageThumbNailProps {
  images: string[];
  setImage: (img: string) => void;
  selectedImage: string;
}
function ImageThumbnail({
  images,
  setImage,
  selectedImage,
}: ImageThumbNailProps) {
  return (
    <div className="hidden lg:flex mx-5 flex-col justify-center space-y-5 items-center">
      {images.map((img: string, index: number) => (
        <img
          key={index}
          onClick={() => setImage(img)}
          className={`w-20 rounded-md cursor-pointer ${
            selectedImage === img ? "border-2 border-black" : ""
          }`}
          src={img}
          alt={`Slide ${index}`}
        />
      ))}
    </div>
  );
}

export default ImageThumbnail;
