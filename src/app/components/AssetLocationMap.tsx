import React from 'react';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import { BasemapLayers } from './BasemapLayers';
import type { Asset } from '../data/mockData';
import { divIcon } from 'leaflet';
import { Expand, Minimize2 } from 'lucide-react';

interface AssetLocationMapProps {
  asset: Asset;
}

export function AssetLocationMap({ asset }: AssetLocationMapProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const icon = divIcon({
    html: '<div style="width: 18px; height: 18px; border-radius: 999px; background: #1d4ed8; border: 2px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.25);"></div>',
    className: 'asset-location-icon',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 relative ${
        isFullscreen ? 'fixed inset-4 z-[999] bg-white shadow-2xl rounded-xl' : ''
      }`}
    >
      <div className="absolute right-3 top-3 z-[1000]">
        <button
          className="bg-gradient-to-r from-blue-600 to-violet-600 border border-blue-500 rounded-md px-3 py-1.5 text-xs font-medium text-white hover:from-blue-700 hover:to-violet-700 shadow-[0_4px_0_rgba(30,64,175,0.9),0_10px_22px_rgba(37,99,235,0.3)] hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-[0_2px_0_rgba(30,64,175,0.86),0_6px_14px_rgba(37,99,235,0.26)] flex items-center gap-1 transition-all"
          onClick={() => setIsFullscreen((prev) => !prev)}
          aria-label={isFullscreen ? 'Exit fullscreen map' : 'Open fullscreen map'}
        >
          {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Expand className="h-3.5 w-3.5" />}
          {isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
        </button>
      </div>

      <MapContainer
        center={[asset.location.lat, asset.location.lng]}
        zoom={13}
        style={{ height: isFullscreen ? 'calc(100vh - 32px)' : '230px', width: '100%' }}
        scrollWheelZoom
      >
        <BasemapLayers defaultBasemap="esri-hybrid" />
        <Marker position={[asset.location.lat, asset.location.lng]} icon={icon}>
          <Popup>
            <div className="space-y-1">
              <p className="font-semibold">{asset.name}</p>
              <p className="text-xs text-gray-600">{asset.district}, {asset.province}</p>
              <p className="text-xs text-gray-600 font-mono">
                {asset.location.lat.toFixed(6)}, {asset.location.lng.toFixed(6)}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
