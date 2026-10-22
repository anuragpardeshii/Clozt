import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Tag, X } from "lucide-react";

const formatPrice = (amount) => `₹${new Intl.NumberFormat("en-IN").format(amount)}`;

export default function CouponModal({ open, coupons, subtotal, appliedCoupon, onClose, onPreview, onApply }) {
  const [code, setCode] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    setCode(appliedCoupon?.code || "");
    setPreview(appliedCoupon);
    setError("");
    inputRef.current?.focus();
    const handleEscape = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, appliedCoupon, onClose]);

  if (!open) return null;

  const checkCoupon = async (couponCode) => {
    setChecking(true);
    setError("");
    try {
      const result = await onPreview(couponCode);
      setCode(result.code);
      setPreview(result);
    } catch (requestError) {
      setPreview(null);
      setError(requestError.response?.data?.message || "Could not check this coupon.");
    } finally {
      setChecking(false);
    }
  };

  const available = coupons.filter((coupon) => subtotal >= coupon.minimumSpend);
  const locked = coupons.filter((coupon) => subtotal < coupon.minimumSpend);
  const offerText = (coupon) => `${coupon.kind === "percent" ? `${coupon.value}% off` : `${formatPrice(coupon.value)} off`}${coupon.maxDiscount != null ? ` up to ${formatPrice(coupon.maxDiscount)}` : ""}${coupon.minimumSpend > 0 ? ` on bags over ${formatPrice(coupon.minimumSpend)}` : " on your bag"}`;

  const couponRow = (coupon, disabled) => (
    <button
      key={coupon._id}
      type="button"
      disabled={disabled || checking}
      onClick={() => checkCoupon(coupon.code)}
      aria-pressed={preview?.code === coupon.code}
      className={`w-full border-b border-stone-100 px-6 py-5 text-left transition-colors last:border-b-0 ${disabled ? "cursor-not-allowed opacity-50" : "hover:bg-[#f7f7f4]"}`}
    >
      <span className="flex items-start gap-3">
        <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${preview?.code === coupon.code ? "border-[#202320] bg-[#202320] text-white" : "border-stone-300"}`}>{preview?.code === coupon.code ? "✓" : ""}</span>
        <span className="min-w-0">
          <span className="inline-block rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-[#202320]">{coupon.code}</span>
          <span className="mt-2 block text-sm font-semibold text-[#202320]">{offerText(coupon)}</span>
          <span className="mt-1 block text-xs text-stone-500">Expires {new Date(coupon.expiresAt).toLocaleDateString()}</span>
          {disabled && <span className="mt-2 block text-xs font-medium text-stone-600">Add {formatPrice(Math.ceil(coupon.minimumSpend - subtotal))} more to unlock</span>}
        </span>
      </span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="coupon-title" className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-[#202320] px-6 py-5 text-white">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400">Clozt offers</p><h2 id="coupon-title" className="mt-1 text-lg font-semibold">Find your offer</h2></div>
          <button type="button" onClick={onClose} aria-label="Close coupon dialog" className="rounded-full p-1.5 text-stone-300 hover:bg-white/10 hover:text-white"><X size={20} /></button>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); if (code.trim()) checkCoupon(code.trim().toUpperCase()); }} className="flex gap-3 border-b border-stone-100 px-6 py-5">
          <input ref={inputRef} value={code} onChange={(event) => { setCode(event.target.value.toUpperCase()); setPreview(null); setError(""); }} placeholder="Enter coupon code" aria-label="Coupon code" className="min-w-0 flex-1 rounded-md border border-stone-300 px-3 py-2.5 text-sm focus:border-[#202320] focus:outline-none" />
          <button type="submit" disabled={checking || !code.trim()} className="text-xs font-semibold text-[#202320] underline underline-offset-4 disabled:opacity-40">Check</button>
        </form>
        {error && <p role="alert" className="px-6 pt-3 text-xs font-medium text-red-700">{error}</p>}
        <div className="overflow-y-auto">
          <div className="bg-[#f7f7f4] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-600">Ready to use</div>
          {available.length ? available.map((coupon) => couponRow(coupon, false)) : <p className="px-6 py-5 text-sm text-stone-500">No available offers right now. Enter a code above to check it.</p>}
          {locked.length > 0 && <div className="bg-[#f7f7f4] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-600">More offers</div>}
          {locked.map((coupon) => couponRow(coupon, true))}
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-stone-200 px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-stone-600"><Tag size={16} /><span>{preview ? <>You save <strong className="text-[#202320]">{formatPrice(preview.discount)}</strong></> : "Choose a coupon"}</span></div>
          <button type="button" onClick={() => { if (preview) onApply(preview); }} disabled={!preview || checking} className="min-w-32 rounded-full bg-[#202320] px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300">Apply coupon</button>
        </div>
      </div>
    </div>
  );
}

CouponModal.propTypes = {
  open: PropTypes.bool.isRequired,
  coupons: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    kind: PropTypes.oneOf(["percent", "fixed"]).isRequired,
    value: PropTypes.number.isRequired,
    minimumSpend: PropTypes.number.isRequired,
    maxDiscount: PropTypes.number,
    expiresAt: PropTypes.string.isRequired,
  })).isRequired,
  subtotal: PropTypes.number.isRequired,
  appliedCoupon: PropTypes.shape({ code: PropTypes.string, discount: PropTypes.number }),
  onClose: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};
