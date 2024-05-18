import React from 'react';
import Head from 'next/head';
import { Grid, Box, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import Paper from '@mui/material/Paper';

import plantaDeFundo from '../public/images/planta-de-fundo.svg';
import Menu from '../components/MainMenu';

export default function Ajuda() {
  const topicos: Array<{ titulo: string; conteudo: string }> = [];

  return (
    <>
      <Head>
        <title>EcoGis - Ajuda</title>
      </Head>
      <Menu />
      <Box
        sx={{
          backgroundImage: `url(${plantaDeFundo.src})`,
          paddingTop: 5,
          height: 'calc(100vh - 64px)',
        }}
      >
        {topicos.length > 0 && (
          <Grid container sx={{ marginTop: 5, justifyContent: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 500, marginBottom: 5, textAlign: 'center' }}>
              Tópicos frequentes
            </Typography>
            <Grid item>
              {topicos.map((topico, index) => {
                return (
                  <Accordion sx={{ marginTop: 2 }} key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{topico.titulo}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{topico.conteudo}</Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Grid>
          </Grid>
        )}

        <Grid item lg={8} sx={{ bgColor: '#000' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 500, color: 'secondary', textAlign: 'center' }}
          >
            Ainda tem dúvida, <br /> Entre em contato com a gente:
          </Typography>
        </Grid>
        <Grid container justifyContent={'center'} marginTop={5}>
          <Paper sx={{ maxWidth: '200px', textAlign: 'center', padding: '10px', color: '#0F1C3C' }}>
            <EmailIcon color="secondary" sx={{ fontSize: 60 }} />
            <Typography variant="body1">Email</Typography>
            <Typography variant="body2" marginTop={2}>
              {process.env.NEXT_PUBLIC_EMAIL_CONTATO}
            </Typography>
          </Paper>
        </Grid>
      </Box>
    </>
  );
}
