'use client';

import { useGetAllTransectionQuery } from '@/features/peyment/payementApi';
import { baseURL } from '@/utils/BaseURL';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, CreditCard, DollarSign, Loader2, ReceiptText } from 'lucide-react';
import { Transaction } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

const getImg = (path?: string) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${baseURL}${path}`;
};

const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase() || '?';

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-[#2B9724]/10 text-[#2B9724]';
    case 'pending':   return 'bg-[#F1913D]/10 text-[#F1913D]';
    case 'failed':    return 'bg-[#DC3545]/10 text-[#DC3545]';
    case 'refunded':  return 'bg-blue-50 text-blue-600';
    default:          return 'bg-gray-100 text-gray-600';
  }
};

const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

export default function PartnerDashboardPayments() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllTransectionQuery({ page });

  const transactions: Transaction[] = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPage: number  = pagination?.totalPage ?? 1;
  const total: number      = pagination?.total ?? 0;
  const limit: number      = pagination?.limit ?? 10;

  const totalAmount  = transactions.reduce((s: number, tx: Transaction) => s + (tx.amount ?? 0), 0);
  const totalNet     = transactions.reduce((s: number, tx: Transaction) => s + (tx.netAmount ?? 0), 0);
  const paidCount    = transactions.filter((tx: Transaction & { isPaid?: boolean }) => tx.isPaid).length;

  const showingFrom = total === 0 ? 0 : (page - 1) * limit + 1;
  const showingTo   = Math.min(page * limit, total);

  return (
    <div className="space-y-6">

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-lg border border-[#F2F2F2] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#F1913D]/10 flex items-center justify-center flex-shrink-0">
            <ReceiptText size={22} className="text-[#F1913D]" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">Total Transactions</p>
            <h3 className="text-[26px] font-semibold text-[#2C2E33] leading-tight">{total}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#F2F2F2] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
            <DollarSign size={22} className="text-green-600" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">Total Amount</p>
            <h3 className="text-[26px] font-semibold text-[#2C2E33] leading-tight">
              {transactions[0]?.currency ?? 'USD'} {totalAmount.toFixed(2)}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#F2F2F2] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <CreditCard size={22} className="text-blue-600" />
          </div>
          <div>
            <p className="text-[13px] text-[#6C757D] font-medium">Net Amount</p>
            <h3 className="text-[26px] font-semibold text-[#2C2E33] leading-tight">
              {transactions[0]?.currency ?? 'USD'} {totalNet.toFixed(2)}
            </h3>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 border border-gray-100 shadow-sm">
        <h1 className="text-[22px] font-medium text-[#2C2E33] mb-6">Transaction History</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
            <thead>
              <tr className="bg-[#F9F9F9]">
                <th className="px-6 py-4 font-medium text-[#6C757D] rounded-l-xl">Transaction</th>
                <th className="px-6 py-4 font-medium text-[#6C757D]">Reservation</th>
                <th className="px-6 py-4 font-medium text-[#6C757D]">User</th>
                <th className="px-6 py-4 font-medium text-[#6C757D]">Date</th>
                <th className="px-6 py-4 font-medium text-[#6C757D]">Method</th>
                <th className="px-6 py-4 font-medium text-[#6C757D]">Status</th>
                <th className="px-6 py-4 font-medium text-[#6C757D] rounded-r-xl">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-4" />

              {isLoading && (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <Loader2 size={28} className="animate-spin text-[#F1913D] mx-auto" />
                  </td>
                </tr>
              )}

              {!isLoading && transactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-[#6C757D] font-medium">
                    No transactions found.
                  </td>
                </tr>
              )}

              {!isLoading && transactions.map((tx: Transaction) => {
                const reservation = tx.reference?.id;
                const user        = tx.user ?? {};
                const avatarUrl   = getImg(user.image);
                const initials    = getInitials(user.firstName, user.lastName);
                const dateStr     = tx.createdAt ? format(new Date(tx.createdAt), 'MMM dd, yyyy') : '—';
                const txId        = tx._id?.slice(-8).toUpperCase();

                return (
                  <tr key={tx._id} className="hover:bg-gray-50/50 transition-colors border-b border-[#F2F2F2] last:border-0">

                    {/* Transaction ID */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#2C2E33] text-[14px]">#{txId}</span>
                        <span className="text-[12px] text-[#6C757D] font-medium capitalize">{tx.gateway}</span>
                      </div>
                    </td>

                    {/* Reservation */}
                    <td className="px-6 py-4">
                      {reservation ? (
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#2C2E33] text-[14px]">{reservation.uid}</span>
                          <span className="text-[12px] text-[#6C757D] font-medium capitalize">{reservation.roomClass?.replace('_', ' ')}</span>
                        </div>
                      ) : (
                        <span className="text-[#6C757D] text-[13px]">—</span>
                      )}
                    </td>

                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {avatarUrl ? (
                          <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
                            <Image src={avatarUrl} alt={user.firstName ?? ''} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#F1913D]/15 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#F1913D] font-bold text-[12px]">{initials}</span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-[#2C2E33] text-[14px]">{user.firstName} {user.lastName}</span>
                          <span className="text-[12px] text-[#6C757D]">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-[#2C2E33] font-semibold text-[14px]">{dateStr}</td>

                    {/* Method */}
                    <td className="px-6 py-4">
                      <span className="text-[13px] font-medium text-[#2C2E33] capitalize">{tx.paymentMethod}</span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-[12px] font-semibold ${getStatusStyle(tx.status)}`}>
                        {capitalize(tx.status)}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 font-semibold text-[#2C2E33] text-[15px]">
                      {tx.currency} {tx.amount?.toFixed(2)}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 pb-2">
          <p className="text-[#6C757D] text-[15px] text-center md:text-left">
            Showing <span className="font-medium text-[#2C2E33]">{showingFrom}–{showingTo} of {total}</span> entries
          </p>

          {totalPage > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-100 bg-white text-[#6C757D] font-semibold text-[14px] rounded-sm hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={16} strokeWidth={2.5} /> <span className="hidden sm:inline">Previous</span>
              </button>

              {Array.from({ length: totalPage }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center font-medium rounded-sm shadow-sm transition-colors cursor-pointer ${page === i + 1 ? 'bg-[#F1913D] text-white' : 'bg-white border border-gray-100 text-[#2C2E33] hover:bg-gray-50'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPage, p + 1))}
                disabled={page === totalPage}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-100 bg-white text-[#2C2E33] font-semibold text-[14px] rounded-sm hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="hidden sm:inline">Next</span> <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
