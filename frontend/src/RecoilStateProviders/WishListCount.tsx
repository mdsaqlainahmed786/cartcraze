import { atom } from 'recoil';

const getWishlistCount = () => {
  const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  return storedWishlist.length;
};

export const wishlistState = atom({
  key: 'wishlistState',
  default: getWishlistCount(),
});
