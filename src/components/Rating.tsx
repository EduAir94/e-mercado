import PropTypes from 'prop-types';

function Rating({ score }: { score: number }) {
  return (
    <div className="d-flex align-items-center">
      {[1, 2, 3, 4, 5].map((item) => (
        <i
          key={item}
          className={'bi ' + (item <= score ? 'bi-star-fill text-warning' : 'bi-star')}
        ></i>
      ))}
    </div>
  );
}

Rating.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Rating;
