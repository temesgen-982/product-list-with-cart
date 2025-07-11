<script>
	let { cartItem } = $props();
</script>

<div class="flex gap-3">
	<div class="h-10 w-10">
		<img class="rounded" src={cartItem.thumbnail} alt="{cartItem.name} thumbnail " />
	</div>
	<div class="flex grow flex-col">
		<p>{cartItem.name}</p>
		<p class="flex gap-2">
			<span class="text-red">{cartItem.quantity}X</span>
			<span class="text-rose-500">{cartItem.price}</span>
		</p>
	</div>
	<div>
		<p class="text-rose-900">{cartItem.quantity * cartItem.price}</p>
	</div>
</div>
