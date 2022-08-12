import {
  Box,
  Button,
  Container,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from '@mui/material';
import { 
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
 } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchPokemons } from '../api/fetchPokemons';
import noImage from '../assets/no-image.png';

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [data, setData] = useState(null);

  const offset = (currentPage - 1) * limit;

  const count = data
    ? Math.ceil(data.count / limit)
    : 1;

  useEffect(() => {
    getPokemons(offset, limit);
  }, [currentPage, limit]);

  const getPokemons = async (offset, limit) => {
    const pokemons = await fetchPokemons(
      offset,
      limit
    );
    setData(pokemons);
  };

  const handlePaginationChange = (
    event,
    page
  ) => {
    setCurrentPage(page);
  };


  return (
    <>
     <Container>
      <TableContainer component={Paper} sx={{maxHeight:"600px"}} >
      <Table aria-label="simple table" stickyHeader >
        <TableHead>
          <TableRow>

            <TableCell>
              <Typography
                variant="h5"
                fontWeight="bold"
              >Character
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="h5"
                fontWeight="bold"
              >Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="h5"
                fontWeight="bold"
              >Info
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {data?.results.map((item) => {
        const pokemonArray = item.url.split('/');
        const pokemonId = pokemonArray[pokemonArray.length - 2];

        return (
          <TableRow 
            key={item.name} 
            sx={{"&last-child td, &:last-child th": {border:0} }}
          >
            <TableCell>
              <img
                src={pokemonId < 10229 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png` : noImage }
                alt={item.name}
              />
            </TableCell>
            <TableCell> 
              <Typography 
                gutterBottom 
                variant="h5" 
                textTransform="capitalize"
                component="div">{item.name}     
              </Typography> 
            </TableCell>
            <TableCell>
              <Link to={`/pokemon/${pokemonId}`}>
                <Button  variant="contained">
                View More
                </Button>
              </Link>
            </TableCell>
            
          </TableRow>
        );
        })}
        </TableBody>
        </Table>    
      </TableContainer>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Pagination
        count={count}
        page={currentPage}
        onChange={handlePaginationChange}
      />

      <Select
        labelId="limit-select"
        value={limit}
        label="Age"
        onChange={(e, f) =>
          setLimit(f.props.value)
        }
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
      </Select>
      </Box>
      </Container>
    </>
  );
};
