<script>
	import OrderItem from './OrderItem.svelte';
	let { closeModal, cartItems } = $props();
</script>

<div
	class="fixed top-0 right-0 left-0 flex h-screen w-screen items-end gap-2 rounded bg-black/60 md:items-center md:justify-center"
>
	<div
		class="flex w-full flex-col gap-8 rounded-t-3xl bg-white px-4 py-8 md:w-auto md:rounded-t md:rounded-b"
	>
		<div><img src="/assets/images/icon-order-confirmed.svg" alt="Order confirmed" /></div>
		<div class="flex flex-col gap-2">
			<h1 class="text-4xl font-bold text-rose-900">Order Confirmed</h1>
			<p class="text-rose-500">We hope you enjoy your food!</p>
		</div>
		<div class="rounded bg-rose-50 p-2">
			<div class="flex flex-col gap-2 p-2">
				{#each cartItems as cartItem (cartItem.name)}
					<OrderItem {cartItem} />
				{/each}
			</div>
			<div></div>
		</div>
		<button onclick={closeModal} class="bg-red rounded-full p-2 text-white">Start New Order</button>
	</div>
</div>
