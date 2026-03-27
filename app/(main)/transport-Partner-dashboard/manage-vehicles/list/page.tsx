"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, ChevronLeft, ChevronRight, FileText, MoreHorizontal, Plus, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const ITEMS = [
  ...Array(9).fill(null).map((_, i) => ({
    id: i + 1,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    make: "Mercedes-Benz S-Class",
    vehicleId: "#FL-2291",
    type: "Sedan",
    plate: "ABC-1234",
    year: "Oct 12, 2025",
    status: "Active"
  }))
];

export default function TransportListPage() {
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Image Upload State
  const [vehicleImage, setVehicleImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Amenities/Tags State
  const [amenities, setAmenities] = useState<string[]>(['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'USB Charging']);
  const [newAmenity, setNewAmenity] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(ITEMS.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item_id) => item_id !== id));
    }
  };

  const isAllSelected = selectedIds.length === ITEMS.length && ITEMS.length > 0;

  // Image Upload Handlers
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVehicleImage(url);
    }
  };

  // Amenities Handlers
  const handleAddAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (name: string) => {
    setAmenities(amenities.filter(a => a !== name));
  };

  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[20px] p-6 border border-[#F2F2F2] shadow-sm flex flex-col justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#22C55E]">
            <CalendarDays className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="text-[#6C757D] text-[15px] font-medium">Active</div>
          <div className="text-[32px] font-bold text-[#2C2E33] leading-none">42</div>
        </div>
        <div className="bg-white rounded-[20px] p-6 border border-[#F2F2F2] shadow-sm flex flex-col justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#22C55E]">
            <CalendarDays className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="text-[#6C757D] text-[15px] font-medium">In Trip</div>
          <div className="text-[32px] font-bold text-[#2C2E33] leading-none">12</div>
        </div>
        <div className="bg-white rounded-[20px] p-6 border border-[#F2F2F2] shadow-sm flex flex-col justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#22C55E]">
            <CalendarDays className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="text-[#6C757D] text-[15px] font-medium">Total Vehicles</div>
          <div className="text-[32px] font-bold text-[#2C2E33] leading-none">48</div>
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-6 border border-[#F2F2F2] shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-[20px] font-bold text-[#2C2E33]">Vehicles List</h2>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <Button variant="outline" className="border-[#E5E7EB] text-[#4B5563] font-medium h-10 px-4 rounded-lg flex-1 md:flex-none cursor-pointer">
              <FileText className="w-4 h-4 mr-2" />
              Export History
            </Button>

            <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
              <DialogTrigger render={
                <Button className="bg-[#f97316]  hover:bg-[#ea580c] text-white font-medium h-10 px-4 rounded-lg flex-1 md:flex-none cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Vehicle
                </Button>
              } />
              <DialogContent className="sm:max-w-[850px] p-0 rounded-2xl overflow-hidden border-0 gap-0 shadow-xl [&>button]:hidden bg-white">
                <div className="p-6 border-b border-[#F2F2F2]">
                  <DialogHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <DialogTitle className="text-[20px] font-bold text-[#2C2E33]">Add New Vehicle</DialogTitle>
                        <p className="text-sm text-[#6C757D] mt-1.5 font-medium">Enter vehicle details and features.</p>
                      </div>
                      <DialogClose className="rounded-full w-8 h-8 flex items-center justify-center bg-[#F9FAFB] hover:bg-gray-100 text-[#6C757D] transition-colors flex-shrink-0 cursor-pointer">
                        <X className="w-4 h-4" />
                      </DialogClose>
                    </div>
                  </DialogHeader>
                </div>

                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-[#2C2E33]">Make</Label>
                      <Input placeholder="e.g. Mercedes-Benz" className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-sm text-[#2C2E33] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-[#2C2E33]">Model</Label>
                      <Input placeholder="e.g. Mercedes-Benz" className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-sm text-[#2C2E33] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-[#2C2E33]">Year</Label>
                      <Select>
                        <SelectTrigger className="h-11 py-5 w-full bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-sm text-[#2C2E33] shadow-none focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="2024" />
                        </SelectTrigger>
                        <SelectContent className="rounded">
                          <SelectItem value="2024" className="rounded-none">2024</SelectItem>
                          <SelectItem value="2025" className="rounded-none">2025</SelectItem>
                          <SelectItem value="2026" className="rounded-none">2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-[#2C2E33]">License Plate</Label>
                      <Input placeholder="ABC-1234" className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-sm text-[#2C2E33] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-[#2C2E33]">Vehicle Type</Label>
                    <Input placeholder="e.g. Sedan" className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-sm text-[#2C2E33] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-300" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-[#2C2E33]">Upload Image</Label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <div
                      onClick={handleImageClick}
                      className="h-[140px] rounded-xl bg-[#F9FAFB] border border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden relative"
                    >
                      {vehicleImage ? (
                        <>
                          <Image src={vehicleImage} alt="Vehicle Preview" fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <UploadCloud className="w-8 h-8 text-white" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-orange-50/50 flex items-center justify-center text-[#f97316]">
                            <UploadCloud className="w-5 h-5 flex-shrink-0 stroke-[1.5]" />
                          </div>
                          <span className="text-[13px] text-[#4B5563] font-medium">Main Image</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-[#2C2E33]">Amenities & Features</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add new amenity..."
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddAmenity()}
                        className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-sm text-[#2C2E33]"
                      />
                      <Button
                        type="button"
                        onClick={handleAddAmenity}
                        className="h-11 bg-[#f97316] hover:bg-[#ea580c] transition-colors cursor-pointer"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2.5 mt-2">
                      {amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2 px-3.5 py-2 bg-[#F9FAFB] border border-[#F2F2F2] rounded-lg text-[13px] text-[#2C2E33] font-medium">
                          {amenity}
                          <X
                            onClick={() => handleRemoveAmenity(amenity)}
                            className="w-3.5 h-3.5 text-[#6C757D] cursor-pointer hover:text-gray-900 transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 border-t border-[#F2F2F2] flex justify-end gap-3 bg-white">
                  <Button
                    variant="outline"
                    className="h-11 px-6 bg-[#F9FAFB] hover:bg-gray-100 border-0 text-[#2C2E33] font-semibold rounded-lg shadow-none cursor-pointer"
                    onClick={() => setIsAddVehicleOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="h-11 px-6 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold rounded-lg shadow-none cursor-pointer">
                    Add to New Vehicle
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-transparent border-b border-[#F2F2F2] w-3/12 justify-start rounded-none h-auto p-0 mb-6 gap-6">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#f97316] cursor-pointer data-[state=active]:text-[#f97316] data-[state=active]:shadow-none rounded-none px-0 py-3 bg-transparent hover:bg-transparent text-[#6C757D] font-bold text-[15px]"
            >
              All Vehicles
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-transparent cursor-pointer data-[state=active]:border-b-2 data-[state=active]:border-[#f97316] data-[state=active]:text-[#f97316] data-[state=active]:shadow-none rounded-none px-0 py-3 bg-transparent hover:bg-transparent text-[#6C757D] font-bold text-[15px]"
            >
              Active
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0 outline-none">
            <div className="grid grid-cols-12 gap-4 py-3.5 px-4 bg-[#F9FAFB] text-[#6C757D] text-[13px] font-medium rounded-xl mb-3">
              <div className="col-span-1 flex items-center justify-center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={(checked) => handleSelectAll(checked === true)}
                  className="rounded border-gray-300 data-[state=checked]:bg-[#f97316] data-[state=checked]:border-[#f97316] cursor-pointer"
                />
              </div>
              <div className="col-span-3">Vehicle</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">License Plate</div>
              <div className="col-span-2">Year</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            <div className="flex flex-col">
              {ITEMS.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 py-4 px-4 items-center border-b border-[#F2F2F2] last:border-0 hover:bg-gray-50/50 transition-colors">
                  <div className="col-span-1 flex items-center justify-center">
                    <Checkbox
                      checked={selectedIds.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked === true)}
                      className="rounded border-gray-300 data-[state=checked]:bg-[#f97316] data-[state=checked]:border-[#f97316] cursor-pointer"
                    />
                  </div>
                  <div className="col-span-3 flex items-center space-x-3.5">
                    <div className="relative w-[52px] h-[40px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image src={item.image} alt={item.make} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold text-[#2C2E33] truncate">{item.make}</div>
                      <div className="text-[12px] font-medium text-[#9CA3AF] mt-0.5">{item.vehicleId}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-[14px] font-semibold text-[#2C2E33]">{item.type}</div>
                  <div className="col-span-2 text-[14px] text-[#2C2E33] font-medium">{item.plate}</div>
                  <div className="col-span-2 text-[14px] text-[#2C2E33] font-medium">{item.year}</div>
                  <div className="col-span-1">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold bg-[#F0FDF4] text-[#22C55E]">
                      {item.status}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button className="text-[#f97316] hover:text-[#ea580c] text-[13px] font-semibold underline-offset-4 hover:underline cursor-pointer">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-2">
              <div className="text-[14px] text-[#6C757D] font-medium mb-4 md:mb-0">
                Showing <span className="font-bold text-[#2C2E33]">1-9</span> of <span className="font-bold text-[#2C2E33]">240</span> enteries
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" className="h-9 px-3.5 border-[#F2F2F2] text-[#4B5563] text-sm font-semibold rounded-lg shadow-none hover:bg-gray-50 cursor-pointer">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
                <Button variant="default" className="h-9 w-9 p-0 bg-[#f97316] hover:bg-[#ea580c] shadow-none text-white flex items-center justify-center text-sm font-semibold rounded-lg cursor-pointer">
                  1
                </Button>
                <Button variant="outline" className="h-9 w-9 p-0 border-[#F2F2F2] text-[#4B5563] hover:bg-gray-50 shadow-none flex items-center justify-center text-sm font-semibold rounded-lg cursor-pointer">
                  2
                </Button>
                <Button variant="outline" className="h-9 w-9 p-0 border-[#F2F2F2] text-[#4B5563] hover:bg-gray-50 shadow-none flex items-center justify-center text-sm font-semibold rounded-lg cursor-pointer">
                  3
                </Button>
                <div className="h-9 w-9 flex items-center justify-center text-[#9CA3AF]">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
                <Button variant="outline" className="h-9 w-9 p-0 border-[#F2F2F2] text-[#4B5563] hover:bg-gray-50 shadow-none flex items-center justify-center text-sm font-semibold rounded-lg cursor-pointer">
                  12
                </Button>
                <Button variant="outline" className="h-9 px-3.5 border-[#F2F2F2] text-[#4B5563] text-sm font-semibold rounded-lg shadow-none hover:bg-gray-50 cursor-pointer">
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="active" className="mt-0 outline-none">
            <div className="py-12 text-center text-[#6C757D] font-medium">
              Active vehicles content
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
