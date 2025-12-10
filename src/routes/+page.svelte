<script lang="ts">
	import Products from '$lib/Products.svelte';
	import Cart from '$lib/Cart.svelte';
	import OrderDialog from '$lib/OrderDialog.svelte';

	import type { Product } from '$lib/cart.svelte.ts';

	let products = $state<Product[]>([]);

  let { data } = $props();
  products = data.items;

	import { cartItems } from '$lib/cart.svelte.js';

	// show order confirmation modal
	let showOrderModal = $state(false);

	function showModal() {
		showOrderModal = !showOrderModal;
	}

	function closeModal() {
		showOrderModal = !showOrderModal;
	}

</script>

<main class="bg-rose-50 md:grid md:grid-cols-[5fr_2fr]">
	{#if data.items.length > 0}
		<Products {products} />
	{:else}
		<p>Products are loading...</p>
	{/if}
	<Cart {showModal} />
	{#if showOrderModal}
		<OrderDialog {closeModal} />
	{/if}
</main>
