import { Fragment } from 'react';
import AddMeal from './AddMeal';
import { useState } from 'react';

import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';


// eslint-disable-next-line react-hooks/rules-of-hooks




const Meals = () => {
  const [ meals, setMeals] = useState([{
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 28.99,
  }]) 
  return (
    <>
      <MealsSummary   />
      <AvailableMeals DUMMY_MEALS={meals}  />
      <AddMeal meals={meals} setMeals={setMeals} />    
      </>
  );
};

export default Meals;
