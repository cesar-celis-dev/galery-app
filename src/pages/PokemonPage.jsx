import { useEffect, useState } from 'react';
import {
  useParams,
  Link,
} from 'react-router-dom';
import { ArrowLeft } from '@mui/icons-material';
import { fetchPokemonById } from '../api/fetchPokemonById';
import noImage from '../assets/no-image.png';
import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material';


export const PokemonPage = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPokemonData(id);
  }, []);

  const getPokemonData = async (id) => {
    const pokemon = await fetchPokemonById(id);
    setData(pokemon);
  };

  if (!data) {
    return '';
  }

  return (
    <div >
      <Container maxWidth="sm">
        <Card sx={{ maxWidth: 345, padding: "20px" }}>
          <Link to="/">
            <ArrowLeft />
            Back
          </Link>
          <Typography 
            gutterBottom 
            variant="h5"
            fontWeight="bold"
            padding="20px" 
            component="div">
            Pokemon #{data.id} - {data.name}
          </Typography>
          <CardMedia
          component="img"
          img 
            src={data.sprites?.other?.dream_world?.front_default || noImage}
            alt={id}
        />
          <CardContent>
          <Typography 
            gutterBottom variant="h5" component="div"
          >
            <div>weight: {data.weight}</div>
          </Typography>
          <Typography 
            gutterBottom variant="h5" component="div"
          >
            <div>height: {data.height}</div>
          </Typography>
          <Typography 
            gutterBottom variant="h5" component="div"
          >
            <div>Type: {data.types[0].type.name}</div>
          </Typography>
          </CardContent>
          </Card>
        </Container>
        
    </div>
  );
};
