'use client';

import { useCreatePropertyMutation } from '@/features/manageHotels/manageHotelsApi';
import { motion } from "framer-motion";
import { CloudUpload, Loader2, MapPin, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Label } from '../../../../../components/ui/label';

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    state?: string;
    postcode?: string | number | null;
    country?: string;
  };
}

const inputStyle = { borderColor: "#F2F2F2", color: "#2C2E33", backgroundColor: "#FAFAFA" };

const STRUCTURE_TYPES = [
  'house', 'apartment', 'villa', 'penthouse', 'office',
  'shop', 'warehouse', 'hotel', 'resort', 'guest_house',
  'treehouse', 'houseboat', 'farmhouse',
];

const AMENITIES_LIST = [
  'Free WiFi', 'Indoor Pool', 'Gym', 'Full Spa', 'Fine Dining',
  'Lounge Bar', 'Parking Space', 'Garden/Landscaping', 'Room Service',
  'Air Conditioning', 'Breakfast Included', 'Conference Room',
  'Laundry Service', '24h Front Desk', 'Pet Friendly',
];

const inputCls = 'w-full h-12 bg-[#F5F5F5] rounded-[10px] px-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] border-none outline-none focus:ring-1 focus:ring-[#F1913D]';
const selectCls = 'w-full h-12 bg-[#F5F5F5] rounded-[10px] px-4 text-[14px] text-[#2C2E33] border-none outline-none focus:ring-1 focus:ring-[#F1913D] cursor-pointer appearance-none';
const labelCls = 'text-[14px] font-medium text-[#2C2E33] block mb-2';

/* ── Layout helpers ──────────────────────────────────────────── */
function Section({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl shadow-sm p-6 space-y-5"
    >
      <h2 className="text-base font-bold" style={{ color: "#2C2E33" }}>{title}</h2>
      {children}
    </motion.div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium" style={{ color: "#2C2E33" }}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
}

export default function AddHotelPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createProperty, { isLoading }] = useCreatePropertyMutation();

  // Form state
  const [title, setTitle] = useState('');
  const [structureType, setStructureType] = useState('hotel');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [imageError, setImageError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const toggleAmenity = (item: string) => {
    setAmenities(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const invalid = files.find(f => !f.type.startsWith('image/'));
    if (invalid) { setImageError('Only image files are allowed.'); return; }
    const oversized = files.find(f => f.size > 10 * 1024 * 1024);
    if (oversized) { setImageError('Each image must be under 10MB.'); return; }
    setImageError('');
    setImages(prev => [...prev, ...files.map(file => ({ file, preview: URL.createObjectURL(file) }))]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (idx: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { toast.error('Title is required'); return; }
    if (!price || isNaN(Number(price))) { toast.error('Valid price is required'); return; }
    if (images.length === 0) { toast.error('Please upload at least one image'); return; }
    if (!street || !city || !country) { toast.error('Please select a valid address from the suggestions'); return; }

    try {
   
      const fd = new FormData();

      // Basic info
      fd.append('structureType', structureType);
      fd.append('title', title.trim());
      fd.append('description', description.trim());
      fd.append('price', String(Number(price)));

      // Amenities - sending each as a separate field with the same name
      amenities.forEach(a => fd.append('amenities', a));

      // Address object structure in FormData
      fd.append('address[street]', String(street.trim()));
      fd.append('address[city]', String(city.trim()));
      fd.append('address[state]', String(state.trim()));
      // Force postalCode to be a string even if backend tries to parse it
      // by ensuring it's not purely numeric? No, better to just make sure we
      // are sending a string and the backend handles it
      const postalCodeValue = postalCode.trim();
      fd.append('address[postalCode]', String(postalCodeValue));
      fd.append('address[country]', String(country.trim()));

      // Location coordinates structure
      if (latitude !== null && longitude !== null) {
        fd.append('location[coordinates][0]', String(latitude));
        fd.append('location[coordinates][1]', String(longitude));
      }

      // Multiple images
      images.forEach(img => fd.append('image', img.file));

      // Debug: log FormData contents
      console.log('FormData contents:');
      for (const [key, value] of fd.entries()) {
        console.log(`${key}:`, value, `(type: ${typeof value})`);
      }

      const res = await createProperty(fd).unwrap();
      toast.success(res.message ?? 'Hotel created successfully!');
      router.push('/hotels-partner-dashboard/manage-hotels/list');
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message ?? 'Failed to create hotel');
    }
  };

  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAddressInput(val);
    setSuggestions([]);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.trim().length < 3) { setShowDropdown(false); return; }

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&addressdetails=1&limit=6`,
          { headers: { "Accept-Language": "en" } }
        );
        const data: NominatimResult[] = await res.json();
        setSuggestions(data);
        setShowDropdown(data.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 450);
  };


  const handleSelectSuggestion = (item: NominatimResult) => {
    const addr = item.address;

    // Construct street with fallbacks
    let streetName = "";
    if (addr.house_number && addr.road) {
      streetName = `${addr.house_number} ${addr.road}`;
    } else if (addr.road) {
      streetName = addr.road;
    } else {
      // If road is missing, take the first part of display name that isn't the city
      streetName = item.display_name.split(',')[0];
    }

    setStreet(streetName);
    setCity(addr.city || addr.town || addr.village || addr.municipality || "");
    setState(addr.state || "");
    // Force postalCode to be a string, even if Nominatim returns a number
    const postalCodeValue = addr.postcode;
    const postalCodeStr = (postalCodeValue === null || postalCodeValue === undefined) ? "" : String(postalCodeValue);
    setPostalCode(postalCodeStr);
    setCountry(addr.country || "");
    setLatitude(Number(item.lat));
    setLongitude(Number(item.lon));
    setAddressInput(item.display_name);
    setSuggestions([]);
    setShowDropdown(false);
  };

  const clearAddress = () => {
    setAddressInput("");
    setStreet("");
    setCity("");
    setState("");
    setPostalCode("");
    setCountry("");
    setLatitude(null);
    setLongitude(null);
    setSuggestions([]);
    setShowDropdown(false);
  };

  const addressFilled = !!(street || city || country);
  return (
    <div className="bg-white rounded-sm p-5 md:p-8 border border-[#F2F2F2] shadow-sm">
      <h1 className="text-[20px] font-semibold text-[#2C2E33] mb-6">Add New Hotel</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className={labelCls}>Hotel Title <span className="text-red-400">*</span></label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Grand Plaza Resort & Spa"
            className={inputCls}
          />
        </div>

        {/* Structure Type & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Structure Type</label>
            <select value={structureType} onChange={e => setStructureType(e.target.value)} className={selectCls}>
              {STRUCTURE_TYPES.map(t => (
                <option key={t} value={t} className="capitalize">{t.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Price (per night) <span className="text-red-400">*</span></label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="e.g. 42"
              min="0"
              className={inputCls}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelCls}>Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Tell guests what makes your hotel unique..."
            className="w-full bg-[#F5F5F5] rounded-[10px] p-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] border-none outline-none resize-none focus:ring-1 focus:ring-[#F1913D]"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className={labelCls}>Amenities</label>
          <div className="flex flex-wrap gap-2">
            {AMENITIES_LIST.map(item => {
              const selected = amenities.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleAmenity(item)}
                  className={`text-[13px] font-medium px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${selected
                    ? 'bg-[#F1913D] text-white border-[#F1913D]'
                    : 'bg-[#F5F5F5] text-[#6C757D] border-[#F2F2F2] hover:border-[#F1913D] hover:text-[#F1913D]'
                    }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Address */}
        <Section title="Address" delay={0.2}>
          <Field label="Search Location" required>
            <div className="relative">
              {/* Search input */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "#F1913D" }} />
                {isSearching && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin"
                    style={{ color: "#6C757D" }} />
                )}
                <input
                  value={addressInput}
                  onChange={handleAddressInput}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                  placeholder="Type a city, street or area…"
                  autoComplete="off"
                  className="w-full h-11 rounded-lg border text-sm pl-9 pr-10 outline-none focus:ring-1 focus:ring-[#F1913D] focus:border-[#F1913D] transition-all"
                  style={inputStyle}
                />
                {addressInput && (
                  <button
                    type="button"
                    onClick={clearAddress}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Suggestions dropdown */}
              {showDropdown && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg overflow-hidden z-50"
                  style={{ borderColor: "#F2F2F2" }}>
                  {suggestions.map((item) => (
                    <button
                      key={item.place_id}
                      type="button"
                      onMouseDown={() => handleSelectSuggestion(item)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50 flex items-start gap-2.5 border-b last:border-0 transition-colors"
                      style={{ borderColor: "#F9FAFB" }}
                    >
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#F1913D" }} />
                      <span className="line-clamp-2" style={{ color: "#2C2E33" }}>{item.display_name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Field>

          {/* Parsed address shown after selection */}
          {addressFilled && (
            <div className="rounded-xl border p-4 space-y-3" style={{ borderColor: "#F2F2F2", backgroundColor: "#FAFAFA" }}>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#6C757D" }}>
                Parsed Address
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {[
                  { label: "Street", value: street },
                  { label: "City", value: city },
                  { label: "State", value: state },
                  { label: "Postal Code", value: postalCode },
                  { label: "Country", value: country },
                  {
                    label: "Coordinates", value: latitude !== null && longitude !== null
                      ? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
                      : "—"
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-xs" style={{ color: "#6C757D" }}>{label}</span>
                    <span className="font-medium" style={{ color: "#2C2E33" }}>{value || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* Image Upload */}
        <div>
          <label className={labelCls}>Upload Images</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-[#F5F5F5] rounded-[10px] py-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors border-2 border-dashed border-[#E5E5E5] hover:border-[#F1913D] group"
          >
            <div className="w-14 h-14 bg-[#FFF4ED] group-hover:bg-[#F1913D]/15 rounded-2xl flex items-center justify-center mb-2 transition-colors">
              <CloudUpload className="text-[#F1913D]" size={28} strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-medium text-[#2C2E33]">Click to upload images</p>
            <p className="text-[12px] text-[#6C757D] mt-1">PNG, JPG, WEBP up to 10MB each · Multiple allowed</p>
          </div>
          {imageError && <p className="text-red-500 text-[13px] font-medium mt-2">{imageError}</p>}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative group rounded-[10px] overflow-hidden border border-[#F2F2F2] shadow-sm aspect-square bg-gray-100">
                  <Image src={img.preview} alt={`Preview ${idx + 1}`} fill className="object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-[#2C2E33]/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 bg-[#F1913D] text-white text-[10px] font-medium px-2 py-0.5 rounded-full">Main</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#F2F2F2]">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-12 px-8 bg-[#F5F5F5] hover:bg-gray-200 text-[#2C2E33] font-medium rounded-[10px] transition-colors cursor-pointer text-[14px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="h-12 px-10 bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-medium rounded-[10px] transition-colors shadow-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 text-[14px]"
          >
            {isLoading ? <><Loader2 size={16} className="animate-spin" /> Creating...</> : 'Add Hotel Property'}
          </button>
        </div>

      </form>
    </div>
  );
}
