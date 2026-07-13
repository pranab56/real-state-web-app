"use client";

import { Button } from "@/components/ui/button";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConnectWalletMutation, useGetChapaBankListQuery, useGetMyWalletQuery, useWithdrawMoneyMutation } from "@/features/wallet/walletApi";
import { ArrowUpRight, Banknote, Building2, Clock, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Types
interface Bank {
  id: string;
  name: string;
  swift: string;
  acct_length: number;
}

interface WalletData {
  _id: string;
  user: string;
  currency: string;
  provider: string;
  availableBalance: number;
  pendingBalance: number;
  status: string;
  gatewayBankInfo?: {
    stripe?: {
      stripeAccountId: string;
    };
    chapa?: {
      accountName: string;
      accountNumber: string;
      bankCode: string;
      bankName: string;
    };
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API Response type
interface WalletApiResponse {
  success: boolean;
  message: string;
  data: WalletData | WalletData[];
}

// Error response type
interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
  message?: string;
}

export default function Page() {
  const { data, isLoading, refetch } = useGetMyWalletQuery({}) as {
    data: WalletApiResponse | undefined;
    isLoading: boolean;
    refetch: () => void;
  };
  const { data: bankListData, isLoading: bankListLoading } = useGetChapaBankListQuery({});
  const [connectWallet, { isLoading: connectWalletLoading }] = useConnectWalletMutation();
  const [withdrawMoney, { isLoading: withdrawMoneyLoading }] = useWithdrawMoneyMutation();

  const [connectMethodOpen, setConnectMethodOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successData, setSuccessData] = useState({ bankName: "", accountNumber: "" });

  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "ETB">("USD");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBankName, setSelectedBankName] = useState("");
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedBankSwift, setSelectedBankSwift] = useState("");
  const [selectedBankAcctLength, setSelectedBankAcctLength] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);

  // Validation states
  const [accountNumberError, setAccountNumberError] = useState<string>("");
  const [accountNameError, setAccountNameError] = useState<string>("");

  const getWallets = (): WalletData[] => {
    if (!data?.data) return [];

    if (Array.isArray(data.data)) {
      return data.data;
    }

    if (typeof data.data === 'object' && data.data._id) {
      return [data.data];
    }

    return [];
  };

  const wallets = getWallets();

  const getConnectedBankInfo = (wallet: WalletData) => {
    if (wallet.gatewayBankInfo?.chapa) {
      return {
        bankName: wallet.gatewayBankInfo.chapa.bankName,
        accountNumber: wallet.gatewayBankInfo.chapa.accountNumber,
        accountName: wallet.gatewayBankInfo.chapa.accountName,
        bankCode: wallet.gatewayBankInfo.chapa.bankCode
      };
    }
    return null;
  };

  const hasConnectedBank = (wallet: WalletData) => {
    return !!(wallet.gatewayBankInfo?.chapa || wallet.gatewayBankInfo?.stripe);
  };

  // Validate account number
  const validateAccountNumber = (value: string, acctLength: number): boolean => {
    // Remove any non-digit characters
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length !== acctLength) {
      setAccountNumberError(`Account number must be exactly ${acctLength} digits`);
      return false;
    }

    setAccountNumberError("");
    return true;
  };

  // Handle account number change with validation
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    const digitOnly = value.replace(/\D/g, '');
    setAccountNumber(digitOnly);

    // Validate if bank is selected
    if (selectedBankAcctLength > 0 && digitOnly.length > 0) {
      validateAccountNumber(digitOnly, selectedBankAcctLength);
    } else if (digitOnly.length > 0 && selectedBankAcctLength === 0) {
      setAccountNumberError("Please select a bank first");
    } else {
      setAccountNumberError("");
    }
  };

  // Validate account name (only letters and spaces)
  const validateAccountName = (value: string): boolean => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(value)) {
      setAccountNameError("Account name should only contain letters and spaces");
      return false;
    }
    setAccountNameError("");
    return true;
  };

  const handleAccountNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAccountName(value);
    if (value.length > 0) {
      validateAccountName(value);
    } else {
      setAccountNameError("");
    }
  };

  const handleConnect = async () => {
    try {
      if (selectedCurrency === "USD") {
        const res = await connectWallet({
          currency: "USD",
          gatewayBankInfo: { stripe: {} }
        }).unwrap();

        if (res.data?.onboardingUrl) {
          window.location.href = res.data.onboardingUrl;
        }
      } else {
        // Validate all fields
        if (!selectedBankName || !selectedBankSwift) {
          toast.error("Please select a bank");
          return;
        }

        if (!accountName) {
          toast.error("Please enter account name");
          return;
        }

        if (!accountNumber) {
          toast.error("Please enter account number");
          return;
        }

        // Validate account number length
        if (selectedBankAcctLength > 0) {
          const isValid = validateAccountNumber(accountNumber, selectedBankAcctLength);
          if (!isValid) {
            toast.error(`Account number must be exactly ${selectedBankAcctLength} digits`);
            return;
          }
        }

        // Validate account name
        if (!validateAccountName(accountName)) {
          toast.error("Account name should only contain letters and spaces");
          return;
        }

        await connectWallet({
          currency: "ETB",
          gatewayBankInfo: {
            chapa: {
              accountName,
              accountNumber,
              bankCode: selectedBankSwift,
              bankName: selectedBankName
            }
          }
        }).unwrap();

        setSuccessData({ bankName: selectedBankName, accountNumber });
        setConnectMethodOpen(false);
        setSuccessModalOpen(true);
        // Reset form
        setAccountName("");
        setAccountNumber("");
        setSelectedBankName("");
        setSelectedBankId("");
        setSelectedBankSwift("");
        setSelectedBankAcctLength(0);
        setAccountNumberError("");
        setAccountNameError("");
        refetch();
      }
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message || error?.message || "Failed to connect payout method");
    }
  };

  const handleWithdraw = async () => {
    try {
      const amount = Number(withdrawAmount);
      if (!amount || amount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }
      await withdrawMoney({ amount, walletId: selectedWalletId }).unwrap();
      toast.success("Withdrawal successful!");
      setWithdrawOpen(false);
      setWithdrawAmount("");
      setSelectedWalletId(null);
      refetch();
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message || error?.message || "Failed to withdraw money");
    }
  };

  // Bank Name options
  const bankNameOptions: ComboboxOption[] = bankListData?.data?.map((bank: Bank) => ({
    value: String(bank.id),
    label: bank.name
  })) || [];

  // Handle bank selection
  const handleBankSelect = (selectedId: string) => {
    const selectedBank = bankListData?.data?.find((bank: Bank) => String(bank.id) === selectedId);
    if (selectedBank) {
      setSelectedBankId(String(selectedBank.id));
      setSelectedBankName(selectedBank.name);
      setSelectedBankSwift(selectedBank.swift);
      setSelectedBankAcctLength(selectedBank.acct_length);
      // Clear account number when bank changes
      setAccountNumber("");
      setAccountNumberError("");
    } else {
      setSelectedBankId("");
      setSelectedBankName("");
      setSelectedBankSwift("");
      setSelectedBankAcctLength(0);
    }
  };

  const wallet = wallets[0];
  const bankInfo = wallet ? getConnectedBankInfo(wallet) : null;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Wallet & Payouts</h1>
        <Button
          className="text-white cursor-pointer py-5 px-6 rounded-lg"
          variant="default"
          onClick={() => setConnectMethodOpen(true)}
        >
          Connect Method
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : wallets.length === 0 ? (
        <div className="flex items-center justify-center h-60 border-2 border-dashed rounded-xl">
          <div className="text-center">
            <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No wallet found</p>
            <p className="text-sm text-gray-400 mt-1">Connect a payout method to get started</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Wallet className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">My Wallet</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-400">Active</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-500">Connected Accounts</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-gray-700">{wallet.provider || "Chapa"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Banknote className="h-4 w-4 text-gray-400" />
                    <p className="text-xs font-medium text-gray-500">Available Balance</p>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {wallet.availableBalance || 0}
                    </span>
                    <span className="text-sm font-medium text-gray-500 mb-1">
                      {wallet.currency}
                    </span>
                  </div>
                  {wallet.pendingBalance > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-gray-500">
                        +{wallet.pendingBalance} {wallet.currency} (from previous day)
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <p className="text-xs font-medium text-gray-500">Pending Balance</p>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-yellow-600">
                      {wallet.pendingBalance || 0}
                    </span>
                    <span className="text-sm font-medium text-gray-500 mb-1">
                      {wallet.currency}
                    </span>
                  </div>
                </div>
              </div>

              {bankInfo && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-600" />
                      <h3 className="text-sm font-medium text-gray-700">Connected Bank</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => setConnectMethodOpen(true)}
                    >
                      Change Payout Method
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Bank Name</p>
                      <p className="text-sm font-medium text-gray-900">{bankInfo.bankName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Bank Code</p>
                      <p className="text-sm font-medium text-gray-900">{bankInfo.bankCode}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Account Name</p>
                      <p className="text-sm font-medium text-gray-900">{bankInfo.accountName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Account Number</p>
                      <p className="text-sm font-medium text-gray-900">{bankInfo.accountNumber}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <Button
                  className="w-full py-6 rounded-lg text-base font-medium"
                  variant="default"
                  onClick={() => {
                    setSelectedWalletId(wallet._id);
                    setWithdrawOpen(true);
                  }}
                  disabled={!hasConnectedBank(wallet)}
                >
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Withdraw Funds
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Wallet Status</h3>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Status</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${wallet.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {wallet.status}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Provider</span>
                <span className="text-xs font-medium text-gray-900">{wallet.provider || "Chapa"}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-gray-500">Currency</span>
                <span className="text-xs font-medium text-gray-900">{wallet.currency}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Method Dialog */}
      <Dialog open={connectMethodOpen} onOpenChange={setConnectMethodOpen}>
        <DialogContent className="border border-gray-200 rounded-md p-6 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Payout Method</DialogTitle>
            <DialogDescription>Select a currency to connect your payout method</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                className="w-6/12 rounded-sm py-5 cursor-pointer"
                variant={selectedCurrency === "USD" ? "default" : "outline"}
                onClick={() => setSelectedCurrency("USD")}
              >
                USD
              </Button>
              <Button
                className="w-6/12 rounded-sm py-5 cursor-pointer"
                variant={selectedCurrency === "ETB" ? "default" : "outline"}
                onClick={() => setSelectedCurrency("ETB")}
              >
                ETB
              </Button>
            </div>

            {selectedCurrency === "ETB" && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2">Bank Name</Label>
                  {bankListLoading ? (
                    <div className="h-12 flex items-center justify-center border rounded-sm bg-[#F6F6F6]">
                      Loading banks...
                    </div>
                  ) : (
                    <Combobox
                      className="w-full border rounded-sm py-5 outline-none focus:outline-none"
                      options={bankNameOptions}
                      value={selectedBankId}
                      onChange={handleBankSelect}
                      placeholder="Select bank name"
                    />
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium mb-1" htmlFor="accountNumber">
                    Account Number
                    {selectedBankAcctLength > 0 && (
                      <span className="text-xs text-gray-500 ml-1">
                        (Must be {selectedBankAcctLength} digits)
                      </span>
                    )}
                  </Label>
                  <Input
                    id="accountNumber"
                    value={accountNumber}
                    className={`w-full border rounded-sm py-5 outline-none focus:outline-none ${accountNumberError ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    onChange={handleAccountNumberChange}
                    placeholder={`Enter account number${selectedBankAcctLength > 0 ? ` (${selectedBankAcctLength} digits)` : ''}`}
                    maxLength={selectedBankAcctLength > 0 ? selectedBankAcctLength : undefined}
                  />
                  {accountNumberError && (
                    <p className="text-xs text-red-500 mt-1">{accountNumberError}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium mb-1" htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    value={accountName}
                    className={`w-full border rounded-sm py-5 outline-none focus:outline-none ${accountNameError ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    onChange={handleAccountNameChange}
                    placeholder="Enter account name (letters only)"
                  />
                  {accountNameError && (
                    <p className="text-xs text-red-500 mt-1">{accountNameError}</p>
                  )}
                </div>

                {/* Show selected bank info */}
                {selectedBankName && (
                  <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
                    <p>✅ Selected Bank: {selectedBankName}</p>
                    <p>📱 Account length: {selectedBankAcctLength} digits</p>
                    <p>🔑 Bank Code: {selectedBankSwift}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-center bg-white">
            <Button className="rounded-sm py-5 cursor-pointer" variant="outline" onClick={() => setConnectMethodOpen(false)}>
              Cancel
            </Button>
            <Button
              className="rounded-sm py-5 cursor-pointer"
              variant="default"
              onClick={handleConnect}
              disabled={connectWalletLoading || !!accountNumberError || !!accountNameError}
            >
              {connectWalletLoading ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>Enter the amount you want to withdraw</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="withdrawAmount">Amount</Label>
              <Input
                id="withdrawAmount"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            {selectedWalletId && wallet && (
              <div className="text-sm text-gray-500">
                Available balance: {wallet.availableBalance} {wallet.currency}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleWithdraw} disabled={withdrawMoneyLoading}>
              {withdrawMoneyLoading ? "Withdrawing..." : "Withdraw"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">🎉 Congratulations!</DialogTitle>
            <DialogDescription className="text-base">Your payout method has been connected successfully.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 my-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Bank:</span>
              <span className="font-medium">{successData.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Account Number:</span>
              <span className="font-medium">{successData.accountNumber}</span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setSuccessModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}