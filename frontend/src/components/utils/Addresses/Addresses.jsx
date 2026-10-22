import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { MapPin, Plus } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import AccountPageHeader from '../AccountPageHeader';
import CloztLoader from '../../CloztLoader';

const emptyAddress = { label: "Home", address: "", city: "", state: "", postalCode: "", country: "India" };
const fields = [
  { name: "label", label: "Name this address", maxLength: 40 },
  { name: "address", label: "Street address", maxLength: 200 },
  { name: "city", label: "City", maxLength: 80 },
  { name: "state", label: "State", maxLength: 80 },
  { name: "postalCode", label: "Postal code", maxLength: 20 },
  { name: "country", label: "Country", maxLength: 80 },
];

export default function Addresses() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [draft, setDraft] = useState(emptyAddress);
  const [editingId, setEditingId] = useState(null);
  const [makeDefault, setMakeDefault] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    let active = true;
    axios.get("/api/users/addresses", { withCredentials: true })
      .then(({ data }) => { if (active) setAddresses(data.addresses || []); })
      .catch(() => { if (active) setError("Could not load your addresses."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [isAuthenticated]);

  if (authLoading) return <main className="mx-auto max-w-6xl px-4 py-16"><CloztLoader label="Checking your account" /></main>;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: "/addresses" }} replace />;

  const resetForm = () => {
    setDraft(emptyAddress);
    setEditingId(null);
    setMakeDefault(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const path = editingId ? `/api/users/addresses/${editingId}` : "/api/users/addresses";
      const { data } = await axios({ method: editingId ? "put" : "post", url: path, data: { ...draft, isDefault: makeDefault }, withCredentials: true });
      setAddresses(data.addresses);
      setMessage(editingId ? "Address updated." : "Address saved.");
      resetForm();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not save this address.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (address) => {
    setDraft(Object.fromEntries(fields.map(({ name }) => [name, address[name] || ""])));
    setEditingId(address._id);
    setMakeDefault(address.isDefault);
    setError("");
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDefault = async (addressId) => {
    setBusyId(addressId);
    setError("");
    try {
      const { data } = await axios.patch(`/api/users/addresses/${addressId}/default`, {}, { withCredentials: true });
      setAddresses(data.addresses);
      setMessage("Default address updated.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not change your default address.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm("Remove this saved address?")) return;
    setBusyId(addressId);
    setError("");
    try {
      const { data } = await axios.delete(`/api/users/addresses/${addressId}`, { withCredentials: true });
      setAddresses(data.addresses);
      if (editingId === addressId) resetForm();
      setMessage("Address removed.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not remove this address.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#202320]">
      <AccountPageHeader eyebrow="Clozt / Your account" title="Saved addresses" description="Keep your delivery details ready for your next order." badge={`${addresses.length} saved ${addresses.length === 1 ? 'address' : 'addresses'}`} />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">Your addresses</p><h2 className="mt-1 text-xl font-semibold">Delivery book</h2></div><Link to="/cart" className="text-xs font-semibold text-stone-600 underline underline-offset-4 hover:text-[#202320]">Back to bag</Link></div>
        {error && <p role="alert" className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {message && <p role="status" className="mb-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</p>}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
          <section aria-label="Saved addresses">
            {loading ? <CloztLoader label="Loading addresses" /> : addresses.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {addresses.map((address) => (
                  <article key={address._id} className="rounded-xl border border-stone-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-400 hover:shadow-md">
                    <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2"><MapPin size={17} aria-hidden="true" /><h2 className="text-sm font-semibold">{address.label}</h2></div>{address.isDefault && <span className="rounded-full bg-[#202320] px-2.5 py-1 text-[10px] font-semibold text-white">Default</span>}</div>
                    <p className="mt-4 text-sm leading-6 text-stone-600">{address.address}<br />{address.city}, {address.state} {address.postalCode}<br />{address.country}</p>
                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-stone-100 pt-4 text-xs font-semibold">
                      <button type="button" onClick={() => handleEdit(address)} className="hover:underline" disabled={busyId === address._id}>Edit</button>
                      {!address.isDefault && <button type="button" onClick={() => handleDefault(address._id)} className="hover:underline" disabled={busyId === address._id}>Make default</button>}
                      <button type="button" onClick={() => handleDelete(address._id)} className="text-stone-500 hover:text-red-700 hover:underline" disabled={busyId === address._id}>Remove</button>
                    </div>
                  </article>
                ))}
              </div>
            ) : <div className="rounded-xl border border-stone-200 bg-white px-6 py-14 text-center"><MapPin size={30} className="mx-auto text-stone-400" aria-hidden="true" /><p className="mt-3 text-sm font-semibold">No saved addresses yet</p><p className="mt-1 text-xs text-stone-500">Add one to make checkout faster.</p></div>}
          </section>
          <section className="h-fit rounded-xl border border-stone-200 bg-white p-6 lg:sticky lg:top-24" aria-label={editingId ? "Edit address" : "Add address"}>
            <div className="flex items-center gap-2"><Plus size={18} aria-hidden="true" /><h2 className="text-lg font-semibold">{editingId ? "Edit address" : "Add an address"}</h2></div>
            <form onSubmit={handleSave} className="mt-5 space-y-3">
              {fields.map(({ name, label, maxLength }) => (
                <label key={name} className="block text-xs font-medium text-stone-600">{label}
                  <input value={draft[name]} onChange={(event) => setDraft({ ...draft, [name]: event.target.value })} maxLength={maxLength} required className="mt-1 block w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm text-[#202320] focus:border-[#202320] focus:outline-none" />
                </label>
              ))}
              <label className="flex items-center gap-2 pt-1 text-xs text-stone-700"><input type="checkbox" checked={makeDefault} onChange={(event) => setMakeDefault(event.target.checked)} className="accent-[#202320]" /> Make this my default address</label>
              <div className="flex gap-3 pt-2"><button type="submit" disabled={saving} className="rounded-full bg-[#202320] px-6 py-2.5 text-xs font-semibold text-white hover:bg-stone-700 disabled:opacity-50">{saving ? "Saving..." : editingId ? "Save changes" : "Save address"}</button>{editingId && <button type="button" onClick={resetForm} className="text-xs font-semibold text-stone-600 underline underline-offset-4">Cancel</button>}</div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
