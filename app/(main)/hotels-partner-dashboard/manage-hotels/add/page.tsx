'use client';

import { useCreatePropertyMutation, useGetAllPropertyQuery, useUpdatePropertyMutation } from '@/features/manageHotels/manageHotelsApi';
import { ApiError, Hotel, RootState } from '@/types';
import { baseURL } from '@/utils/BaseURL';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { motion } from "framer-motion";
import { ChevronLeft, CloudUpload, Loader2, MapPin, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import * as z from 'zod';
import { Label } from '../../../../../components/ui/label';

const addHotelSchema = z.object({
  title: z.string().trim().min(1, 'Hotel title is required'),
  structureType: z.string().trim().min(1, 'Structure type is required'),
  price: z.coerce.number().positive('Valid price is required'),
  description: z.string().trim().min(1, 'Description is required'),
  amenities: z.array(z.string()).min(1, 'Please select at least one amenity'),
  street: z.string().trim().min(1, 'Please select a valid address from the suggestions'),
  city: z.string().trim().min(1, 'Please select a valid address from the suggestions'),
  country: z.string().trim().min(1, 'Please select a valid address from the suggestions'),
});
type AddHotelErrors = Partial<Record<keyof z.infer<typeof addHotelSchema> | 'images', string>>;

const getImg = (path: string) => (path.startsWith('http') ? path : `${baseURL}${path}`);

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
    county?: string;
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
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditMode = !!editId;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createProperty, { isLoading: isCreating }] = useCreatePropertyMutation();
  const [updateProperty, { isLoading: isUpdating }] = useUpdatePropertyMutation();
  const isLoading = isCreating || isUpdating;

  // Fetch the property to edit by matching its _id against the list of properties
  const userId = useSelector((state: RootState) => state.auth?.user?._id);
  const { data: propertiesData, isFetching: isLoadingEditTarget } = useGetAllPropertyQuery(
    { userId, page: 1 },
    { skip: !userId || !isEditMode }
  );
  const editingHotel: Hotel | undefined = propertiesData?.data?.find((p: Hotel) => p._id === editId);
  const prefilledRef = useRef(false);

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
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [errors, setErrors] = useState<AddHotelErrors>({});

  // Prefill the form once the matching property has loaded
  useEffect(() => {
    if (!editingHotel || prefilledRef.current) return;
    prefilledRef.current = true;

    const addr = editingHotel.address;

    setTitle(editingHotel.title ?? '');
    setStructureType(editingHotel.structureType ?? 'hotel');
    setDescription(editingHotel.description ?? '');
    setPrice(editingHotel.price !== undefined ? String(editingHotel.price) : '');
    setAmenities(editingHotel.amenities ?? []);
    setStreet(addr?.street ?? '');
    setCity(addr?.city ?? '');
    setState(addr?.state ?? '');
    setPostalCode(addr?.postalCode ?? '');
    setCountry(addr?.country ?? '');
    setAddressInput([addr?.street, addr?.city, addr?.state, addr?.country].filter(Boolean).join(', '));
    setExistingImages(editingHotel.images ?? []);
  }, [editingHotel]);

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
    setErrors(prev => ({ ...prev, images: undefined }));
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

    const result = addHotelSchema.safeParse({ title, structureType, price, description, amenities, street, city, country });
    const fieldErrors: AddHotelErrors = {};
    if (!result.success) {
      result.error.issues.forEach(issue => { fieldErrors[issue.path[0] as keyof AddHotelErrors] = issue.message; });
    }
    if (images.length === 0 && existingImages.length === 0) {
      fieldErrors.images = 'Please upload at least one image';
    }
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    try {
      const fd = new FormData();

      // Basic info
      fd.append('structureType', structureType);
      fd.append('title', title.trim());
      fd.append('description', description.trim());
      fd.append('price', String(Number(price)));

      // Amenities - send repeated `amenities[]` entries so the backend parses an array
      amenities.forEach(a => fd.append('amenities[]', a));

      // Address object structure in FormData
      fd.append('address[street]', String(street.trim()));
      fd.append('address[city]', String(city.trim()));
      fd.append('address[state]', String(state.trim()));
      fd.append('address[postalCode]', String(postalCode.trim()));
      fd.append('address[country]', String(country.trim()));

      // Location coordinates structure
      if (latitude !== null && longitude !== null) {
        // GeoJSON Point requires [longitude, latitude] order, not [latitude, longitude]
        fd.append('location[coordinates][0]', String(longitude));
        fd.append('location[coordinates][1]', String(latitude));
      }

      // New images — backend has no field for specifying which existing images
      // to keep/remove, so only send this when new images were actually added.
      images.forEach(img => fd.append('image', img.file));

      const res = isEditMode
        ? await updateProperty({ id: editId, data: fd }).unwrap()
        : await createProperty(fd).unwrap();

      toast.success(res.message ?? (isEditMode ? 'Hotel updated successfully!' : 'Hotel created successfully!'));
      router.push('/hotels-partner-dashboard/manage-hotels/list');
    } catch (err) {
      const error = err as ApiError;
      toast.error(getErrorMessage(error, isEditMode ? 'Failed to update hotel' : 'Failed to create hotel'));
    }
  };

  const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAddressInput(val);
    setSuggestions([]);
    setErrors(prev => ({ ...prev, street: undefined, city: undefined, country: undefined }));

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
      streetName = item.display_name.split(',')[0];
    }

    setStreet(streetName);
    setCity(
      addr.city || addr.town || addr.village || addr.municipality || addr.state || addr.county || ""
    );
    setState(addr.state || addr.county || "");
    const postalCodeValue = addr.postcode;
    const postalCodeStr = (postalCodeValue === null || postalCodeValue === undefined) ? "" : String(postalCodeValue);
    setPostalCode(postalCodeStr);
    setCountry(addr.country || "");
    setLatitude(Number(item.lat));
    setLongitude(Number(item.lon));
    setAddressInput(item.display_name);
    setSuggestions([]);
    setShowDropdown(false);
    setErrors(prev => ({ ...prev, street: undefined, city: undefined, country: undefined }));
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

  if (isEditMode && isLoadingEditTarget) {
    return (
      <div className="bg-white rounded-sm p-5 md:p-8 border border-[#F2F2F2] shadow-sm flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[#F1913D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm p-5 md:p-8 border border-[#F2F2F2] shadow-sm">
      {isEditMode && (
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 -ml-2 text-[#6C757D] hover:text-[#F1913D] font-medium text-[14px] mb-4 cursor-pointer transition-colors"
        >
          <ChevronLeft size={18} />
          Back
        </button>
      )}
      <h1 className="text-[20px] font-semibold text-[#2C2E33] mb-6">{isEditMode ? 'Edit Hotel' : 'Add New Hotel'}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className={labelCls}>Hotel Title <span className="text-red-400">*</span></label>
          <input
            type="text"
            value={title}
            onChange={e => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: undefined })); }}
            placeholder="e.g. Grand Plaza Resort & Spa"
            className={`${inputCls} ${errors.title ? 'ring-2 ring-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-[13px] font-medium mt-1">{errors.title}</p>}
        </div>

        {/* Structure Type & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Structure Type <span className="text-red-400">*</span></label>
            <select
              value={structureType}
              onChange={e => { setStructureType(e.target.value); setErrors(prev => ({ ...prev, structureType: undefined })); }}
              className={`${selectCls} ${errors.structureType ? 'ring-2 ring-red-500' : ''}`}
            >
              {STRUCTURE_TYPES.map(t => (
                <option key={t} value={t} className="capitalize">{t.replace('_', ' ')}</option>
              ))}
            </select>
            {errors.structureType && <p className="text-red-500 text-[13px] font-medium mt-1">{errors.structureType}</p>}
          </div>
          <div>
            <label className={labelCls}>Price (per night) <span className="text-red-400">*</span></label>
            <input
              type="number"
              value={price}
              onChange={e => { setPrice(e.target.value); setErrors(prev => ({ ...prev, price: undefined })); }}
              placeholder="e.g. 42"
              min="0"
              className={`${inputCls} ${errors.price ? 'ring-2 ring-red-500' : ''}`}
            />
            {errors.price && <p className="text-red-500 text-[13px] font-medium mt-1">{errors.price}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelCls}>Description <span className="text-red-400">*</span></label>
          <textarea
            rows={4}
            value={description}
            onChange={e => { setDescription(e.target.value); setErrors(prev => ({ ...prev, description: undefined })); }}
            placeholder="Tell guests what makes your hotel unique..."
            className={`w-full bg-[#F5F5F5] rounded-[10px] p-4 text-[14px] text-[#2C2E33] placeholder:text-[#6C757D] border-none outline-none resize-none focus:ring-1 focus:ring-[#F1913D] ${errors.description ? 'ring-2 ring-red-500' : ''}`}
          />
          {errors.description && <p className="text-red-500 text-[13px] font-medium mt-1">{errors.description}</p>}
        </div>

        {/* Amenities */}
        <div>
          <label className={labelCls}>Amenities <span className="text-red-400">*</span></label>
          <div className="flex flex-wrap gap-2">
            {AMENITIES_LIST.map(item => {
              const selected = amenities.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => { toggleAmenity(item); setErrors(prev => ({ ...prev, amenities: undefined })); }}
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
          {errors.amenities && <p className="text-red-500 text-[13px] font-medium mt-1">{errors.amenities}</p>}
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
                  className={`w-full h-11 rounded-lg border text-sm pl-9 pr-10 outline-none focus:ring-1 focus:ring-[#F1913D] focus:border-[#F1913D] transition-all ${(errors.street || errors.city || errors.country) ? 'ring-2 ring-red-500' : ''}`}
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
            {(errors.street || errors.city || errors.country) && (
              <p className="text-red-500 text-[13px] font-medium mt-1">{errors.street || errors.city || errors.country}</p>
            )}
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
          <label className={labelCls}>Upload Images <span className="text-red-400">*</span></label>
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
            className={`w-full bg-[#F5F5F5] rounded-[10px] py-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors border-2 border-dashed group ${errors.images ? 'border-red-500' : 'border-[#E5E5E5] hover:border-[#F1913D]'}`}
          >
            <div className="w-14 h-14 bg-[#FFF4ED] group-hover:bg-[#F1913D]/15 rounded-2xl flex items-center justify-center mb-2 transition-colors">
              <CloudUpload className="text-[#F1913D]" size={28} strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-medium text-[#2C2E33]">Click to upload images</p>
            <p className="text-[12px] text-[#6C757D] mt-1">PNG, JPG, WEBP up to 10MB each · Multiple allowed</p>
          </div>
          {imageError && <p className="text-red-500 text-[13px] font-medium mt-2">{imageError}</p>}
          {errors.images && <p className="text-red-500 text-[13px] font-medium mt-2">{errors.images}</p>}
          {existingImages.length > 0 && (
            <>
              <p className="text-[12px] text-[#6C757D] mt-3 mb-1">Current images (removing individual images isn&apos;t supported yet)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {existingImages.map((img, idx) => (
                  <div key={img} className="relative rounded-[10px] overflow-hidden border border-[#F2F2F2] shadow-sm aspect-square bg-gray-100">
                    <Image src={getImg(img)} alt={`Current ${idx + 1}`} fill className="object-cover" unoptimized />
                    {idx === 0 && images.length === 0 && (
                      <span className="absolute bottom-1.5 left-1.5 bg-[#F1913D] text-white text-[10px] font-medium px-2 py-0.5 rounded-full">Main</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
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
                  {idx === 0 && existingImages.length === 0 && (
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
            {isLoading
              ? <><Loader2 size={16} className="animate-spin" /> {isEditMode ? 'Updating...' : 'Creating...'}</>
              : (isEditMode ? 'Update Hotel Property' : 'Add Hotel Property')}
          </button>
        </div>

      </form>
    </div>
  );
}
