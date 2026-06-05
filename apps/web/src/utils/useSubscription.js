import { useCallback, useEffect, useRef } from "react";
import { create } from "zustand";

const useSubscriptionStore = create((set, get) => ({
  status: null, // null = loading, true = subscribed, false = not subscribed
  statusStr: null, // raw stripe status: "active" | "trialing" | "none" | etc.
  loading: true,
  checkSubscription: async () => {
    if (!get().loading) return;
    try {
      const response = await fetch("/api/get-subscription-status", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to check subscription");
      const data = await response.json();
      const isActive = data.status === "active" || data.status === "trialing";
      set({ status: isActive, statusStr: data.status, loading: false });
    } catch (error) {
      console.error("Error checking subscription:", error);
      set({ status: false, statusStr: "error", loading: false });
    }
  },
  refetchSubscription: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/get-subscription-status", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to check subscription");
      const data = await response.json();
      const isActive = data.status === "active" || data.status === "trialing";
      set({ status: isActive, statusStr: data.status, loading: false });
      return isActive;
    } catch (error) {
      console.error("Error refetching subscription:", error);
      set({ loading: false });
      return false;
    }
  },
}));

export function useSubscription() {
  const { status, statusStr, loading, checkSubscription, refetchSubscription } =
    useSubscriptionStore();
  const pollingRef = useRef(null);

  // Check on mount
  useEffect(() => {
    checkSubscription();
  }, [checkSubscription]);

  // Poll after checkout (when session_id is in URL)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId && !status) {
      let attempts = 0;
      pollingRef.current = setInterval(async () => {
        attempts++;
        const isActive = await refetchSubscription();
        if (isActive || attempts >= 10) {
          clearInterval(pollingRef.current);
          // Remove session_id from URL without reload
          const url = new URL(window.location.href);
          url.searchParams.delete("session_id");
          window.history.replaceState({}, "", url.toString());
        }
      }, 2000);
    }

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const initiateSubscription = useCallback(async () => {
    try {
      const response = await fetch("/api/stripe-checkout-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ redirectURL: window.location.origin }),
      });
      if (!response.ok) throw new Error("Failed to get checkout link");
      const { url } = await response.json();
      if (url) {
        window.open(url, "_blank", "popup");
        // Start polling for subscription after opening popup
        let attempts = 0;
        const poll = setInterval(async () => {
          attempts++;
          const isActive = await refetchSubscription();
          if (isActive || attempts >= 30) clearInterval(poll);
        }, 3000);
      }
    } catch (error) {
      console.error("Subscription initiation error:", error);
    }
  }, [refetchSubscription]);

  const manageSubscription = useCallback(async () => {
    try {
      const response = await fetch("/api/stripe-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnURL: window.location.origin }),
      });
      if (!response.ok) throw new Error("Failed to open portal");
      const { url } = await response.json();
      if (url) {
        window.open(url, "_blank", "popup");
      }
    } catch (error) {
      console.error("Manage subscription error:", error);
    }
  }, []);

  return {
    isSubscribed: status,
    statusStr,
    loading,
    initiateSubscription,
    manageSubscription,
    refetchSubscription,
  };
}

export default useSubscription;
