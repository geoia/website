import DisplayGeoJsons from '../components/Map/DisplayGeoJsons';

export function locationButtonAction(
  isLocationClicked: boolean,
  setIsMarkerOpen: (val: boolean) => void,
  map: L.Map
) {
  if (isLocationClicked) {
    map.locate({ setView: true });
    setIsMarkerOpen(true);
  } else {
    setIsMarkerOpen(false);
  }
}

export function zoomInButtonAction(
  isZoomInClicked: boolean,
  setIsZoomInClicked: (val: boolean) => void,
  map: L.Map
) {
  if (isZoomInClicked) {
    map.zoomIn();
    setIsZoomInClicked(false);
  }
}

export function zoomOutButtonAction(
  isZoomOutClicked: boolean,
  setIsZoomOutClicked: (val: boolean) => void,
  map: L.Map
) {
  if (isZoomOutClicked) {
    map.zoomOut();
    setIsZoomOutClicked(false);
  }
}

export function fullScreenAction(isFullScreen: boolean, setIsFullScreen: (val: boolean) => void) {
  if (isFullScreen) {
    setIsFullScreen(false);
  }
}

export function displayFireData(isFireButtonActive: boolean, isSimplified: boolean) {
  if (isFireButtonActive && isSimplified) {
    return <DisplayGeoJsons simplified={isSimplified} />;
  } else if (isFireButtonActive && !isSimplified) {
    return <DisplayGeoJsons simplified={isSimplified} />;
  }
}
