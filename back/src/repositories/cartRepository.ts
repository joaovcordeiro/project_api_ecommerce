import { prisma } from "../config/database.js";
import { CartCreateData } from "../services/cartService.js";

export async function insert(cart: CartCreateData) {
  await prisma.cart.create({
    data: {
      user_id: cart.user_id,
      product_id: cart.product_id,
      quantity: cart.quantity,
      price: cart.price,
    },
  });
}

export async function getAll(user_id: number) {
  return await prisma.cart.findMany({
    where: {
      user_id: user_id,
    },
    include: {
      product: true,
    },
  });
}

export async function getById(cart_id: number) {
  return await prisma.cart.findUnique({
    where: {
      id: cart_id,
    },
  });
}

export async function incrementProduct(cartId: number) {
  await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      quantity: {
        increment: 1,
      },
    },
  });
}

export async function decrementProduct(cartId: number) {
  await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  });
}

export async function deleteProduct(cartId: number) {
  await prisma.cart.delete({
    where: {
      id: cartId,
    },
  });
}

export async function deleteAllProducts(user_id: number) {
  await prisma.cart.deleteMany({
    where: {
      user_id: user_id,
    },
  });
}

export async function totalPrice(user_id: number) {
  const totalPrice = await prisma.cart.aggregate({
    where: {
      user_id: user_id,
    },
    _sum: {
      price: true,
    },
  });

  return totalPrice;
}
