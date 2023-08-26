import React, { useState } from 'react';
import "./App.css";
import { Card } from './components/card/Card';
import { useFoodData } from './hooks/useFoodData';
import { FormFood } from './components/card/Form/FormFood';

function App() {

  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map(foodData => 
          <Card 
            key={foodData.id}
            price={foodData.price} 
            title={foodData.title} 
            image={foodData.image}
            />
        )}
      </div>
      {isModalOpen && <FormFood closeModal={handleOpenModal}/>}
      <button onClick={handleOpenModal} >Novo Comida</button>
    </div>
  );
}

export default App;
