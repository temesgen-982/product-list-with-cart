<script>
	import CartItem from './CartItem.svelte';
	let { cartItems } = $props();
</script>

<div class="flex flex-col gap-2 p-2">
	<h1 class="text-red text-2xl">Your Cart</h1>
	<div class="flex flex-col gap-2">
		{#each cartItems as cartItem (cartItem.name)}
			<CartItem {cartItem} />
		{/each}
	</div>
</div>
