"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, FileText, Plus, X, UploadCloud, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Image from "next/image";

const ITEMS = [
  ...Array(6).fill({
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    make: "Mercedes-Benz S-Class",
    id: "ID:#FL-2291",
    type: "Sedan",
    plate: "ABC-1234",
    year: "Oct 12, 2025",
    status: "Active"
  })
];

export default function TransportListPage() {
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-[20px] p-6 border border-[#F2F2F2] shadow-sm flex flex-col justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#22C55E]">
            <CalendarDays className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="text-[#6C757D] text-[15px] font-medium">Active</div>
          <div className="text-[32px] font-bold text-[#2C2E33] leading-none">42</div>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-[20px] p-6 border border-[#F2F2F2] shadow-sm flex flex-col justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#22C55E]">
            <CalendarDays className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="text-[#6C757D] text-[15px] font-medium">In Trip</div>
          <div className="text-[32px] font-bold text-[#2C2E33] leading-none">12</div>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-[20px] p-6 border border-[#F2F2F2] shadow-sm flex flex-col justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#22C55E]">
            <CalendarDays className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="text-[#6C757D] text-[15px] font-medium">Total Vehicles</div>
          <div className="text-[32px] font-bold text-[#2C2E33] leading-none">48</div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-[20px] p-6 border border-[#F2F2F2] shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-[20px] font-bold text-[#2C2E33]">Vehicles List</h2>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <Button variant="outline" className="border-[#E5E7EB] text-[#4B5563] font-medium h-10 px-4 rounded-lg flex-1 md:flex-none">
              <FileText className="w-4 h-4 mr-2" />
              Export History
            </Button>
            
            <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white font-medium h-10 px-4 rounded-lg flex-1 md:flex-none">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] p-0 rounded-2xl overflow-hidden border-0 gap-0 shadow-xl [&>button]:hidden">
                <div className="p-6 border-b border-[#F2F2F2]">
                  <DialogHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <DialogTitle className="text-[20px] font-bold text-[#2C2E33]">Add New Vehicle</DialogTitle>
                        <p className="text-sm text-[#6C757D] mt-1.5 font-medium">Enter vehicle details and features.</p>
                      </div>
                      <DialogClose className="rounded-full w-8 h-8 flex items-center justify-center bg-[#F9FAFB] hover:bg-gray-100 text-[#6C757D] transition-colors flex-shrink-0">
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
                         <SelectTrigger className="h-11 bg-[#F9FAFB] border-[#F2F2F2] rounded-lg text-sm text-[#2C2E33] shadow-none focus:ring-0 focus:ring-offset-0">
                           <SelectValue placeholder="2024" />
                         </SelectTrigger>
                         <SelectContent className="rounded-xl">
                           <SelectItem value="2024">2024</SelectItem>
                           <SelectItem value="2025">2025</SelectItem>
                           <SelectItem value="2026">2026</SelectItem>
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
                     <div className="h-[140px] rounded-xl bg-[#F9FAFB] border border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-orange-50/50 flex items-center justify-center text-[#f97316]">
                           <UploadCloud className="w-5 h-5 flex-shrink-0 stroke-[1.5]" />
                        </div>
                        <span className="text-[13px] text-[#4B5563] font-medium">Main Image</span>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <Label className="text-sm font-semibold text-[#2C2E33]">Amenities & Features</Label>
                     <div className="flex flex-wrap gap-2.5">
                        {['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'USB Charging'].map((amenity, i) => (
                           <div key={i} className="flex items-center gap-2 px-3.5 py-2 bg-[#F9FAFB] border border-[#F2F2F2] rounded-lg text-[13px] text-[#2C2E33] font-medium">
                             {amenity}
                             <X className="w-3.5 h-3.5 text-[#6C757D] cursor-pointer hover:text-gray-900 transition-colors" />
                           </div>
                        ))}
                     </div>
                  </div>
                </div>

                <div className="px-6 py-5 border-t border-[#F2F2F2] flex justify-end gap-3 bg-white">
                   <Button 
                     variant="outline" 
                     className="h-11 px-6 bg-[#F9FAFB] hover:bg-gray-100 border-0 text-[#2C2E33] font-semibold rounded-lg shadow-none" 
                     onClick={() => setIsAddVehicleOpen(false)}
                   >
                     Cancel
                   </Button>
                   <Button className="h-11 px-6 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold rounded-lg shadow-none">
                     Add to New Vehicle
                   </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-transparent border-b border-[#F2F2F2] w-full justify-start rounded-none h-auto p-0 mb-6 gap-6">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#f97316] data-[state=active]:text-[#2C2E33] data-[state=active]:shadow-none rounded-none px-0 py-3 bg-transparent hover:bg-transparent text-[#6C757D] font-bold text-[15px]"
            >
              All Vehicles
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#f97316] data-[state=active]:text-[#2C2E33] data-[state=active]:shadow-none rounded-none px-0 py-3 bg-transparent hover:bg-transparent text-[#6C757D] font-bold text-[15px]"
            >
              Active
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0 outline-none">
             {/* List Header */}
             <div className="grid grid-cols-12 gap-4 py-3.5 px-4 bg-[#F9FAFB] text-[#6C757D] text-[13px] font-medium rounded-xl mb-3">
               <div className="col-span-1 flex items-center justify-center"><Checkbox className="rounded border-gray-300 data-[state=checked]:bg-[#f97316] data-[state=checked]:border-[#f97316]" /></div>
               <div className="col-span-3">Vehicle</div>
               <div className="col-span-2">Type</div>
               <div className="col-span-2">License Plate</div>
               <div className="col-span-2">Year</div>
               <div className="col-span-1">Status</div>
               <div className="col-span-1 text-right">Action</div>
             </div>

             {/* Items */}
             <div className="flex flex-col">
               {ITEMS.map((item, i) => (
                 <div key={i} className="grid grid-cols-12 gap-4 py-4 px-4 items-center border-b border-[#F2F2F2] last:border-0 hover:bg-gray-50/50 transition-colors">
                   <div className="col-span-1 flex items-center justify-center">
                     <Checkbox className="rounded border-gray-300 data-[state=checked]:bg-[#f97316] data-[state=checked]:border-[#f97316]" />
                   </div>
                   <div className="col-span-3 flex items-center space-x-3.5">
                     <div className="relative w-[52px] h-[40px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                       <Image src={item.image} alt={item.make} fill className="object-cover" />
                     </div>
                     <div className="min-w-0">
                        <div className="text-[14px] font-semibold text-[#2C2E33] truncate">{item.make}</div>
                        <div className="text-[12px] font-medium text-[#9CA3AF] mt-0.5">{item.id}</div>
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
                     <button className="text-[#f97316] hover:text-[#ea580c] text-[13px] font-semibold underline-offset-4 hover:underline">
                       View Details
                     </button>
                   </div>
                 </div>
               ))}
             </div>

             {/* Pagination */}
             <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-2">
                <div className="text-[14px] text-[#6C757D] font-medium mb-4 md:mb-0">
                  Showing <span className="font-bold text-[#2C2E33]">1-9</span> of <span className="font-bold text-[#2C2E33]">240</span> enteries
                </div>
                
                <div className="flex items-center space-x-2">
                   <Button variant="outline" className="h-9 px-3.5 border-[#F2F2F2] text-[#4B5563] text-sm font-semibold rounded-lg shadow-none hover:bg-gray-50">
                     <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                   </Button>
                   <Button variant="default" className="h-9 w-9 p-0 bg-[#f97316] hover:bg-[#ea580c] shadow-none text-white flex items-center justify-center text-sm font-semibold rounded-lg">
                     1
                   </Button>
                   <Button variant="outline" className="h-9 w-9 p-0 border-[#F2F2F2] text-[#4B5563] hover:bg-gray-50 shadow-none flex items-center justify-center text-sm font-semibold rounded-lg">
                     2
                   </Button>
                   <Button variant="outline" className="h-9 w-9 p-0 border-[#F2F2F2] text-[#4B5563] hover:bg-gray-50 shadow-none flex items-center justify-center text-sm font-semibold rounded-lg">
                     3
                   </Button>
                   <div className="h-9 w-9 flex items-center justify-center text-[#9CA3AF]">
                     <MoreHorizontal className="w-4 h-4" />
                   </div>
                   <Button variant="outline" className="h-9 w-9 p-0 border-[#F2F2F2] text-[#4B5563] hover:bg-gray-50 shadow-none flex items-center justify-center text-sm font-semibold rounded-lg">
                     12
                   </Button>
                   <Button variant="outline" className="h-9 px-3.5 border-[#F2F2F2] text-[#4B5563] text-sm font-semibold rounded-lg shadow-none hover:bg-gray-50">
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
