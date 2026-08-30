'use client';

import { ExternalLink, MapPin } from 'lucide-react';

interface LocationMapProps {
  lat: number;
  lng: number;
  title?: string;
  className?: string;
}

export function LocationMap({
  lat,
  lng,
  title = 'Property Location',
  className = 'w-full h-[360px]',
}: LocationMapProps) {
  if (!lat || !lng) {
    return null;
  }

  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`;
  const externalUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div className={`relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 ${className}`}>
      <iframe
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={embedUrl}
        className="w-full h-full min-h-[360px]"
      />
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3.5 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-md text-xs font-medium text-neutral-800 hover:bg-white transition-all border border-gray-200 hover:shadow-lg"
      >
        <MapPin className="w-4 h-4 text-primary" />
        <span>Open in Google Maps</span>
        <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
      </a>
    </div>
  );
}
