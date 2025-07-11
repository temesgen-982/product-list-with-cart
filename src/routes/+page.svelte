<script lang="ts">
	import { onMount } from 'svelte';
	import Products from '$lib/Products.svelte';
	import Cart from '$lib/Cart.svelte';
	import OrderDialog from '$lib/OrderDialog.svelte';

	type CartItem = {
		name: string;
		price: number;
		quantity: number;
		thumbnail: string;
	};

	type Product = {
		image: {
			mobile: string;
			tablet: string;
			desktop: string;
			thumbnail: string;
		};
		name: string;
		category: string;
		price: number;
	};

	let products = $state<Product[]>([]);
	let cartItems = $state<CartItem[]>([]);

	// show order modal
	let showOrderModal = $state(false);

	function showModal() {
		showOrderModal = !showOrderModal;
	}

	function closeModal() {
		showOrderModal = !showOrderModal;
		cartItems = [];
	}

	// add a product to the cart
	function addToCart(product: Product) {
		cartItems.push({
			name: product.name,
			price: product.price,
			quantity: 1,
			thumbnail: product.image.thumbnail
		});
	}

	// increment quantity
	function increment(productName: string) {
		const item = cartItems.find((item) => item.name === productName);
		if (item) {
			item.quantity += 1;
		}
	}

	// decrements quantity. Does nothing if quantity is 1.
	function decrement(productName: string) {
		const item = cartItems.find((item) => item.name === productName);
		if (item) {
			item.quantity > 1 ? (item.quantity -= 1) : removeFromCart(productName);
		}
	}

	// remove a product from the cart
	function removeFromCart(productName: string) {
		cartItems = cartItems.filter((item) => item.name !== productName);
	}

	onMount(async () => {
		try {
			const response = await fetch('/data.json');
			const data = await response.json();
			products = data;
		} catch (error) {
			console.error('error fetching products : ', error);
		}
	});
</script>

<main class="bg-rose-50 md:grid md:grid-cols-[5fr_2fr]">
	{#if products.length > 0}
		<Products {products} {addToCart} {cartItems} {increment} {decrement} {removeFromCart} />
	{:else}
		<p>Products are loading...</p>
	{/if}
	<Cart {cartItems} {removeFromCart} {showModal} />
	{#if showOrderModal}
		<OrderDialog {closeModal} {cartItems} />
	{/if}
</main>
