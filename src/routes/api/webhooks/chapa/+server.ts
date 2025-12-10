import { CHAPA_WEBHOOK_SECRET } from '$env/static/private';
import * as crypto from 'crypto';
import { updateTransactionStatus, getTransaction } from '$lib/server/store';

export async function POST({ request }) {
    const rawBody = await request.text();
    const signature = request.headers.get('x-chapa-signature');

    // verify webhook signature
    if (!signature) {
        console.error('Webhook Error: Missing x-chapa-signature header.');
        return new Response('Missing signature', { status: 401 });
    }

    // Calculate the expected signature hash
    const calculatedHash = crypto.createHmac('sha256', CHAPA_WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex');

    if (calculatedHash !== signature) {
        console.error('Webhook Error: Invalid signature.');
        return new Response('Invalid signature', { status: 401 });
    }

    let event;
    try {
        event = JSON.parse(rawBody);
    } catch (e) {
        console.error('Webhook Error: Invalid JSON body.');
        return new Response('Invalid JSON', { status: 400 });
    }

    const { event: eventType, reference: tx_ref, status, amount } = event;

    if (eventType === 'charge.success') {

        const transaction = getTransaction(tx_ref);

        if (!transaction) {
            console.warn(`[WEBHOOK] Transaction not found in store: ${tx_ref}`);
            // In a real app, you might create it or log an error.
        } else if (transaction.status === 'success') {
            console.log(`[WEBHOOK] Transaction already processed: ${tx_ref}`);
            return new Response(null, { status: 200 });
        } else {
            // Verify amount (simple check)
            if (transaction.amount !== parseFloat(amount)) {
                console.error(`[WEBHOOK] Amount mismatch for ${tx_ref}. Expected: ${transaction.amount}, Got: ${amount}`);
                // Handle partial payment or error
            }

            updateTransactionStatus(tx_ref, 'success');
            console.log(`[CHAPA WEBHOOK SUCCESS] TxRef: ${tx_ref} marked as PAID.`);
        }

    } else if (eventType === 'charge.failed') {
        updateTransactionStatus(tx_ref, 'failed');
        console.warn(`[CHAPA WEBHOOK FAILED] TxRef: ${tx_ref}. Status: ${status}`);
    } else {
        // Log other events like Payouts if necessary
        console.log(`[CHAPA WEBHOOK] Received event type: ${eventType}`);
    }

    // 5. Acknowledge the event by returning a 200 OK
    return new Response(null, { status: 200 });
}
