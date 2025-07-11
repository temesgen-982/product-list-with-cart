<script lang="ts">
	import Product from '$lib/Product.svelte';

	let {
		products,
		addToCart,
		removeFromCart,
		cartItems,
		increment,
		decrement
	}: {
		products: { name: string; [key: string]: any }[]; // An array of objects, each with at least a 'name' string.
		addToCart: (product: {
			image: {
				mobile: string;
				tablet: string;
				desktop: string;
				thumbnail: string;
			};
			name: string;
			category: string;
			price: number;
		}) => void;
		removeFromCart: (productName: string) => void;
		cartItems: { name: string; quantity: number; [key: number | string]: any }[];
		increment: (productName: string) => void;
		decrement: (productName: string) => void;
	} = $props();
</script>

<div class="grid gap-2 p-2">
	<h1 class="text-2xl text-rose-900">Deserts</h1>
	<div class="grid gap-4 md:grid-cols-3">
		{#each products as product (product.name)}
			{@const cartItem = cartItems.find((item) => item.name == product.name)}
			<Product {product} {increment} {decrement} {addToCart} {cartItem} {removeFromCart} />
		{/each}
	</div>
</div>
