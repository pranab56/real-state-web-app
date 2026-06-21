'use client';

import { Input } from '@/components/ui/input';
import { useChangePasswordMutation, useGetProfileQuery, useUpdateProfileMutation } from '@/features/profile/profileApi';
import { baseURL } from '@/utils/BaseURL';
import { Camera, Eye, EyeOff, Loader2, Shield, User } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { ApiError } from '@/types';

const getImg = (path?: string) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

export default function HotelsPartnerDashboardProfile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery({});
  const [updateProfile, { isLoading: updateLoading }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: changePassLoading }] = useChangePasswordMutation();

  const profile = profileData?.data;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPass, setShowPass] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  useEffect(() => {
    if (profile) {
      const newFirstName = profile.firstName ?? '';
      const newLastName = profile.lastName ?? '';
      const newPhone = profile.phone ?? '';
      
      if (formData.firstName !== newFirstName || 
          formData.lastName !== newLastName || 
          formData.phone !== newPhone) {
        Promise.resolve().then(() => {
          setFormData({
            firstName: newFirstName,
            lastName: newLastName,
            phone: newPhone,
          });
        });
      }
    }
  }, [profile, formData]);

  const avatarSrc = previewUrl ?? getImg(profile?.image);
  const initials = `${profile?.firstName?.[0] ?? ''}${profile?.lastName?.[0] ?? ''}`.toUpperCase() || '?';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Only image files are allowed.'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB.'); return; }
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async () => {
    if (!formData.firstName.trim()) { toast.error('First name is required.'); return; }
    if (!formData.lastName.trim()) { toast.error('Last name is required.'); return; }
    try {
      const fd = new FormData();
      fd.append('firstName', formData.firstName.trim());
      fd.append('lastName', formData.lastName.trim());
      fd.append('phone', formData.phone.trim());
      if (imageFile) fd.append('image', imageFile);
      const res = await updateProfile(fd).unwrap();
      toast.success(res.message ?? 'Profile updated successfully!');
      setImageFile(null);
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message ?? 'Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (!passwords.currentPassword) { toast.error('Current password is required.'); return; }
    if (!passwords.newPassword || passwords.newPassword.length < 8) { toast.error('New password must be at least 8 characters.'); return; }
    if (passwords.newPassword !== passwords.confirmPassword) { toast.error('Passwords do not match.'); return; }
    try {
      const res = await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword,
      }).unwrap();
      toast.success(res.message ?? 'Password changed successfully!');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message ?? 'Failed to change password');
    }
  };

  const inputCls = 'bg-[#F5F5F5] border-none h-[52px] rounded-[10px] text-[15px] font-medium text-[#2C2E33] placeholder:text-[#A1A1A1] focus-visible:ring-1 focus-visible:ring-[#F1913D] px-4';

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-[#F1913D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">

      {/* Personal Information */}
      <div className="bg-white rounded-[20px] p-6 md:p-8 border border-[#F2F2F2] shadow-sm">

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-8 border-b border-[#F2F2F2]">
          <div className="relative flex-shrink-0">
            <div className="w-[90px] h-[90px] rounded-[16px] overflow-hidden bg-[#F1913D]/10 border border-gray-100 relative shadow-sm flex items-center justify-center">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt="Profile"
                  fill
                  className="object-cover"
                  unoptimized={!!previewUrl}
                />
              ) : (
                <span className="text-[#F1913D] font-bold text-[28px]">{initials}</span>
              )}
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

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="text-[20px] font-semibold text-[#2C2E33]">
                {profile?.firstName} {profile?.lastName}
              </h2>
              {profile?.isVerified && (
                <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <p className="text-[13px] text-[#6C757D] font-medium mb-3">{profile?.email}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-medium text-[#6C757D] bg-[#F5F5F5] px-3 py-1 rounded-full">
                {profile?.uid}
              </span>
              <span className="text-[12px] font-medium text-[#6C757D] bg-[#F5F5F5] px-3 py-1 rounded-full capitalize">
                {profile?.role}
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[12px] font-medium text-[#F1913D] border border-[#F1913D]/30 px-3 py-1 rounded-full hover:bg-[#F1913D]/5 transition-colors cursor-pointer"
              >
                Change Photo
              </button>
            </div>
          </div>
        </div>

        {/* Personal Info Fields */}
        <h3 className="text-[15px] font-semibold text-[#2C2E33] mb-5 flex items-center gap-2">
          <User size={15} className="text-[#F1913D]" /> Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#2C2E33]">First Name <span className="text-red-400">*</span></label>
            <Input
              value={formData.firstName}
              onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
              placeholder="First name"
              className={inputCls}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#2C2E33]">Last Name <span className="text-red-400">*</span></label>
            <Input
              value={formData.lastName}
              onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
              placeholder="Last name"
              className={inputCls}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#2C2E33]">Email Address</label>
            <Input
              value={profile?.email ?? ''}
              readOnly
              className={`${inputCls} opacity-60 cursor-not-allowed`}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#2C2E33]">Phone Number</label>
            <Input
              value={formData.phone}
              onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
              placeholder="Enter phone number"
              className={inputCls}
            />
          </div>
        </div>



        <div className="flex justify-end mt-8 pt-6 border-t border-[#F2F2F2]">
          <button
            type="button"
            onClick={handleUpdateProfile}
            disabled={updateLoading}
            className="px-8 py-3 rounded-[10px] bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-medium text-[15px] shadow-sm transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {updateLoading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-[20px] p-6 md:p-8 border border-[#F2F2F2] shadow-sm">
        <h3 className="text-[15px] font-semibold text-[#2C2E33] mb-6 flex items-center gap-2">
          <Shield size={15} className="text-[#F1913D]" /> Change Password
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div className="space-y-2 md:col-span-2">
            <label className="text-[14px] font-medium text-[#2C2E33]">Current Password</label>
            <div className="relative">
              <Input
                type={showPass.current ? 'text' : 'password'}
                value={passwords.currentPassword}
                onChange={e => setPasswords(p => ({ ...p, currentPassword: e.target.value }))}
                placeholder="Enter current password"
                className={`${inputCls} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => ({ ...p, current: !p.current }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] cursor-pointer"
              >
                {showPass.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#2C2E33]">New Password</label>
            <div className="relative">
              <Input
                type={showPass.newPass ? 'text' : 'password'}
                value={passwords.newPassword}
                onChange={e => setPasswords(p => ({ ...p, newPassword: e.target.value }))}
                placeholder="Enter new password"
                className={`${inputCls} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => ({ ...p, newPass: !p.newPass }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] cursor-pointer"
              >
                {showPass.newPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#2C2E33]">Confirm Password</label>
            <div className="relative">
              <Input
                type={showPass.confirm ? 'text' : 'password'}
                value={passwords.confirmPassword}
                onChange={e => setPasswords(p => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="Confirm new password"
                className={`${inputCls} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => ({ ...p, confirm: !p.confirm }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] cursor-pointer"
              >
                {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8 pt-6 border-t border-[#F2F2F2]">
          <button
            type="button"
            onClick={handleChangePassword}
            disabled={changePassLoading}
            className="px-8 py-3 rounded-[10px] bg-[#2C2E33] hover:bg-[#1E2024] text-white font-medium text-[15px] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {changePassLoading ? <><Loader2 size={16} className="animate-spin" /> Changing...</> : 'Change Password'}
          </button>
        </div>
      </div>

    </div>
  );
}
