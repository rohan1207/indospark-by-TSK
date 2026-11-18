"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProductById } from "@/data/shopCatalog";

const CartWishlistContext = createContext(null);

const CART_KEY = "icfs-cart-v1";
const WISH_KEY = "icfs-wishlist-v1";
const COMPARE_KEY = "icfs-compare-v1";
export const COMPARE_MAX = 3;

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function normalizeToast(input) {
  if (input == null) return null;
  if (typeof input === "string") return { message: input };
  if (typeof input === "object" && input.message) return input;
  return { message: String(input) };
}

export function CartWishlistProvider({ children }) {
  const [cart, setCart] = useState([]); // [{ id, qty }]
  const [wishlist, setWishlist] = useState([]); // [id]
  const [compare, setCompare] = useState([]); // [id]
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setCart(readJson(CART_KEY, []));
    setWishlist(readJson(WISH_KEY, []));
    const savedCompare = readJson(COMPARE_KEY, []);
    setCompare(Array.isArray(savedCompare) ? savedCompare.slice(0, COMPARE_MAX) : []);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(COMPARE_KEY, JSON.stringify(compare));
  }, [compare, hydrated]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = window.setTimeout(() => setToast(null), 3800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((input) => setToast(normalizeToast(input)), []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const toggleCart = useCallback(() => setCartOpen((v) => !v), []);

  const addToCart = useCallback(
    (productId, qty = 1, { open = true } = {}) => {
      setCart((prev) => {
        const existing = prev.find((l) => l.id === productId);
        if (existing) {
          return prev.map((l) =>
            l.id === productId ? { ...l, qty: Math.min(999, l.qty + qty) } : l
          );
        }
        return [...prev, { id: productId, qty: Math.min(999, qty) }];
      });
      if (open) setCartOpen(true);
      const product = getProductById(productId);
      showToast(product ? `Added ${product.name}` : "Added to cart");
    },
    [showToast]
  );

  const setQty = useCallback((productId, qty) => {
    const next = Math.max(0, Math.min(999, Number(qty) || 0));
    setCart((prev) => {
      if (next <= 0) return prev.filter((l) => l.id !== productId);
      return prev.map((l) => (l.id === productId ? { ...l, qty: next } : l));
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((l) => l.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => {
        if (prev.includes(productId)) {
          showToast("Removed from wishlist");
          return prev.filter((id) => id !== productId);
        }
        showToast("Saved to wishlist");
        return [...prev, productId];
      });
    },
    [showToast]
  );

  const isWishlisted = useCallback((productId) => wishlist.includes(productId), [wishlist]);

  const isInCompare = useCallback((productId) => compare.includes(productId), [compare]);

  const addToCompare = useCallback(
    (productId) => {
      const product = getProductById(productId);

      if (compare.includes(productId)) {
        showToast({
          message: "Already in compare",
          actionHref: "/compare",
          actionLabel: "View",
        });
        return { ok: true, reason: "exists" };
      }

      if (compare.length >= COMPARE_MAX) {
        showToast({
          message: `Compare is full (${COMPARE_MAX} max)`,
          actionHref: "/compare",
          actionLabel: "Manage",
        });
        return { ok: false, reason: "full" };
      }

      setCompare((prev) =>
        prev.includes(productId) ? prev : [...prev, productId].slice(0, COMPARE_MAX)
      );

      showToast({
        message: product
          ? `Added ${product.shortName || product.name} to compare`
          : "Product added to compare",
        actionHref: "/compare",
        actionLabel: "View",
      });
      return { ok: true, reason: "added" };
    },
    [compare, showToast]
  );

  const removeFromCompare = useCallback(
    (productId) => {
      setCompare((prev) => prev.filter((id) => id !== productId));
      showToast("Removed from compare");
    },
    [showToast]
  );

  const toggleCompare = useCallback(
    (productId) => {
      if (compare.includes(productId)) {
        removeFromCompare(productId);
        return { ok: true, reason: "removed" };
      }
      return addToCompare(productId);
    },
    [compare, addToCompare, removeFromCompare]
  );

  const clearCompare = useCallback(() => {
    setCompare([]);
    showToast("Compare list cleared");
  }, [showToast]);

  const cartLines = useMemo(
    () =>
      cart
        .map((line) => {
          const product = getProductById(line.id);
          if (!product) return null;
          return {
            ...line,
            product,
            lineTotal: product.price * line.qty,
          };
        })
        .filter(Boolean),
    [cart]
  );

  const cartCount = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cartLines.reduce((n, l) => n + l.lineTotal, 0),
    [cartLines]
  );

  const wishlistProducts = useMemo(
    () => wishlist.map(getProductById).filter(Boolean),
    [wishlist]
  );

  const compareProducts = useMemo(
    () => compare.map(getProductById).filter(Boolean),
    [compare]
  );

  const value = {
    hydrated,
    cart,
    cartLines,
    cartCount,
    cartSubtotal,
    cartOpen,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    wishlist,
    wishlistProducts,
    wishlistCount: wishlist.length,
    toggleWishlist,
    isWishlisted,
    compare,
    compareProducts,
    compareCount: compare.length,
    compareMax: COMPARE_MAX,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    isInCompare,
    toast,
    showToast,
  };

  return (
    <CartWishlistContext.Provider value={value}>{children}</CartWishlistContext.Provider>
  );
}

export function useCartWishlist() {
  const ctx = useContext(CartWishlistContext);
  if (!ctx) {
    throw new Error("useCartWishlist must be used within CartWishlistProvider");
  }
  return ctx;
}

export function formatMoney(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}
