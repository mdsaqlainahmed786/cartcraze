// import { useState, useEffect } from 'react';
// import { toast } from "react-hot-toast";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { wishlistState } from "./RecoilStateProviders/WishListCount";
// import { wishlistLikedState } from "./RecoilStateProviders/WishListCount";

// function useWishList(product) {
//   const [wishlistCount, setWishlistCount] = useRecoilState(wishlistState);
//   const [wishlistLiked, setWishlistLiked] = useRecoilState(wishlistLikedState);
//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
//     const wishListItem = existingWishlist.find((item) => item.title === product.title);
//     if (wishListItem) {
//       setLiked(true);
//     } else {
//       setLiked(!!wishlistLiked[product.title]);
//     }
//   }, [product.title, wishlistLiked]);

//   const onLikeHandler = async () => {
//     const newItem = {
//       title: product.title,
//       imageSrc: product.imageSrc,
//       category: product.category,
//       oldPrice: product.oldPrice,
//       newPrice: product.newPrice,
//       likeState: !liked,
//     };
//     const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

//     if (!liked) {
//       toast.success("Product added to wishlist", {
//         style: {
//           border: "1px solid black",
//           padding: "16px",
//           color: "black",
//           marginTop: "75px",
//         },
//         iconTheme: {
//           primary: "black",
//           secondary: "white",
//         },
//       });
//       existingWishlist.push(newItem);
//       localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
//       setWishlistLiked((prev) => ({ ...prev, [product.title]: true }));
//     } else {
//       const filteredWishlist = existingWishlist.filter(
//         (item) => item.title !== product.title
//       );
//       localStorage.setItem("wishlist", JSON.stringify(filteredWishlist));
//       toast.success("Product removed from wishlist", {
//         style: {
//           border: "1px solid black",
//           padding: "16px",
//           color: "black",
//           marginTop: "75px",
//         },
//         iconTheme: {
//           primary: "black",
//           secondary: "white",
//         },
//       });
//       setWishlistLiked((prev) => {
//         const { [product.title]: _, ...rest } = prev;
//         return rest;
//       });
//     }

//     setWishlistCount(existingWishlist.length);
//   };

//   return { liked, onLikeHandler };
// }

// export default useWishList;
