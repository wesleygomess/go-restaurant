import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import {FoodInterface} from '../../types';

import { Container } from './styles';
import api from '../../services/api';

interface FoodProps {
  food: FoodInterface;
  handleDelete: (id: number) => void;
  handleEditFood: (food: FoodInterface) => void;
}

function Food(props: FoodProps) {
  const { food, handleDelete, handleEditFood } = props;
  const [isavaliable, setIsvailable] = useState(food.available);

  async function toggleavaliable() {

    await api.put(`/foods/${food.id}`, {
      ...food,
      avaliable: !isavaliable,
    });

    setIsvailable(!isavaliable);
  }

  function setEditingFood(){
    handleEditFood(food);
  }
    return (
      <Container avaliable={isavaliable}>
        <header>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={setEditingFood}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(food.id)}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isavaliable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`avaliable-switch-${food.id}`} className="switch">
              <input
                id={`avaliable-switch-${food.id}`}
                type="checkbox"
                checked={isavaliable}
                onChange={toggleavaliable}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
    );
  
};

export default Food;
