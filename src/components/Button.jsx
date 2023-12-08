export const Button = ({ loading, handleLoadMore }) => {
  return (
    <button className="Button" onClick={handleLoadMore}>
      {loading ? 'Loading' : 'Load more'}
    </button>
  );
};
