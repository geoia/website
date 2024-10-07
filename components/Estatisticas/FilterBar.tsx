import React, { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { fetchComEstatisticas } from '../../hooks/useEstatisticas';

const FiltrosContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#0A2846',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  alignItems: 'center',
}));

const FiltroTitle = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginRight: theme.spacing(4),
}));

const FormControlCustom = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  marginRight: theme.spacing(2),
  backgroundColor: '#1A395D',
  borderRadius: theme.shape.borderRadius,
  '& .MuiInputLabel-root': {
    color: '#FFFFFF',
  },
  '& .MuiSelect-select': {
    color: '#FFFFFF',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1A395D',
  },
}));

interface FilterBarProps {
  onLocalChange: (local: string, localId: string, localNome: string) => void;
  initialBiomaId?: string;
  initialEstadoId?: string;
  initialMunicipioId?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ onLocalChange, initialBiomaId, initialEstadoId, initialMunicipioId }) => {
  const [biomas, setBiomas] = useState<{ id: string; nome: string }[]>([]);
  const [estados, setEstados] = useState<{ id: string; nome: string; sigla: string }[]>([]);
  const [municipios, setMunicipios] = useState<{ id: string; nome: string; sigla: string }[]>([]);
  const [biomaSelecionado, setBiomaSelecionado] = useState<string>(initialBiomaId || '');
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>(''); 
  const [municipioSelecionado, setMunicipioSelecionado] = useState<string>(initialMunicipioId || '');
  const [municipiosFiltrados, setMunicipiosFiltrados] = useState<{ id: string; nome: string; sigla: string }[]>([]);
  const [carregandoMunicipios, setCarregandoMunicipios] = useState<boolean>(false);

  
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>(
    initialBiomaId ? 'Biomas' : (initialEstadoId || initialMunicipioId) ? 'Estados' : 'Biomas'
  );

  useEffect(() => {
    if (filtroSelecionado === 'Biomas') {
      fetchBiomas();
    } else {
      fetchEstados();
    }
  }, [filtroSelecionado]);

  
  useEffect(() => {
    if (initialEstadoId && estados.length > 0) {
      
      const estado = estados.find(e => e.id.toString() === initialEstadoId);
      if (estado) {
        setEstadoSelecionado(estado.sigla); 
        fetchMunicipios(estado.sigla); 
      }
    }
  }, [initialEstadoId, estados]);

  
  useEffect(() => {
    if (initialMunicipioId && municipiosFiltrados.length > 0) {
      const municipio = municipiosFiltrados.find(m => m.id.toString() === initialMunicipioId);
      if (municipio) {
        setMunicipioSelecionado(municipio.id.toString());
      }
    }
  }, [initialMunicipioId, municipiosFiltrados]);

  const handleFiltroChange = (event: SelectChangeEvent<string>) => {
    const filtro = event.target.value as string;
    setFiltroSelecionado(filtro);
    setBiomaSelecionado('');
    setEstadoSelecionado('');
    setMunicipioSelecionado('');
    setMunicipiosFiltrados([]);
    onLocalChange('', '', '');
  };

  const fetchBiomas = async () => {
    try {
      const data = await fetchComEstatisticas('biomas');
      setBiomas(data);
    } catch (error) {
      console.error('Erro ao buscar biomas:', error);
    }
  };

  const fetchEstados = async () => {
    try {
      const data = await fetchComEstatisticas('estados');
      setEstados(data);
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
    }
  };

  const fetchMunicipios = async (estadoSigla: string) => {
    setCarregandoMunicipios(true);
    try {
      const data = await fetchComEstatisticas('municipios');
      setMunicipios(data);
      const filteredMunicipios = data.filter((municipio: { sigla: string; }) => municipio.sigla === estadoSigla);
      setMunicipiosFiltrados(filteredMunicipios);
    } catch (error) {
      console.error('Erro ao buscar municípios:', error);
    } finally {
      setCarregandoMunicipios(false);
    }
  };

  const handleBiomaChange = (event: SelectChangeEvent<string>) => {
    const biomaId = event.target.value;
    const bioma = biomas.find(b => b.id === biomaId);
    if (bioma) {
      setBiomaSelecionado(biomaId);
      onLocalChange('biomas', biomaId, bioma.nome);
    }
  };

  const handleEstadoChange = (event: SelectChangeEvent<string>) => {
    const sigla = event.target.value;
    const estado = estados.find(e => e.sigla === sigla);
    if (estado) {
      setEstadoSelecionado(sigla);
      onLocalChange('estados', estado.id.toString(), estado.nome);
      fetchMunicipios(sigla); 
    }
  };

  const handleMunicipioChange = (event: SelectChangeEvent<string>) => {
    const municipioId = event.target.value;
    const municipio = municipiosFiltrados.find(m => m.id.toString() === municipioId);
    if (municipio) {
      setMunicipioSelecionado(municipio.id.toString());
      onLocalChange('municipios', municipio.id.toString(), municipio.nome);
    }
  };

  return (
    <FiltrosContainer>
      <FiltroTitle style={{ marginBottom: 20 }}>Filtros</FiltroTitle>

      <FormControlCustom>
        <InputLabel>Filtrar por</InputLabel>
        <Select value={filtroSelecionado} onChange={handleFiltroChange} label="Filtrar por">
          <MenuItem value="Biomas">Biomas</MenuItem>
          <MenuItem value="Estados">Estados</MenuItem>
        </Select>
      </FormControlCustom>

      {filtroSelecionado === 'Estados' && (
        <>
          <FormControlCustom>
            <InputLabel>Selecionar estado</InputLabel>
            {!estados.length ? (
              <CircularProgress />
            ) : (
              <Select value={estadoSelecionado || ''} onChange={handleEstadoChange}>
                {estados.map((estado) => (
                  <MenuItem key={estado.id} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControlCustom>

          {!carregandoMunicipios && municipiosFiltrados.length > 0 && (
            <FormControlCustom>
              <InputLabel>Selecionar município</InputLabel>
              <Select value={municipioSelecionado || ''} onChange={handleMunicipioChange} label="Selecionar município">
                {municipiosFiltrados.map((municipio) => (
                  <MenuItem key={municipio.id} value={municipio.id.toString()}>
                    {municipio.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControlCustom>
          )}
        </>
      )}

      {filtroSelecionado === 'Biomas' && (
        <FormControlCustom>
          <InputLabel>Selecionar bioma</InputLabel>
          <Select value={biomaSelecionado || ''} onChange={handleBiomaChange}>
            {biomas.map((bioma) => (
              <MenuItem key={bioma.id} value={bioma.id}>
                {bioma.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControlCustom>
      )}
    </FiltrosContainer>
  );
};

export default FilterBar;
