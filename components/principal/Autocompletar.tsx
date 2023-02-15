import React from 'react';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/system';
import Search from '@mui/icons-material/Search';

const Input = styled('input')(({ theme }) => ({
  width: '100%',
  height: '38px',
  backgroundColor: '#509CBF',
  marginLeft: '20px',
  border: '0px',
  borderColor: '#509CBF',
  borderRadius: '20px',
  color: 'white',
  fontSize: '16px',
  fontWeight: 'normal',
  '::-webkit-input-placeholder': {
    color: 'white',
  },
  ':focus': { boxShadow: '0 0 0 0', border: '0 none', outline: 0 },
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: '99.4%',
  zIndex: '-1',
  position: 'absolute',
  top: '15px',
  margin: 0,
  padding: 0,
  paddingTop: '25px',
  listStyle: 'none',
  backgroundColor: 'rgba(80,156,191, 1)',
  color: '#fff',
  fontWeight: 'normal',
  overflow: 'hidden',
  maxHeight: 100,
  borderRadius: '10px',
  '& li.Mui-focused': {
    backgroundColor: 'rgba(34, 115, 153, 0.4)',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: 'rgba(34, 115, 153, 7)',
  },
}));

export default function Pesquisa() {
  const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
    useAutocomplete({
      options: cidades,
      getOptionLabel: (option) => option.nome,
    });

  return (
    <div style={{ width: '100%', margin: '-1rem' }}>
      <div {...getRootProps()}>
        <Search
          fontSize="large"
          sx={{
            width: '25px',
            color: 'white',
            position: 'absolute',
            right: '-20px',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        />
        <Input {...getInputProps()} placeholder="Pesquise um endereço" />
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {(groupedOptions as typeof cidades).map((option, index) => (
              <li
                style={{
                  borderBottom: '1px solid white',
                }}
                {...getOptionProps({ option, index })}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {option.nome}
              </li>
            ))}
          </Listbox>
        ) : null}
      </div>
    </div>
  );
}

const cidades = [
  { nome: 'Anastácio' },
  { nome: 'Bodoquena' },
  { nome: 'Coxim' },
  { nome: 'Dourados' },
  { nome: 'Eldorado' },
  { nome: 'Figueirão' },
  { nome: 'Naviraí' },
  { nome: 'São Gabriel do Oeste' },
  { nome: 'Rio Verde' },
  { nome: 'Alcinópolis' },
  { nome: 'Bandeirantes' },
  { nome: 'Jaraguari' },
  { nome: 'Sidrolândia' },
  { nome: 'Maracaju' },
  { nome: 'Dois Irmãos do Buriti' },
  { nome: 'Aparecida do Taboado' },
  { nome: 'Chapadão do Sul' },
  { nome: 'Bonito' },
  { nome: 'Camapuã' },
  { nome: 'Campo Grande' },
];
