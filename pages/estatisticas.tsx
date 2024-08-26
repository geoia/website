import React, { useState } from 'react';
import Head from 'next/head';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
} from '@mui/material';
import Menu from '../components/MainMenu';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import EstatisticasChart from '../components/Estatisticas/EstatisticasChart'; 
import FilterBar from '../components/Estatisticas/FilterBar';

const dataBar = [
  { name: 'Category 1', uv: 225 },
  { name: 'Category 2', uv: 256 },
  // ...restante dos dados
];


export default function Estatisticas() {

const [estadoId, setEstadoId] = useState<string | null>(null);

const handleEstadoChange = (id: string) => {
  setEstadoId(id);
};

  return (
    <>
      <Head>
        <title>WegGis - Estatísticas</title>
        <style>
          {`
            html, body {
              height: 100%;
              margin: 0;
              background-color: #0F1C3C !important;
            }
          `}
        </style>
      </Head>
      <Menu />
      <FilterBar onEstadoChange={handleEstadoChange}></FilterBar>

      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#0F1C3C',
          padding: 2,
          marginTop: '4rem',
        }}
      >
        {/* Primeira Camada: Gráfico de Barras + Tabelas */}
        <Grid item xs={12} lg={6}>
          <Card
            sx={{
              backgroundColor: '#509CBF',
              borderRadius: '25px',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <CardContent sx={{ padding: 3, flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{ color: 'white', marginBottom: 2, textAlign: 'center' }}
              >
                Gráfico de Barras
              </Typography>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  padding: '15px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '300px',
                }}
              >
                <BarChart width={500} height={250} data={dataBar}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: '#509CBF',
                  borderRadius: '25px',
                  height: '100%',
                }}
              >
                <CardContent sx={{ padding: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: 'white', marginBottom: 2, textAlign: 'center' }}
                  >
                    Tabela de Dados
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '15px',
                      padding: '15px',
                      overflow: 'auto',
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Coluna 1</TableCell>
                          <TableCell>Coluna 2</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Dado 1</TableCell>
                          <TableCell>Dado 2</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Dado 3</TableCell>
                          <TableCell>Dado 4</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: '#509CBF',
                  borderRadius: '25px',
                  height: '100%',
                }}
              >
                <CardContent sx={{ padding: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: 'white', marginBottom: 2, textAlign: 'center' }}
                  >
                    Tabela de Dados
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '15px',
                      padding: '15px',
                      overflow: 'auto',
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Coluna 1</TableCell>
                          <TableCell>Coluna 2</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Dado 1</TableCell>
                          <TableCell>Dado 2</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Dado 3</TableCell>
                          <TableCell>Dado 4</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Segunda Camada: Gráfico de Linhas utilizando EstatisticasChart */}
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Card
            sx={{
              backgroundColor: '#509CBF',
              borderRadius: '25px',
            }}
          >
            <CardContent sx={{ padding: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: 'white', marginBottom: 2, textAlign: 'center' }}
              >
                Gráfico de Linhas
              </Typography>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  padding: '15px',
                }}
              >
                {estadoId && <EstatisticasChart estadoId={estadoId} title="Estatísticas de Queimadas" />}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
