import { CartItem } from './../redux/slices/cartSlice';

// подсчитывает итоговую стоимость объектов в корзине
export const CalcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, object) => object.price * object.count + sum, 0);
};
