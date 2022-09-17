import { ProductComment } from '../types';

const commentStorage = {
  get(productId: number) {
    return JSON.parse(localStorage.getItem(`comments-${productId}`) as string) || [];
  },
  save(productId: number, comment: ProductComment) {
    localStorage.setItem(
      `comments-${productId}`,
      JSON.stringify([...commentStorage.get(productId), comment])
    );
  },
};

export default commentStorage;
