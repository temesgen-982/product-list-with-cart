<script>
    import { page } from '$app/state';

    const status = page.url.searchParams.get('payment'); 
    const tx_ref = page.url.searchParams.get('tx_ref');

    let message = $state('Checking transaction status...');

    if (status === 'success') {
        message = 'Payment successful! We are confirming your order now.';
    } else if (status === 'failed') {
        message = 'Payment failed. Please try again or contact support.';
    } else {
        message = 'Transaction pending or status unknown.';
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <h1 class="text-3xl font-bold mb-4">Payment Status</h1>
    <p class="text-xl mb-6">{message}</p>

    {#if tx_ref}
        <p class="text-gray-600">Reference: {tx_ref}</p>
    {/if}

    <a href="/" class="mt-6 rounded-full bg-red-600 px-6 py-2 text-white font-semibold hover:bg-red-700 transition-colors">
        Go back to Home
    </a>
    
    <p class="mt-8 text-sm text-gray-500">
        You may close this window, but please wait a moment for your order confirmation email.
    </p>
</div>
