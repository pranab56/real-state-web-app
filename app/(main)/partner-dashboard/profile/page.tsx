'use client';

import { Input } from '@/components/ui/input';
import { Camera, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, type FormEvent } from 'react';

type FormErrors = Partial<Record<string, string>>;

export default function PartnerDashboardProfile() {
  // --- Profile Image State ---
  const [previewUrl, setPreviewUrl] = useState<string>(
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=250&auto=format&fit=crop'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Profile Form State ---
  const [formData, setFormData] = useState({
    firstName: 'Rasel',
    lastName: 'Parvez',
    email: 'rasel@example.com',
    phone: '01721879586',
    location: 'Dhaka, Bangladesh',
  });

  // --- Password State ---
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });
  const [showPass, setShowPass] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  // --- Validation Errors ---
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');

  // --- Image Upload Handler ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: 'Only image files are allowed.' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Image size must be under 5MB.' }));
      return;
    }
    setErrors(prev => ({ ...prev, image: undefined }));
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // --- Form Validation & Submit ---
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email address.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!formData.location.trim()) newErrors.location = 'Location is required.';

    if (passwords.newPass && passwords.newPass.length < 8) {
      newErrors.newPass = 'New password must be at least 8 characters.';
    }
    if (passwords.newPass && passwords.newPass !== passwords.confirm) {
      newErrors.confirm = 'Passwords do not match.';
    }
    if (passwords.confirm && !passwords.newPass) {
      newErrors.newPass = 'Please enter a new password.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSuccessMessage('Your profile has been updated successfully!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const inputCls = (field: string) =>
    `bg-[#F5F5F5] border-none h-[52px] rounded-[10px] text-[15px] font-medium text-[#2C2E33] placeholder:text-[#A1A1A1] focus-visible:ring-1 px-4 ${errors[field] ? 'focus-visible:ring-red-400 ring-1 ring-red-300' : 'focus-visible:ring-[#F1913D]'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-6 pb-8">

        {/* Success Banner */}
        {successMessage && (
          <div className="bg-[#2B9724]/10 border border-[#2B9724]/20 text-[#2B9724] font-semibold text-[14px] px-5 py-3.5 rounded-[10px]">
            {successMessage}
          </div>
        )}

        {/* Container 1: Personal Information */}
        <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#F2F2F2]">

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
            <div className="relative">
              <div className="w-20 h-20 md:w-[100px] md:h-[100px] rounded-[16px] overflow-hidden bg-gray-200 border border-gray-100 relative shadow-sm">
                <Image
                  src={previewUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                  unoptimized={previewUrl.startsWith('blob:')}
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#2C2E33] text-white flex items-center justify-center border-[3px] border-white shadow-sm hover:bg-[#1E2024] transition-colors cursor-pointer"
              >
                <Camera size={14} strokeWidth={2.5} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex flex-col">
              <h2 className="text-[20px] font-bold text-[#2C2E33]">Personal Information</h2>
              <p className="text-[#6C757D] text-[14px] font-medium mt-1 mb-4">
                Customer ID: <span className="text-[#2C2E33] font-semibold">#MT-8821</span> · Joined Jan 2023
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-fit px-5 py-2.5 rounded-[10px] border border-[#E5E7EB] bg-white text-[#2C2E33] font-bold text-[14px] shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Update Profile Photo
              </button>
              {errors.image && <p className="text-red-500 text-[13px] mt-2">{errors.image}</p>}
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div className="space-y-2">
              <label className="text-[15px] font-bold text-[#2C2E33]">First Name <span className="text-red-400">*</span></label>
              <Input
                required
                value={formData.firstName}
                onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                placeholder="Enter first name..."
                className={inputCls('firstName')}
              />
              {errors.firstName && <p className="text-red-500 text-[13px]">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-[#2C2E33]">Last Name <span className="text-red-400">*</span></label>
              <Input
                required
                value={formData.lastName}
                onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                placeholder="Enter last name..."
                className={inputCls('lastName')}
              />
              {errors.lastName && <p className="text-red-500 text-[13px]">{errors.lastName}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[15px] font-bold text-[#2C2E33]">Email Address <span className="text-red-400">*</span></label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                placeholder="Enter email address..."
                className={inputCls('email')}
              />
              {errors.email && <p className="text-red-500 text-[13px]">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-[#2C2E33]">Phone Number <span className="text-red-400">*</span></label>
              <Input
                required
                value={formData.phone}
                onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                placeholder="Enter phone number..."
                className={inputCls('phone')}
              />
              {errors.phone && <p className="text-red-500 text-[13px]">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-[#2C2E33]">Location <span className="text-red-400">*</span></label>
              <Input
                required
                value={formData.location}
                onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
                placeholder="Enter location..."
                className={inputCls('location')}
              />
              {errors.location && <p className="text-red-500 text-[13px]">{errors.location}</p>}
            </div>
          </div>
        </div>

        {/* Container 2: Password */}
        <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#F2F2F2]">
          <h2 className="text-[20px] font-bold text-[#2C2E33] pb-6 border-b border-[#F2F2F2] mb-8">
            Account Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            {/* Current Password */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[15px] font-bold text-[#2C2E33]">Current Password</label>
              <div className="relative">
                <Input
                  type={showPass.current ? 'text' : 'password'}
                  value={passwords.current}
                  onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                  placeholder="Enter your current password here..."
                  className={`${inputCls('current')} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => ({ ...p, current: !p.current }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] transition-colors cursor-pointer"
                >
                  {showPass.current ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-[15px] font-bold text-[#2C2E33]">New Password</label>
              <div className="relative">
                <Input
                  type={showPass.newPass ? 'text' : 'password'}
                  value={passwords.newPass}
                  onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))}
                  placeholder="Enter your new password here..."
                  className={`${inputCls('newPass')} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => ({ ...p, newPass: !p.newPass }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] transition-colors cursor-pointer"
                >
                  {showPass.newPass ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
                </button>
              </div>
              {errors.newPass && <p className="text-red-500 text-[13px]">{errors.newPass}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[15px] font-bold text-[#2C2E33]">Confirm Password</label>
              <div className="relative">
                <Input
                  type={showPass.confirm ? 'text' : 'password'}
                  value={passwords.confirm}
                  onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                  placeholder="Enter your confirm password here..."
                  className={`${inputCls('confirm')} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => ({ ...p, confirm: !p.confirm }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] transition-colors cursor-pointer"
                >
                  {showPass.confirm ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
                </button>
              </div>
              {errors.confirm && <p className="text-red-500 text-[13px]">{errors.confirm}</p>}
            </div>
          </div>
        </div>

        {/* Container 3: Actions */}
        <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#F2F2F2] flex flex-col sm:flex-row items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => { setErrors({}); setSuccessMessage(''); }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#2C2E33] font-bold text-[15px] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-[10px] bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-bold text-[15px] shadow-sm transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>

      </div>
    </form>
  );
}