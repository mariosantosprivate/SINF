import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const TrendChart = ({ data, legend }) => {
  const chartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'Semptember',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: legend,
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 3,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data,
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        label: (item) => `${item.yLabel.toLocaleString()} €`,
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          callback: (label) => label.toLocaleString(),
        },
      },
      ],
    },
  };

  return (
    <Line
      data={chartData}
      options={options}
    />
  );
};

TrendChart.propTypes = {
  legend: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TrendChart;
