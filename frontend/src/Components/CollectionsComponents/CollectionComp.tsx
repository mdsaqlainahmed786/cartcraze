interface CollectionProps {
  collectionImg: string;
  collectionName: string;
}
function CollectionComp({ collectionImg, collectionName }: CollectionProps) {
  return (
    <div className="flex flex-col object-cover justify-center items-center transition-transform duration-300 hover:scale-110 hover:opacity-90 hover:cursor-pointer">
     <img className="rounded-md h-44 max-h-72 md:h-56" src={collectionImg} alt={collectionName}/>
     <div className="text-sm m-1">
      {collectionName}
     </div>
    </div>
  );
}

export default CollectionComp;
