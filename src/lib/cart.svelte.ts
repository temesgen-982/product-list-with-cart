export interface Product {
	image: {
		mobile: string;
		tablet: string;
		desktop: string;
		thumbnail: string;
	};
	name: string;
	category: string;
	price: number;
}

export interface CartItem {
	name: string;
	price: number;
	quantity: number;
	thumbnail: string;
}

export const cartItems = $state<CartItem[]>([]);

// add a product to the cart
export function addToCart(product: Product) {
    const existingItem = cartItems.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            name: product.name,
            price: product.price,
            quantity: 1,
            thumbnail: product.image.thumbnail
        });
    }
}

// remove a product from the cart
export function removeFromCart(productName: string) {
	const index = cartItems.findIndex((item) => item.name == productName);
	if (index > -1) {
		cartItems.splice(index, 1);
	}
}

// increment quantity of a product in the cart
export function increment(productName: string) {
	const item = cartItems.find((item) => item.name === productName);
	if (item) {
		item.quantity += 1;
	}
}

// decrements quantity
export function decrement(productName: string) {
	const item = cartItems.find((item) => item.name === productName);
	if (item) {
		if (item.quantity > 1) {
			item.quantity -= 1;
		} else {
			removeFromCart(productName);
		}
	}
}

// clear all products
export function clearCart() {
    cartItems.splice(0, cartItems.length);
}
