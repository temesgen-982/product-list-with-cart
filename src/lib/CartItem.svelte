<script>
	let { cartItem } = $props();
</script>

<div>
	<h2>{cartItem.name}</h2>
	<p>{cartItem.quantity}x <span>{cartItem.price}</span></p>
</div>
