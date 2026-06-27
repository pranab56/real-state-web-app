'use client';

import {
  useGetAllNotificationQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} from '@/features/notification/notificationApi';
import {
  Bell,
  BellRing,
  CalendarCheck,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Heart,
  Inbox,
  Loader2,
  ShieldCheck,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface AppNotification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  referenceId?: string;
  createdAt: string;
  timeAgo?: string;
}

const TYPE_ICON_MAP: Record<string, React.ElementType> = {
  reservation: CalendarCheck,
  payment: CreditCard,
  review: Star,
  kyc: ShieldCheck,
  wishlist: Heart,
};

const getTypeIcon = (type: string) => TYPE_ICON_MAP[type] ?? Bell;

export default function NotificationPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useGetAllNotificationQuery({ page });
  const [readNotification] = useReadNotificationMutation();
  const [readAllNotification, { isLoading: isMarkingAll }] = useReadAllNotificationMutation();

  const notifications: AppNotification[] = data?.data?.data ?? [];
  const unreadCount: number = data?.data?.unreadCount ?? 0;
  const pagination = data?.pagination;
  const totalPage: number = pagination?.totalPage ?? 1;

  const handleMarkAllRead = async () => {
    try {
      await readAllNotification({}).unwrap();
      toast.success('All notifications marked as read.');
    } catch {
      toast.error('Failed to mark notifications as read.');
    }
  };

  const handleNotificationClick = (notification: AppNotification) => {
    if (notification.isRead) return;
    readNotification({ notificationId: notification._id });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#FAF6F2] py-14 md:py-20 text-center mt-8 md:mt-12">
        <div className="container mx-auto px-4 md:px-6 space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <ChevronRight size={14} className="text-neutral-2" />
            <span className="text-neutral-2">Notifications</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl md:text-5xl font-medium text-neutral-1">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-neutral-2 text-sm md:text-base font-medium max-w-lg mx-auto opacity-70">
            Stay up to date with your bookings, payments, and account activity.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 px-5 md:px-7 py-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <BellRing size={18} className="text-primary" />
              <span className="text-[15px] font-medium text-neutral-1">All Notifications</span>
            </div>
            <button
              onClick={handleMarkAllRead}
              disabled={isMarkingAll || unreadCount === 0}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isMarkingAll ? <Loader2 size={14} className="animate-spin" /> : <CheckCheck size={14} />}
              Mark all as read
            </button>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-primary" />
            </div>
          )}

          {/* Empty */}
          {!isLoading && notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-20 px-6">
              <div className="w-16 h-16 rounded-full bg-[#FAF6F2] flex items-center justify-center mb-4">
                <Inbox size={26} className="text-primary" />
              </div>
              <p className="text-[15px] font-medium text-neutral-1">No notifications yet</p>
              <p className="text-[13px] text-neutral-2 font-medium mt-1 max-w-xs">
                We&apos;ll let you know here when there&apos;s something new about your bookings or account.
              </p>
            </div>
          )}

          {/* List */}
          {!isLoading && notifications.length > 0 && (
            <ul className={isFetching ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
              {notifications.map((notification) => {
                const Icon = getTypeIcon(notification.type);
                return (
                  <li
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`flex items-start gap-4 px-5 md:px-7 py-5 border-b border-gray-100 last:border-0 cursor-pointer transition-colors ${notification.isRead ? 'bg-white hover:bg-gray-50/60' : 'bg-primary/[0.04] hover:bg-primary/[0.07]'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notification.isRead ? 'bg-gray-100 text-neutral-2' : 'bg-primary/15 text-primary'
                      }`}>
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className={`text-[14px] ${notification.isRead ? 'font-medium text-neutral-1' : 'font-semibold text-neutral-1'}`}>
                          {notification.title}
                        </p>
                        {!notification.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                      </div>
                      <p className="text-[13px] text-neutral-2 font-medium mt-0.5 line-clamp-2">{notification.message}</p>
                      <p className="text-[12px] text-neutral-2/70 font-medium mt-1.5">{notification.timeAgo}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Pagination */}
          {!isLoading && totalPage > 1 && (
            <div className="flex items-center justify-center gap-2 px-5 py-5 border-t border-gray-100">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="cursor-pointer flex items-center justify-center w-9 h-9 border border-gray-100 bg-white text-neutral-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>

              {Array.from({ length: totalPage }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 flex cursor-pointer items-center justify-center font-medium text-[13px] rounded-lg transition-colors ${page === i + 1 ? 'bg-primary text-white' : 'bg-white border border-gray-100 text-neutral-1 hover:bg-gray-50'
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
                disabled={page === totalPage}
                className="cursor-pointer flex items-center justify-center w-9 h-9 border border-gray-100 bg-white text-neutral-1 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
