import { Col, Spin } from 'antd';
import { getPokemon, getPokemonDetails } from './API/index';
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList.jsx';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoading, setPokemons } from './actions';
import { useEffect } from 'react';
import './App.css';

function App() {

  const pokemons = useSelector((state) => state.pokemons);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchPokemons = async () =>{
      dispatch(setLoading(true));
      const pokemonsRes = await getPokemon();
      const pokemonsDetailed = await Promise.all(pokemonsRes.map(pokemon => getPokemonDetails(pokemon)));
      dispatch(setPokemons(pokemonsDetailed));
      dispatch(setLoading(false));
    };

    fetchPokemons(); 
  },[]);


  return (
    <div className="App">
      <Col span={4} offset={10}>
        <img src='https://raw.githubusercontent.com/musartedev/curso-redux/27298f5dd3e37caf2a90a7a82580cd2905fcab31/src/statics/logo.svg' alt='logo'/>
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      {loading ? <Col offset={12}>
      <Spin spinning size='large' />
      </Col> : <PokemonList pokemons={pokemons} />}

    </div>
  );
}

export default App; 
