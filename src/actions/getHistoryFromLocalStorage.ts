export const getHistoryFromLocalStorage = () => {
  const data = localStorage.getItem('quiz');
  const items = data ? JSON.parse(data) : [];

  return {
    historyItems: items,
  };
};
