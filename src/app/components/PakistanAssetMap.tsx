import React from 'react';
import { MapContainer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import { useNavigate } from 'react-router';
import { BasemapLayers } from './BasemapLayers';
import type { Asset } from '../data/mockData';
import { divIcon, latLngBounds } from 'leaflet';
import { Expand, Minimize2, Crosshair } from 'lucide-react';

interface PakistanAssetMapProps {
  assets: Asset[];
  height?: number;
}

const mapCenter: [number, number] = [30.3753, 69.3451];

const riskConfig = {
  Safe: { color: '#16a34a', label: 'Safe' },
  Watch: { color: '#f59e0b', label: 'Needs Attention' },
  Critical: { color: '#dc2626', label: 'Critical' },
};

function FitToAssets({ assets }: { assets: Asset[] }) {
  const map = useMap();

  React.useEffect(() => {
    if (!assets.length) {
      return;
    }

    const bounds = latLngBounds(assets.map((asset) => [asset.location.lat, asset.location.lng]));
    map.fitBounds(bounds, { padding: [32, 32] });
  }, [assets, map]);

  return null;
}

function buildPinIcon(asset: Asset) {
  const color = riskConfig[asset.riskLevel].color;
  const symbol = asset.type === 'Bridge' ? 'B' : 'G';

  return divIcon({
    html: `<div style="width: 22px; height: 22px; border-radius: 999px; background: ${color}; border: 2px solid #ffffff; color: #ffffff; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">${symbol}</div>`,
    className: 'asset-pin-icon',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

export function PakistanAssetMap({ assets, height = 420 }: PakistanAssetMapProps) {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const mapHeight = isFullscreen ? 'calc(100vh - 32px)' : `${height}px`;

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 relative ${
        isFullscreen ? 'fixed inset-4 z-[999] bg-white shadow-2xl rounded-xl' : ''
      }`}
    >
      <div className="absolute right-3 top-3 z-[1000] flex items-center gap-2">
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
        center={mapCenter}
        zoom={5}
        style={{ height: mapHeight, width: '100%' }}
        scrollWheelZoom
      >
        <FitToAssets assets={assets} />
        <BasemapLayers defaultBasemap="esri-streets" />
        {assets.map((asset) => {
          const config = riskConfig[asset.riskLevel];
          return (
            <React.Fragment key={asset.id}>
              <Circle
                center={[asset.location.lat, asset.location.lng]}
                radius={35}
                pathOptions={{ color: config.color, fillColor: config.color, fillOpacity: 0.1, weight: 1 }}
              />
              <Marker
                position={[asset.location.lat, asset.location.lng]}
                icon={buildPinIcon(asset)}
                eventHandlers={{ click: () => navigate(`/asset/${asset.id}`) }}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-semibold">{asset.name}</p>
                    <p className="text-xs text-gray-600">{asset.id} • {asset.type}</p>
                    <p className="text-xs text-gray-600">{asset.district}, {asset.province}</p>
                    <p className="text-xs text-gray-700 font-mono flex items-center gap-1">
                      <Crosshair className="h-3 w-3" />
                      {asset.location.lat.toFixed(6)}, {asset.location.lng.toFixed(6)}
                    </p>
                    <a
                      href={`https://www.google.com/maps?q=${asset.location.lat},${asset.location.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-700 underline"
                    >
                      Open exact location in Google Maps
                    </a>
                    <p className="text-xs" style={{ color: config.color }}>
                      {config.label}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
