'use client';

import {
  Dialog,
  DialogContent
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  useChangePasswordMutation,
  useGetMyKYCQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useVerificationKYCMutation,
} from '@/features/profile/profileApi';
import { ApiError } from '@/types';
import { baseURL } from '@/utils/BaseURL';
import { Camera, ChevronLeft, ChevronRight, Clock, Eye, EyeOff, IdCard, Info, Loader2, Shield, ShieldCheck, Upload, User, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

const MAX_KYC_FILES = 5;

const profileSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
});
type ProfileErrors = Partial<Record<keyof z.infer<typeof profileSchema>, string>>;

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
type PasswordErrors = Partial<Record<keyof z.infer<typeof passwordSchema>, string>>;

const getImg = (path?: string) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

export default function HotelsPartnerDashboardProfile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const kycInputRef = useRef<HTMLInputElement>(null);
  const [kycFiles, setKycFiles] = useState<File[]>([]);
  const [kycPreviews, setKycPreviews] = useState<string[]>([]);

  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery({});
  const { data: kycData, isLoading: kycLoading } = useGetMyKYCQuery({});
  const [updateProfile, { isLoading: updateLoading }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: changePassLoading }] = useChangePasswordMutation();
  const [submitKYC, { isLoading: kycSubmitting }] = useVerificationKYCMutation();


  const profile = profileData?.data;
  const verification = kycData?.data?.verification;
  const kycDocuments: string[] = verification?.documents ?? [];
  const [kycPreviewModalOpen, setKycPreviewModalOpen] = useState(false);
  const [kycPreviewIndex, setKycPreviewIndex] = useState(0);

  const openKycPreview = (index: number, fromPreviews = false) => {
    // combine server docs and local previews so all are viewable in one modal
    const serverImgs = kycDocuments.map(getImg).filter(Boolean) as string[];
    const localImgs = kycPreviews || [];
    const all = [...serverImgs, ...localImgs];
    // calculate absolute index: if opening from local previews, offset by serverImgs.length
    const absoluteIndex = fromPreviews ? serverImgs.length + index : index;
    if (absoluteIndex < 0 || absoluteIndex >= all.length) return;
    setKycPreviewIndex(absoluteIndex);
    setKycPreviewModalOpen(true);
  };

  const closeKycPreview = () => setKycPreviewModalOpen(false);

  const moveKycPreview = (dir: number) => {
    const serverImgs = kycDocuments.map(getImg).filter(Boolean) as string[];
    const all = [...serverImgs, ...(kycPreviews || [])];
    setKycPreviewIndex(i => {
      const next = i + dir;
      if (next < 0) return all.length - 1;
      if (next >= all.length) return 0;
      return next;
    });
  };

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

  const [profileErrors, setProfileErrors] = useState<ProfileErrors>({});
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});

  const isVerified = kycData?.data?.verification?.status === 'verified';

  // Prefill the form once the profile loads — guarded by a ref so it doesn't
  // keep overwriting in-progress edits on every keystroke re-render.
  const prefilledRef = useRef(false);
  useEffect(() => {
    if (profile && !prefilledRef.current) {
      prefilledRef.current = true;
      Promise.resolve().then(() => {
        setFormData({
          firstName: profile.firstName ?? '',
          lastName: profile.lastName ?? '',
          phone: profile.phone ?? '',
        });
      });
    }
  }, [profile]);

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
    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: ProfileErrors = {};
      result.error.issues.forEach(issue => { fieldErrors[issue.path[0] as keyof ProfileErrors] = issue.message; });
      setProfileErrors(fieldErrors);
      return;
    }
    setProfileErrors({});
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

  // revoke preview object URLs whenever the selection changes or the page unmounts
  useEffect(() => {
    return () => { kycPreviews.forEach((url) => URL.revokeObjectURL(url)); };
  }, [kycPreviews]);

  const handleKycFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    if (files.length > MAX_KYC_FILES) {
      toast.error(`You can upload a maximum of ${MAX_KYC_FILES} images.`);
      e.target.value = '';
      return;
    }
    if (files.some((file) => !file.type.startsWith('image/'))) {
      toast.error('Only image files are allowed.');
      e.target.value = '';
      return;
    }
    if (files.some((file) => file.size > 5 * 1024 * 1024)) {
      toast.error('Each image must be under 5MB.');
      e.target.value = '';
      return;
    }
    setKycFiles(files);
    setKycPreviews(files.map((file) => URL.createObjectURL(file)));
    e.target.value = '';
  };

  const handleRemoveKycFile = (index: number) => {
    setKycFiles((prev) => prev.filter((_, i) => i !== index));
    setKycPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitKyc = async () => {
    if (kycFiles.length === 0) { toast.error('Please select at least one document to upload.'); return; }
    try {
      const fd = new FormData();
      kycFiles.forEach((file) => fd.append('image', file));
      const res = await submitKYC(fd).unwrap();
      toast.success(res.message ?? 'Documents submitted for verification!');
      setKycFiles([]);
      setKycPreviews([]);
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message ?? 'Failed to submit documents');
    }
  };

  const handleChangePassword = async () => {
    const result = passwordSchema.safeParse(passwords);
    if (!result.success) {
      const fieldErrors: PasswordErrors = {};
      result.error.issues.forEach(issue => { fieldErrors[issue.path[0] as keyof PasswordErrors] = issue.message; });
      setPasswordErrors(fieldErrors);
      return;
    }
    setPasswordErrors({});
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

  const kycStatusBadge = (() => {
    switch (verification?.status) {
      case 'verified':
      case 'approved':
        return <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full shrink-0">Verified</span>;
      case 'pending':
        return <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full shrink-0">Pending Review</span>;
      case 'rejected':
        return <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full shrink-0">Rejected</span>;
      default:
        return <span className="text-[11px] font-semibold text-[#6C757D] bg-[#F5F5F5] px-2.5 py-1 rounded-full shrink-0">Not Submitted</span>;
    }
  })();

  // Upload is allowed when nothing has been submitted yet, or the last submission was rejected.
  // While pending review or already verified, the upload action is hidden.
  const canUploadKyc = !verification?.status || verification.status === 'rejected';

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
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {isVerified ? 'Verified' : 'Unverified'}
              </span>
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
              onChange={e => { setFormData(p => ({ ...p, firstName: e.target.value })); setProfileErrors(p => ({ ...p, firstName: undefined })); }}
              placeholder="First name"
              className={`${inputCls} ${profileErrors.firstName ? 'ring-2 ring-red-500' : ''}`}
            />
            {profileErrors.firstName && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{profileErrors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#2C2E33]">Last Name <span className="text-red-400">*</span></label>
            <Input
              value={formData.lastName}
              onChange={e => { setFormData(p => ({ ...p, lastName: e.target.value })); setProfileErrors(p => ({ ...p, lastName: undefined })); }}
              placeholder="Last name"
              className={`${inputCls} ${profileErrors.lastName ? 'ring-2 ring-red-500' : ''}`}
            />
            {profileErrors.lastName && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{profileErrors.lastName}</p>}
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


      <div className="bg-white rounded-[20px] p-6 md:p-8 border border-[#F2F2F2] shadow-sm">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
          <h3 className="text-[15px] font-semibold text-[#2C2E33] flex items-center gap-2">
            <IdCard size={15} className="text-[#F1913D]" /> KYC Verification
          </h3>
          {kycLoading ? null : kycStatusBadge}
        </div>
        <p className="text-[13px] text-[#6C757D] font-medium mb-6 max-w-2xl">
          Verify your identity by uploading a clear photo of your National ID or Passport.
        </p>

        {kycLoading ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-7 h-7 border-2 border-[#F1913D] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Status notices */}
            {verification?.status === 'rejected' && (
              <div className="flex items-start gap-2.5 bg-red-50 text-red-600 text-[13px] font-medium rounded-xl px-4 py-3 mb-6">
                <Info size={16} className="mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <p>Your KYC documents were rejected.</p>
                  {verification?.reviewNotes && (
                    <p className="text-red-500/90">Reason: {verification.reviewNotes}</p>
                  )}
                  <p>Please upload valid documents to try again.</p>
                </div>
              </div>
            )}
            {verification?.status === 'pending' && (
              <div className="flex items-start gap-2.5 bg-orange-50 text-orange-600 text-[13px] font-medium rounded-xl px-4 py-3 mb-6">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <p>Your documents are under admin review.</p>
              </div>
            )}
            {(verification?.status === 'verified' || verification?.status === 'approved') && (
              <div className="flex items-start gap-2.5 bg-green-50 text-green-600 text-[13px] font-medium rounded-xl px-4 py-3 mb-6">
                <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                <p>Your KYC has been verified successfully.</p>
              </div>
            )}

            {/* Already submitted documents */}
            {kycDocuments.length > 0 && (
              <div className="mb-6">
                <p className="text-[14px] font-medium text-[#2C2E33] mb-3">
                  Submitted Documents
                  {verification?.submittedAt && (
                    <span className="text-[12px] text-[#6C757D] font-medium"> · {new Date(verification.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  )}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {kycDocuments.map((doc, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => openKycPreview(i, false)}
                      onContextMenu={(e) => e.preventDefault()}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#F2F2F2] block group cursor-pointer"
                    >
                      <Image src={getImg(doc) ?? ''} alt={`KYC document ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Upload new documents — only when nothing submitted yet, or the last submission was rejected */}
            {canUploadKyc && (
              <>
                <div className="space-y-3">
                  <p className="text-[14px] font-medium text-[#2C2E33]">
                    {kycDocuments.length > 0 ? 'Re-upload Documents' : 'Upload Documents'}
                  </p>

                  {kycPreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {kycPreviews.map((src, i) => (
                        <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#F2F2F2]">
                          <button
                            type="button"
                            onClick={() => openKycPreview(i, true)}
                            onContextMenu={(e) => e.preventDefault()}
                            className="absolute inset-0 z-0"
                            style={{ background: 'transparent', border: 0 }}
                          />
                          <Image src={src} alt={`Selected document ${i + 1}`} fill className="object-cover" unoptimized />
                          <button
                            type="button"
                            onClick={() => handleRemoveKycFile(i)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer z-10"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => kycInputRef.current?.click()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-dashed border-[#F1913D]/40 text-[#F1913D] font-medium text-[14px] px-5 py-3 rounded-[10px] hover:bg-[#F1913D]/5 transition-colors cursor-pointer"
                  >
                    <Upload size={16} /> Choose Images (NID / Passport)
                  </button>
                  <input
                    ref={kycInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleKycFilesChange}
                  />
                  <p className="text-[12px] text-[#6C757D] font-medium">
                    Accepted formats: JPG, PNG · Up to {MAX_KYC_FILES} images · Max 5MB each
                  </p>
                </div>

                <div className="flex justify-end mt-8 pt-6 border-t border-[#F2F2F2]">
                  <button
                    type="button"
                    onClick={handleSubmitKyc}
                    disabled={kycSubmitting || kycFiles.length === 0}
                    className="px-8 py-3 rounded-[10px] bg-[#F1913D] hover:bg-[#F1913D]/90 text-white font-medium text-[15px] shadow-sm transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {kycSubmitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Submit for Verification'}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>




      {/* KYC Preview Modal (secure, no new-tab) */}
      {(() => {
        const serverImgs = kycDocuments.map(getImg).filter(Boolean) as string[];
        const allKycImages = [...serverImgs, ...kycPreviews];
        const currentSrc = allKycImages[kycPreviewIndex] ?? null;
        return (
          <Dialog open={kycPreviewModalOpen} onOpenChange={setKycPreviewModalOpen}>
            <DialogContent className="sm:max-w-4xl p-0 bg-gray-50 shadow-none">
              <div className="relative bg-white/50 rounded-xl overflow-hidden">
                {/* <DialogClose asChild>
                  <button className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center">
                    <X size={16} />
                  </button>
                </DialogClose> */}

                {currentSrc ? (
                  <div className="w-full h-[70vh] flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => moveKycPreview(-1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer z-20 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="max-h-[68vh] max-w-[90%] flex items-center justify-center">
                      <img
                        src={currentSrc}
                        alt={`KYC preview ${kycPreviewIndex + 1}`}
                        onContextMenu={(e) => e.preventDefault()}
                        className="max-h-[68vh] max-w-[95%] object-contain"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => moveKycPreview(1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-20 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center"
                      aria-label="Next"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                ) : null}
              </div>
            </DialogContent>
          </Dialog>
        );
      })()}

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
                onChange={e => { setPasswords(p => ({ ...p, currentPassword: e.target.value })); setPasswordErrors(p => ({ ...p, currentPassword: undefined })); }}
                placeholder="Enter current password"
                className={`${inputCls} pr-12 ${passwordErrors.currentPassword ? 'ring-2 ring-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => ({ ...p, current: !p.current }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] cursor-pointer"
              >
                {showPass.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordErrors.currentPassword && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{passwordErrors.currentPassword}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#2C2E33]">New Password</label>
            <div className="relative">
              <Input
                type={showPass.newPass ? 'text' : 'password'}
                value={passwords.newPassword}
                onChange={e => { setPasswords(p => ({ ...p, newPassword: e.target.value })); setPasswordErrors(p => ({ ...p, newPassword: undefined })); }}
                placeholder="Enter new password"
                className={`${inputCls} pr-12 ${passwordErrors.newPassword ? 'ring-2 ring-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => ({ ...p, newPass: !p.newPass }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] cursor-pointer"
              >
                {showPass.newPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordErrors.newPassword && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{passwordErrors.newPassword}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-[#2C2E33]">Confirm Password</label>
            <div className="relative">
              <Input
                type={showPass.confirm ? 'text' : 'password'}
                value={passwords.confirmPassword}
                onChange={e => { setPasswords(p => ({ ...p, confirmPassword: e.target.value })); setPasswordErrors(p => ({ ...p, confirmPassword: undefined })); }}
                placeholder="Confirm new password"
                className={`${inputCls} pr-12 ${passwordErrors.confirmPassword ? 'ring-2 ring-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => ({ ...p, confirm: !p.confirm }))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#6C757D] cursor-pointer"
              >
                {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordErrors.confirmPassword && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{passwordErrors.confirmPassword}</p>}
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
