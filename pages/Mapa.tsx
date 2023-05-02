import React from 'react';
import dynamic from 'next/dynamic';

interface Props {
  isFullScreen: boolean;
  setIsFullScreen: (val: boolean) => void;
  isZoomInClicked: boolean;
  setIsZoomInClicked: (val: boolean) => void;
  isZoomOutClicked: boolean;
  setIsZoomOutClicked: (val: boolean) => void;
  isLocationClicked: boolean;
  isFireButtonClicked: boolean;
  isSimplifiedDatas: boolean;
  areMunicipalBoundariesVisible: boolean;
  isSettingsVisible: boolean;
  cityId: number;
  isAutocomplete: boolean;
  setIsDataLoading: (val: boolean) => void;
}

function Mapa({
  isFullScreen,
  setIsFullScreen,
  isZoomInClicked,
  setIsZoomInClicked,
  isZoomOutClicked,
  setIsZoomOutClicked,
  isLocationClicked,
  isFireButtonClicked,
  isSimplifiedDatas,
  areMunicipalBoundariesVisible,
  isSettingsVisible,
  cityId,
  isAutocomplete,
  setIsDataLoading,
}: Props) {
  const Map = React.useMemo(
    () =>
      dynamic(
        () => import('../components/Map/Map'), // replace '@components/map' with your component's location
        {
          loading: () => <p>O mapa está carregando</p>,
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    [
      /* list variables which should trigger a re-render here */
    ]
  );
  return (
    <Map
      isFullScreen={isFullScreen}
      setIsFullScreen={setIsFullScreen}
      isZoomInClicked={isZoomInClicked}
      setIsZoomInClicked={setIsZoomInClicked}
      isZoomOutClicked={isZoomOutClicked}
      setIsZoomOutClicked={setIsZoomOutClicked}
      isLocationClicked={isLocationClicked}
      isFireButtonClicked={isFireButtonClicked}
      isSimplifiedDatas={isSimplifiedDatas}
      areMunicipalBoundariesVisible={areMunicipalBoundariesVisible}
      isSettingsVisible={isSettingsVisible}
      cityId={cityId}
      isAutocomplete={isAutocomplete}
      setIsDataLoading={setIsDataLoading}
    />
  );
}

export default Mapa;
