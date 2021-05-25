import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const PokemonThumb = ({ id, image, name, type }) => {
  const style = type + ' thumb-container';
  return (
    <div className={style}>
      <Button
        style={{ textDecoration: 'none' }}
        as={Link}
        to={{ pathname: `/pokemon/${id}` }}
      >
        <div className="number">
          <small>#0{id}</small>
        </div>
        <img src={image} alt={name} />
        <div className="detail-wrapper">
          <h3>{name}</h3>
          <small>Type: {type}</small>
        </div>
      </Button>
    </div>
  );
};

export default PokemonThumb;
