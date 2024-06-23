import ReactImageMagnify from "react-image-magnify";
interface ImageProps {
  imageSrc: string;
}
function ImageMagnifier({ imageSrc }: ImageProps) {
  return (
    <div className="image-magnifier-container" style={{ position: "relative" }}>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Product Image",
            isFluidWidth: true,
            src: imageSrc,
          },
          largeImage: {
            src: imageSrc,
            width: 1200,
            height: 1800,
          },
          lensStyle: {
            display: "none", // Hide the lens
          },
          enlargedImageContainerDimensions: {
            width: "200%",
            height: "100%",
          },
          enlargedImageContainerStyle: {
            border: "1px solid #ccc",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 10,
            left: "100%", // Position the enlarged image to the right
          },
          isHintEnabled: true,
          hintTextMouse: "Hover to Zoom",
          shouldUsePositiveSpaceLens: false,
        }}
      />
    </div>
  );
}

export default ImageMagnifier;
