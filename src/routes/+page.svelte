<script lang="ts">
	import { onMount } from 'svelte';
	import Products from '$lib/Products.svelte';
	import Cart from '$lib/Cart.svelte';
	import OrderDialog from '$lib/OrderDialog.svelte';

	import type { Product } from '$lib/cart.svelte.ts';

	let products = $state<Product[]>([]);

	import { cartItems } from '$lib/cart.svelte.js';

	// show order confirmation modal
	let showOrderModal = $state(false);

	function showModal() {
		showOrderModal = !showOrderModal;
	}

	function closeModal() {
		showOrderModal = !showOrderModal;
		cartItems.length = 0; // clearing the cart
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
		<Products {products} />
	{:else}
		<p>Products are loading...</p>
	{/if}
	<Cart {showModal} />
	{#if showOrderModal}
		<OrderDialog {closeModal} />
	{/if}
</main>
