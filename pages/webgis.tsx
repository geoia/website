import Head from 'next/head';

import React, { useState } from 'react';

import DownloadModal from '../components/principal/DownloadModal';
import MenuModal from '../components/principal/MenuModal';
import CalendarModal from '../components/principal/CalendarModal';
import Settings from '../components/principal/Settings';
import { Grid } from '@mui/material';
import Pesquisa from '../components/principal/Autocompletar';
import {
  CalendarBotao,
  DownloadBotao,
  FireBotao,
  ForestBotao,
  RoadBotao,
  WaterBotao,
  AddBotao,
  RemoveBotao,
  CropBotao,
  MapBotao,
  SettingsBotao,
} from '../components/principal/Botao';
import dynamic from 'next/dynamic';

export default function Principal() {
  const [anchorElementOfDownloadButton, setAnchorElementOfDownloadButton] =
    useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isFireButtonClicked, setIsFireButtonClicked] = useState(true);
  const [isZoomInClicked, setIsZoomInClicked] = useState(false);
  const [isZoomOutClicked, setIsZoomOutClicked] = useState(false);
  const [isLocationClicked, setIsLocationClicked] = useState(false);
  const [isSimplifiedDatas, setIsSimplifiedDatas] = useState(false);
  const [cityId, setCityId] = useState(5003207);

  const Mapa = React.useMemo(
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
    <>
      <Head>
        <title>GeoIA - WebGis</title>
      </Head>

      <Mapa
        isZoomInClicked={isZoomInClicked}
        setIsZoomInClicked={setIsZoomInClicked}
        isZoomOutClicked={isZoomOutClicked}
        setIsZoomOutClicked={setIsZoomOutClicked}
        isLocationClicked={isLocationClicked}
        isFireButtonClicked={isFireButtonClicked}
        isSimplifiedDatas={isSimplifiedDatas}
        cityId={cityId}
      />

      <Grid
        sx={{
          position: 'absolute',
          top: 0,
          margin: '1rem',
          display: 'flex',
          alignItems: 'center',
          width: '40%',
          height: '40px',
          background: '#509CBF',
          borderRadius: '20px',
        }}
      >
        <picture>
          <img src="/logo.svg" title="Logo" height="60px" alt="" />
        </picture>
        <Pesquisa cityId={cityId} onChange={(id) => id && setCityId(id)} />
      </Grid>

      <Grid
        sx={{
          position: 'absolute',
          width: '50px',
          height: '180px',
          top: 0,
          right: 0,
          margin: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          '@media (max-width: 1500px)': {
            width: '45px',
            height: '160px',
          },
        }}
      >
        <SettingsBotao
          isSettingsVisible={isSettingsVisible}
          setIsSettingsVisible={setIsSettingsVisible}
        />
        <CalendarBotao onClick={() => setIsCalendarModalOpen(true)} />
        <DownloadBotao
          onClick={(event: React.MouseEvent<HTMLElement>) =>
            setAnchorElementOfDownloadButton(event.currentTarget)
          }
        />
      </Grid>
      <Grid
        sx={{
          position: 'absolute',
          width: '50px',
          height: '240px',
          top: '50%',
          right: 0,
          margin: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: 'translateY(-50%)',
          '@media (max-width: 1500px)': {
            width: '45px',
            height: '215px',
          },
        }}
      >
        <FireBotao
          isFireButtonClicked={isFireButtonClicked}
          setIsFireButtonClicked={setIsFireButtonClicked}
        />
        <ForestBotao />
        <RoadBotao />
        <WaterBotao />
      </Grid>
      <Grid
        sx={{
          position: 'absolute',
          width: '240px',
          height: '50px',
          bottom: 0,
          right: 0,
          margin: '1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          '@media (max-width: 1500px)': {
            height: '45px',
            width: '215px',
          },
        }}
      >
        <AddBotao onClick={() => setIsZoomInClicked(true)} />
        <RemoveBotao onClick={() => setIsZoomOutClicked(true)} />
        <CropBotao
          onClick={() => {
            var elem = document.documentElement;
            if (elem.requestFullscreen) elem.requestFullscreen();
          }}
        />
        <MapBotao onClick={() => setIsLocationClicked(!isLocationClicked)} />
      </Grid>
      <DownloadModal
        anchorEl={anchorElementOfDownloadButton}
        setAnchorEl={setAnchorElementOfDownloadButton}
        isFireButtonClicked={isFireButtonClicked}
        setIsFireButtonClicked={setIsFireButtonClicked}
        isSimplifiedDatas={isSimplifiedDatas}
      />
      <MenuModal
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        setIsSettingsVisible={setIsSettingsVisible}
      />
      <CalendarModal
        isCalendarModalOpen={isCalendarModalOpen}
        setIsCalendarModalOpen={setIsCalendarModalOpen}
      />
      <Settings
        isSettingsVisible={isSettingsVisible}
        setIsSettingsVisible={setIsSettingsVisible}
        setIsSimplifiedDatas={setIsSimplifiedDatas}
      />
    </>
  );
}
