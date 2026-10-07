import React from 'react';
import { LayersControl, LayerGroup, TileLayer } from 'react-leaflet';

/**
 * Free basemaps — no login, no API key.
 * Esri tiles are free for non-commercial / light use with attribution.
 */

const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services';
const ESRI_ATTR = 'Tiles &copy; Esri';

export type BasemapId =
  | 'esri-streets'
  | 'esri-hybrid'
  | 'esri-imagery'
  | 'esri-topo'
  | 'esri-gray'
  | 'osm'
  | 'carto-voyager';

interface BasemapLayersProps {
  defaultBasemap?: BasemapId;
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
}

export function BasemapLayers({ defaultBasemap = 'esri-streets', position = 'bottomright' }: BasemapLayersProps) {
  const is = (id: BasemapId) => defaultBasemap === id;

  return (
    <LayersControl position={position}>
      <LayersControl.BaseLayer checked={is('esri-streets')} name="Esri Streets">
        <TileLayer
          attribution={`${ESRI_ATTR} &mdash; Esri, HERE, Garmin, USGS, NGA`}
          url={`${ESRI}/World_Street_Map/MapServer/tile/{z}/{y}/{x}`}
          maxZoom={19}
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer checked={is('esri-hybrid')} name="Esri Satellite + Labels">
        <LayerGroup>
          <TileLayer
            attribution={`${ESRI_ATTR} &mdash; Esri, Maxar, Earthstar Geographics`}
            url={`${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`}
            maxZoom={19}
          />
          <TileLayer
            url={`${ESRI}/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`}
            maxZoom={19}
          />
          <TileLayer
            url={`${ESRI}/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}`}
            maxZoom={19}
          />
        </LayerGroup>
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer checked={is('esri-imagery')} name="Esri Satellite">
        <TileLayer
          attribution={`${ESRI_ATTR} &mdash; Esri, Maxar, Earthstar Geographics`}
          url={`${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`}
          maxZoom={19}
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer checked={is('esri-topo')} name="Esri Topographic">
        <TileLayer
          attribution={`${ESRI_ATTR} &mdash; Esri, HERE, Garmin, FAO, NOAA, USGS`}
          url={`${ESRI}/World_Topo_Map/MapServer/tile/{z}/{y}/{x}`}
          maxZoom={19}
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer checked={is('esri-gray')} name="Esri Light Gray">
        <LayerGroup>
          <TileLayer
            attribution={`${ESRI_ATTR} &mdash; Esri, HERE, Garmin`}
            url={`${ESRI}/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}`}
            maxZoom={16}
          />
          <TileLayer
            url={`${ESRI}/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}`}
            maxZoom={16}
          />
        </LayerGroup>
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer checked={is('osm')} name="OpenStreetMap">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
      </LayersControl.BaseLayer>

      <LayersControl.BaseLayer checked={is('carto-voyager')} name="CARTO Voyager">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={20}
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
}
