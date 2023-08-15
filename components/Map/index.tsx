import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import EventsListenerOfMap, { MapEvents } from './Controlador';
import QueimadasGeoJson from './QueimadasGeoJson';
import useLimitesMunicipios from '../../hooks/useLimitesMunicipios';
import Localizacao from './Localizacao';

const center = {
  lat: -20.2634,
  lng: -54.3847,
};

interface Props {
  showLocalizacao: boolean;
  showQueimadas: boolean;
  simplificado: boolean;
  municipio: number;
  source?: string;
  forwardRef?: React.RefObject<MapEvents>;
}

function Map({
  showLocalizacao,
  showQueimadas,
  simplificado,
  municipio,
  source,
  forwardRef,
}: Props) {
  const { data } = useLimitesMunicipios(municipio);

  useEffect(() => {
    if (data) forwardRef?.current?.centralize(data.coordinates);
  }, [data, forwardRef]);

  return (
    <MapContainer
      center={center}
      zoom={7}
      zoomControl={false}
      minZoom={5}
      scrollWheelZoom={true}
      style={{ width: '100vw', height: '100vh', zIndex: '0' }}
      inertia={false}
      inertiaDeceleration={0}
      zoomAnimation={true}
      maxBoundsViscosity={10}
      preferCanvas={true}
      maxBounds={[
        [-32.63463151377654, -90.89969605983609],
        [5.63463151377654, -20.89969605983609],
      ]}
    >
      <EventsListenerOfMap ref={forwardRef} />
      {showLocalizacao && <Localizacao />}
      <TileLayer
        url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWF0aGV1cy1uYW50ZXMiLCJhIjoiY2xhMXpoeTRrMDBvYTNvbWZvZXpua2htOCJ9.PeFH8oujEq1AI6a8-tkk7w"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      {showQueimadas && (
        <QueimadasGeoJson municipio={municipio} simplified={simplificado} source={source} />
      )}

      {data && (
        <GeoJSON
          key={municipio}
          data={data}
          pathOptions={{
            dashArray: '3',
            fillColor: '#90ee90',
            fillOpacity: 0.3,
            weight: 2,
            opacity: 1,
            color: '#d3d3d3',
          }}
          eventHandlers={{
            mouseover: (e) => {
              const layer = e.target;
              layer.setStyle({
                dashArray: '3',
                fillColor: '#90ee90',
                fillOpacity: 0.5,
                weight: 2,
                opacity: 1,
                color: '#d3d3d3',
              });
            },
            mouseout: (e) => {
              const layer = e.target;
              layer.setStyle({
                fillOpacity: 0.3,
                weight: 2,
                dashArray: '3',
                color: '#d3d3d3',
                fillColor: '#90ee90',
              });
            },
            click: (e) => {},
          }}
        />
      )}
    </MapContainer>
  );
}

export default Map;
