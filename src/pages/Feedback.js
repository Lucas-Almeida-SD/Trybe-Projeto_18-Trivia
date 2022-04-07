import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <section>
          <h2 data-testid="feedback-text">Tela de Feedback</h2>
        </section>
      </>
    );
  }
}

export default Feedback;
