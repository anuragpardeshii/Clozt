import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Tag } from "lucide-react";
import PropTypes from "prop-types";
import { notifyShoppingChange } from "../shoppingEvents";

const initialAddress = { address: "", city: "", state: "", postalCode: "", country: "India" };
const formatPrice = (amount) => `₹${new Intl.NumberFormat("en-IN").format(amount)}`;

export default function PriceDetails({ cart, coupon, onOpenCoupons, onRemoveCoupon, step, onStepChange }) {
  const [shippingAddress, setShippingAddress] = useState(initialAddress);
  const [addressLabel, setAddressLabel] = useState("Home");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [saveNewAddress, setSaveNewAddress] = useState(true);
  const [makeDefault, setMakeDefault] = useState(false);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [addressError, setAddressError] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [checkoutKey] = useState(() => crypto.randomUUID());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart.products.length) return undefined;
    let active = true;
    setAddressesLoading(true);
    axios.get("/api/users/addresses", { withCredentials: true })
      .then(({ data }) => {
        if (!active) return;
        const addresses = data.addresses || [];
        setSavedAddresses(addresses);
        setSelectedAddressId((addresses.find((address) => address.isDefault) || addresses[0])?._id || "");
        setUseNewAddress(addresses.length === 0);
      })
      .catch(() => {
        if (active) {
          setAddressError("Saved addresses could not be loaded. You can still enter an address below.");
          setUseNewAddress(true);
        }
      })
      .finally(() => { if (active) setAddressesLoading(false); });
    return () => { active = false; };
  }, [cart.products.length]);

  if (!cart.products.length) return null;

  const hasUnselectedSize = cart.products.some((item) => !item.size);
  const totalMrp = cart.products.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const subtotal = cart.products.reduce((total, item) => {
    const price = item.product.listings?.includes("Sale") && item.product.salePrice != null
      ? item.product.salePrice : item.product.price;
    return total + price * item.quantity;
  }, 0);
  const itemCount = cart.products.reduce((total, item) => total + item.quantity, 0);
  const discount = coupon?.discount || 0;
  const total = Math.max(0, subtotal - discount);

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    if (!useNewAddress && !selectedAddressId) {
      setError("Select an address before placing your order.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      let addressId = selectedAddressId;
      if (useNewAddress && saveNewAddress) {
        const { data } = await axios.post("/api/users/addresses", {
          label: addressLabel, ...shippingAddress, isDefault: makeDefault,
        }, { withCredentials: true });
        addressId = data.addresses[data.addresses.length - 1]._id;
        setSavedAddresses(data.addresses);
        setSelectedAddressId(addressId);
        setUseNewAddress(false);
      }
      await axios.post("/api/orders/create", {
        ...(useNewAddress && !saveNewAddress ? { shippingAddress } : { addressId }),
        deliveryNotes, checkoutKey, couponCode: coupon?.code || undefined,
      });
      notifyShoppingChange();
      navigate("/orders", { state: { placed: true } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { name: "address", label: "Street address" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "postalCode", label: "Postal code" },
    { name: "country", label: "Country" },
  ];

  return (
    <aside className="rounded-xl border border-stone-200 bg-white p-6 lg:sticky lg:top-28">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Order overview</p>
      <h2 className="mt-1 text-xl font-semibold">The details</h2>

      <section className="mt-6 rounded-lg border border-stone-200 bg-[#f7f7f4] p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-sm font-medium"><Tag size={17} strokeWidth={1.7} aria-hidden="true" />{coupon ? coupon.code : "Have a coupon?"}</div>
          <button type="button" onClick={onOpenCoupons} className="text-xs font-semibold underline underline-offset-4 transition-colors hover:text-stone-500">{coupon ? "Change" : "Explore offers"}</button>
        </div>
        {coupon ? <p className="mt-2 pl-7 text-xs text-emerald-700">You save {formatPrice(discount)}. <button type="button" onClick={onRemoveCoupon} className="ml-2 underline">Remove</button></p> : <p className="mt-2 pl-7 text-xs text-stone-500">See offers available for your order.</p>}
      </section>

      <section className="pt-7">
        <h3 className="text-xs font-semibold text-stone-600">Summary · {itemCount} {itemCount === 1 ? "piece" : "pieces"}</h3>
        <dl className="mt-5 space-y-3 text-sm text-stone-600">
          <div className="flex justify-between gap-4"><dt>Subtotal</dt><dd>{formatPrice(totalMrp)}</dd></div>
          {totalMrp > subtotal && <div className="flex justify-between gap-4"><dt>Sale savings</dt><dd className="text-emerald-700">− {formatPrice(totalMrp - subtotal)}</dd></div>}
          {coupon && <div className="flex justify-between gap-4"><dt>Coupon savings</dt><dd className="text-emerald-700">− {formatPrice(discount)}</dd></div>}
          <div className="flex justify-between gap-4"><dt>Delivery</dt><dd className="text-emerald-700">On us</dd></div>
        </dl>
        <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-5"><span className="text-sm font-semibold">Total</span><span className="text-xl font-semibold">{formatPrice(total)}</span></div>
      </section>

      {step === "address" && (
        <section className="mt-6 border-t border-stone-200 pt-6">
          <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">Where should we send it?</h3><button type="button" onClick={() => onStepChange("bag")} className="text-xs font-medium underline underline-offset-4">Back to bag</button></div>
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-3">
            {addressError && <p role="alert" className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">{addressError}</p>}
            {addressesLoading ? <p className="text-xs text-stone-500">Loading saved addresses...</p> : savedAddresses.map((address) => (
              <label key={address._id} className={`flex cursor-pointer gap-3 rounded-lg border p-3 text-xs transition-colors ${!useNewAddress && selectedAddressId === address._id ? "border-[#202320] bg-[#f7f7f4]" : "border-stone-200 hover:border-stone-400"}`}>
                <input type="radio" name="savedAddress" checked={!useNewAddress && selectedAddressId === address._id} onChange={() => { setSelectedAddressId(address._id); setUseNewAddress(false); }} className="mt-0.5 accent-[#202320]" />
                <span className="min-w-0"><span className="font-semibold">{address.label} {address.isDefault && <span className="ml-1 text-stone-500">· Default</span>}</span><span className="mt-1 block leading-5 text-stone-600">{address.address}, {address.city}, {address.state} {address.postalCode}, {address.country}</span></span>
              </label>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1"><button type="button" onClick={() => setUseNewAddress(true)} className="text-xs font-semibold underline underline-offset-4">Use a new address</button><Link to="/addresses" className="text-xs text-stone-600 underline underline-offset-4">Manage saved addresses</Link></div>
            {useNewAddress && (
              <div className="space-y-3 border-t border-stone-200 pt-4">
                <p className="text-xs font-semibold">New delivery address</p>
                {saveNewAddress && <label className="block text-xs font-medium text-stone-600">Name this address<input value={addressLabel} onChange={(event) => setAddressLabel(event.target.value)} maxLength={40} required className="mt-1 block w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm focus:border-[#202320] focus:outline-none" /></label>}
                {fields.map(({ name, label }) => (
                  <label key={name} className="block text-xs font-medium text-stone-600">{label}
                    <input name={name} value={shippingAddress[name]} onChange={(event) => setShippingAddress({ ...shippingAddress, [name]: event.target.value })} className="mt-1 block w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm focus:border-[#202320] focus:outline-none" required />
                  </label>
                ))}
                <label className="flex items-center gap-2 text-xs text-stone-700"><input type="checkbox" checked={saveNewAddress} onChange={(event) => setSaveNewAddress(event.target.checked)} className="accent-[#202320]" /> Save this address for later</label>
                {saveNewAddress && <label className="flex items-center gap-2 text-xs text-stone-700"><input type="checkbox" checked={makeDefault} onChange={(event) => setMakeDefault(event.target.checked)} className="accent-[#202320]" /> Make this my default address</label>}
              </div>
            )}
            <label className="block text-xs font-medium text-stone-600">Delivery notes (optional)
              <textarea value={deliveryNotes} onChange={(event) => setDeliveryNotes(event.target.value)} rows={2} className="mt-1 block w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm focus:border-[#202320] focus:outline-none" />
            </label>
            <p className="text-xs text-stone-500">Payment on delivery · Cash on Delivery</p>
          </form>
        </section>
      )}
      {hasUnselectedSize && <p role="alert" className="mt-5 rounded-md bg-amber-50 px-3 py-2.5 text-xs text-amber-800">Choose a size for every piece to continue.</p>}
      {error && <p role="alert" className="mt-5 rounded-md bg-red-50 px-3 py-2.5 text-xs text-red-700">{error}</p>}
      {step === "bag" ? (
        <button type="button" onClick={() => onStepChange("address")} disabled={hasUnselectedSize} className="mt-6 w-full rounded-full bg-[#202320] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300">Continue to delivery</button>
      ) : (
        <button type="submit" form="checkout-form" disabled={submitting || addressesLoading || hasUnselectedSize} className="mt-6 w-full rounded-full bg-[#202320] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300">{submitting ? "Placing order..." : "Place order · Cash on Delivery"}</button>
      )}
      <p className="mt-3 text-center text-[11px] leading-5 text-stone-500">Your final total is confirmed when you place the order.</p>
    </aside>
  );
}

PriceDetails.propTypes = {
  cart: PropTypes.shape({ products: PropTypes.array.isRequired }).isRequired,
  coupon: PropTypes.shape({ code: PropTypes.string, discount: PropTypes.number }),
  onOpenCoupons: PropTypes.func.isRequired,
  onRemoveCoupon: PropTypes.func.isRequired,
  step: PropTypes.oneOf(["bag", "address"]).isRequired,
  onStepChange: PropTypes.func.isRequired,
};
