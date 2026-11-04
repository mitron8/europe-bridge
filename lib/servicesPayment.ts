import { useAppStore } from '@/store/useAppStore';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ServiceCheckoutOptions {
  planKey: string;
  studentInputs?: Record<string, any>;
  returnUrl?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
  onAuthRequired?: (redirectUrl: string) => void;
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/** Check if there is a pending service booking stored in session */
export function getPendingServiceOrder() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem('pending_service_order');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearPendingServiceOrder() {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem('pending_service_order');
  } catch {
    // Ignore storage issues
  }
}

/**
 * Initiates the complete Service Order Checkout:
 * 1. Checks if user is authenticated. If not, preserves form in sessionStorage & redirects to login.
 * 2. If authenticated, requests order creation from backend.
 * 3. Opens official Razorpay modal.
 * 4. Verifies HMAC payment signature upon completion.
 */
export async function startServiceCheckout({
  planKey,
  studentInputs = {},
  returnUrl,
  onSuccess,
  onError,
  onAuthRequired,
}: ServiceCheckoutOptions) {
  try {
    const { user } = useAppStore.getState();

    // 1. Force Login Check
    if (!user || !user.email) {
      if (typeof window !== 'undefined') {
        const currentPath = returnUrl || (window.location.pathname + window.location.hash);
        sessionStorage.setItem(
          'pending_service_order',
          JSON.stringify({
            planKey,
            studentInputs,
            redirectUrl: currentPath,
            savedAt: Date.now(),
          }),
        );

        const loginRedirect = `/login?redirect=${encodeURIComponent(currentPath)}`;
        if (onAuthRequired) {
          onAuthRequired(loginRedirect);
        } else {
          window.location.href = loginRedirect;
        }
      }
      return { status: 'AUTH_REQUIRED' };
    }

    // 2. Load Razorpay Script
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      throw new Error('Payment gateway failed to load. Please check your internet connection.');
    }

    // 3. Create Order on Backend
    const orderRes = await fetch(`${NEXT_PUBLIC_API_URL}/service-orders/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        planKey,
        studentInputs,
      }),
    });

    if (!orderRes.ok) {
      const errData = await orderRes.json().catch(() => ({}));
      throw new Error(errData.message || 'Unable to initiate payment order');
    }

    const orderData = await orderRes.json();

    // 4. If no active Razorpay public key is configured or order booked without upfront charge:
    // The service request is recorded in database with status 'BOOKED' / payment_status 'UNPAID'.
    if (!orderData.keyId || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || orderData.orderId?.startsWith('order_dev_')) {
      clearPendingServiceOrder();
      const resultData = {
        success: true,
        message: 'Service booked successfully! Your counselor will review your requirements.',
        order: orderData,
      };
      if (onSuccess) onSuccess(resultData);
      return { status: 'SUCCESS', data: resultData };
    }

    // 5. Open Real Razorpay Modal if payment keys are active
    return new Promise((resolve) => {
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'EuropeBridge',
        description: orderData.plan?.title || 'Service Plan Order',
        order_id: orderData.orderId,
        prefill: {
          name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || undefined,
          email: user.email,
        },
        theme: {
          color: '#16161a',
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch(`${NEXT_PUBLIC_API_URL}/service-orders/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) {
              const errJson = await verifyRes.json().catch(() => ({}));
              throw new Error(errJson.message || 'Payment verification failed');
            }

            const verifyData = await verifyRes.json();
            clearPendingServiceOrder();
            if (onSuccess) onSuccess(verifyData);
            resolve({ status: 'SUCCESS', data: verifyData });
          } catch (verifyErr: any) {
            if (onError) onError(verifyErr);
            resolve({ status: 'ERROR', error: verifyErr });
          }
        },
        modal: {
          ondismiss: function () {
            resolve({ status: 'CANCELLED' });
          },
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.open();
    });
  } catch (error: any) {
    if (onError) onError(error);
    return { status: 'ERROR', error };
  }
}

/**
 * Submit Partner Lead (Blocked Account, Education Loan, Health Insurance, Forex)
 */
export async function submitPartnerLead(leadData: Record<string, any>) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/service-orders/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to submit inquiry');
  }

  return res.json();
}
