<script lang="ts">
	import { onMount } from 'svelte';
	import Products from '$lib/Products.svelte';
	import Cart from '$lib/Cart.svelte';

	type cartItem = {
		name: string;
		price: number;
		quantity: number;
	};
	let products = $state([]);
	let cartItems = $state<cartItem>([]);

	// increment or add
	function addToCart(productName: string) {
		const existingItem = cartItems.find((item) => item.name == productName);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			cartItems.push({
				name: productName,
				price: 0,
				quantity: 1
			});
		}
		console.log($state.snapshot(cartItems.find((i) => i.name === productName)));
	}

	// decrement or remove
	function removeFromCart(productName: string) {
		const existingItem = cartItems.find((item) => item.name === productName);

		if (!existingItem) return;

		if (existingItem.quantity > 1) {
			existingItem.quantity -= 1;
		} else {
			cartItems = cartItems.filter((item) => item.name !== productName);
		}
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

<main class="md:grid md:grid-cols-[3fr_1fr]">
	{#if products.length > 0}
		<Products {products} {addToCart} {cartItems} {removeFromCart} />
	{:else}
		<p>Products are loading...</p>
	{/if}
	<Cart {cartItems} />
</main>
