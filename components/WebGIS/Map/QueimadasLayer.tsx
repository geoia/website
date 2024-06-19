import { GeoJSON, useMap } from 'react-leaflet';
import { area, FeatureCollection, Polygon } from '@turf/turf';
import L from 'leaflet';
import { Feature, Geometry } from 'geojson';
import format from '../../../helpers/formatter';

export default function QueimadasLayer({ queimadas }: { queimadas: FeatureCollection<Polygon> }) {
  const map = useMap();

  const defaultStyle = {
    fillColor: '#ff0000',
    fillOpacity: 0.5,
    weight: 1,
    opacity: 0.75,
    color: '#ff0000',
  };

  const onEachFeature = (feature: Feature<Geometry>, layer: L.Layer) => {
    if (feature.properties) {
      layer.on({
        mouseover: (e: L.LeafletMouseEvent) => {
          e.target.setStyle({ ...defaultStyle, fillOpacity: 1 });
          const popup = L.tooltip()
            .setLatLng(e.latlng)
            .setContent(`<b>Área queimada:</b> ${format.area(area(feature))}`)
            .openOn(map);
          e.target.bindTooltip(popup).openTooltip();
        },
        mouseout: (e: L.LeafletMouseEvent) => {
          e.target.setStyle(defaultStyle);
          e.target.closeTooltip();
        },
      });
    }
  };

  return (
    <GeoJSON
      data={queimadas}
      pathOptions={defaultStyle}
      onEachFeature={onEachFeature}
      key={area(queimadas)}
    />
  );
}
