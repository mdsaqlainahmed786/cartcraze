interface CollectionProps {
  collectionImg: string;
  collectionName: string;
}
function CollectionComp({ collectionImg, collectionName }: CollectionProps) {
  return (
    <div className="w-[28vw] cursor-pointer transition-transform duration-300 hover:scale-110 md:w-64">
      <img
        className="h-48 rounded-md object-fill hover:opacity-90 md:h-96 lg:h-96"
        src={collectionImg}
        alt="mens"
      />
      <span className="w-full flex justify-center p-1 text-center md:text-2xl">{collectionName}</span>
    </div>
  );
}

export default CollectionComp;
