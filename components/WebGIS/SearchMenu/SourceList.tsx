import { Grid, SxProps } from '@mui/material';
import { FormControl, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import HistoryIcon from '@mui/icons-material/History';
import useSources from '../../../hooks/useSources';
import { useMemo } from 'react';

interface Props {
  source?: string;
  onSelect?: (val: string) => void;
  sx?: SxProps;
}

export default function SourceList({ onSelect, source, sx }: Props) {
  const { data: sources, isLoading } = useSources();

  const selectedSource = useMemo(() => source || sources?.[0].source, [source, sources]);

  const handleMonthChange = (event: SelectChangeEvent) => {
    if (onSelect) onSelect(event.target.value);
  };

  return (
    <Grid
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        width: 'auto',
        backgroundColor: '#509CBF',
        color: 'white',
        ...sx,
      }}
    >
      <HistoryIcon
        sx={{
          display: { xs: 'none', sm: 'initial' },
          fontWeight: 'bold',
          marginLeft: '10px',
        }}
      />
      <FormControl
        variant="outlined"
        sx={{
          width: 126,
          '& .MuiInputBase-root': {
            height: '50px',
            color: 'white',
            textAlign: 'left',
            padding: 0,
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
              border: 'none',
            },
          },
        }}
      >
        {!isLoading && (
          <Select
            onChange={handleMonthChange}
            value={selectedSource}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: '#509CBF',
                  height: '300px',
                  transform: 'translateX(-15px)!important',
                  '&::-webkit-scrollbar': {
                    width: '0.4em',
                  },
                  '&::-webkit-scrollbar-track': {
                    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    outline: '1px solid slategrey',
                  },
                },
              },
            }}
          >
            {sources?.map((option, index) => (
              <MenuItem
                key={index}
                value={option.source}
                sx={{
                  color: 'white',
                  justifyContent: 'flex-end',
                  '&:hover': {
                    backgroundColor: '#4689a8',
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </Grid>
  );
}
