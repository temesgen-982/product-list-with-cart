import { CHAPA_SECRET_KEY } from '$env/static/private';
import { getTransaction, updateTransactionStatus } from '$lib/server/store';

export async function GET({ url }) {

    const tx_ref = url.searchParams.get('tx_ref');

    if (!tx_ref) {
        return new Response('Missing transaction reference', { status: 400 });
    }

    // 1. Check local store first
    const transaction = getTransaction(tx_ref);
    if (transaction && transaction.status === 'success') {
        console.log(`[VERIFY] Transaction ${tx_ref} already marked as success in store.`);
        return new Response(JSON.stringify({ message: "Payment verified (cached)." }), { status: 200 });
    }

    const chapaVerifyUrl = `https://api.chapa.co/v1/transaction/verify/${tx_ref}`;

    try {
        const response = await fetch(chapaVerifyUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
            },
        });

        const result = await response.json();

        if (response.ok && result.data.status === 'success') {
            // database update
            console.log(`VERIFICATION SUCCESS for TX: ${tx_ref}. Amount: ${result.data.amount}`);

            // Update store if not already updated
            updateTransactionStatus(tx_ref, 'success');

            return new Response(JSON.stringify({ message: "Verification received and processed." }), { status: 200 });

        } else {
            // failed/pending status
            console.error(`VERIFICATION FAILED for TX: ${tx_ref}. Status: ${result.data.status}`);
            updateTransactionStatus(tx_ref, 'failed');
            return new Response('Verification failed.', { status: 200 });
        }
    } catch (err) {
        console.error('Verification Handler Server Error:', err);
        return new Response('Server error during verification.', { status: 500 });
    }
}
