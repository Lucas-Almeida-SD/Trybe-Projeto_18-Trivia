import React from 'react';
import { Link } from 'react-router-dom';

class Jogo extends React.Component {
  render() {
    return (
      <div>
        <Link to="/configuracao">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
      </div>
    );
  }
}

export default Jogo;
