import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { differenceInCalendarDays } from 'date-fns';
import Context from './Context';
import api from '../../../api';

const StatusProvider = ({
  children,
  contributors: initialContributors,
  amount: initialAmount,
}) => {
  const objective = 100000;
  const [contributors, setContributors] = useState(initialContributors);
  const [amount, setAmount] = useState(initialAmount);

  const updateStats = async () => {
    const data = await api('stats/crowdfunding');
    if (data.contributors) {
      setContributors(data.contributors);
    }
    if (data.amount) {
      setAmount(data.amount);
    }
  };

  useEffect(() => {
    updateStats();
  }, []);

  const percentage = !amount ? 0 : Math.ceil((amount / objective) * 100);

  const dateEnd = new Date(2020, 2, 22, 23, 59); // 22/03/2029 23:59
  const now = new Date();
  const dayLeftCount = differenceInCalendarDays(dateEnd, now);

  const addAmount = anAmount => {
    setAmount(amount + anAmount);
  };

  const addContributor = () => {
    setContributors(contributors + 1);
  };

  return (
    <Context.Provider
      value={{
        objective,
        contributors,
        amount,
        percentage,
        dayLeftCount,
        addAmount,
        addContributor,
        setAmount,
        setContributors,
      }}
    >
      {children}
    </Context.Provider>
  );
};

StatusProvider.propTypes = {
  children: PropTypes.node.isRequired,
  amount: PropTypes.number.isRequired,
  contributors: PropTypes.number.isRequired,
};

export default StatusProvider;
