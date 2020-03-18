import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { differenceInCalendarDays, parse } from 'date-fns';
import Context from './Context';
import api from '../../api';

const StatusProvider = ({
  children,
  contributors: initialContributors,
  amount: initialAmount,
  objective,
  dateEnd,
}) => {
  const [contributors, setContributors] = useState(initialContributors);
  const [amount, setAmount] = useState(initialAmount);

  const updateStats = async () => {
    const data = await api('stats/crowdfunding');
    if (data.contributors) {
      setContributors(Number.parseInt(data.contributors, 10));
    }
    if (data.amount) {
      setAmount(Number.parseInt(data.amount, 10));
    }
  };

  useEffect(() => {
    updateStats();
  }, []);

  const percentage = !amount ? 0 : Math.ceil((amount / objective) * 100);

  const dateEndObj = parse(dateEnd, 'dd/MM/yyyy HH:mm', new Date());
  const now = new Date();
  const dayLeftCount = differenceInCalendarDays(dateEndObj, now);

  const addAmount = anAmount => {
    setAmount(amount + Number.parseInt(anAmount, 10));
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
  dateEnd: PropTypes.string.isRequired,
  objective: PropTypes.number.isRequired,
};

export default StatusProvider;