import { Card } from 'antd';
import { StarButton } from './Startbutton';
import Meta from 'antd/lib/card/Meta';
import { setFavorite } from '../actions';
import { useDispatch } from 'react-redux';


const PokemonCard = ({ name, image, types, id }) => {
    
    const typesString = types.map(elemento => elemento.type.name).join(', '); 
    const dispatch = useDispatch();
    const handleOnFavorite = () =>{
        dispatch(setFavorite({pokemonId: id}));
    }
    return (
        <Card 
            style={{ width:250}} 
            title={name} 
            cover={<img src={image} alt={name} />}
            extra={<StarButton isFavorite onClick={handleOnFavorite} />}
        >
            <Meta description={typesString} />
        </Card>
    );
};

export default PokemonCard; 