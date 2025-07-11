<script lang="ts">
	import Product from '$lib/Product.svelte';

	import type { Product as ProductType } from '$lib/cart.svelte.js';

	let { products }: { products: ProductType[] } = $props();
</script>

<div class="grid gap-2 p-2 md:gap-4 md:p-8">
	<h1 class="text-2xl text-rose-900">Deserts</h1>
	<div class="grid gap-4 md:grid-cols-3">
		{#each products as product (product.name)}
			<Product {product} />
		{/each}
	</div>
</div>
