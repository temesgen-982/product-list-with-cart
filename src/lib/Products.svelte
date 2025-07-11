<script lang="ts">
	import Product from '$lib/Product.svelte';

	let {
		products,
		addToCart,
		removeFromCart,
		cartItems
	}: {
		products: { name: string; [key: string]: any }[]; // An array of objects, each with at least a 'name' string.
		addToCart: (productName: string) => void;
		removeFromCart: (productName: string) => void;
		cartItems: { name: string; quantity: number }[]; // An array of objects with a 'name' and 'quantity'.
	} = $props();
</script>

<div class="grid gap-2 p-2">
	<h1 class="text-red text-2xl">Deserts</h1>
	<div class="grid gap-2 md:grid-cols-3">
		{#each products as product (product.name)}
			{@const cartItem = cartItems.find((item) => item.name == product.name)}
			<Product {product} {addToCart} {cartItem} {removeFromCart} />
		{/each}
	</div>
</div>
