import React from 'react';
import NavbarTop from './../components/common/NavbarTop';
import NavBarSecondary from './../components/common/NavBarSecondary';
import Container from '../components/common/Container';
import BudgetsLeftColumn from '../components/Budgets/BudgetsLeftColumn';
import BudgetsRightColumn from '../components/Budgets/BudgetsRightColumn';

function Budgets(props) {
  return (
    <React.Fragment>
      <NavbarTop />
      <NavBarSecondary />
      <section>
        <Container>
          <BudgetsLeftColumn />
          <BudgetsRightColumn />
        </Container>
      </section>
    </React.Fragment>
  );
}

export default Budgets;
