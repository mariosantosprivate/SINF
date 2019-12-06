import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const BarChart = ({ data, labels, legend }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: legend,
        backgroundColor: 'rgba(85,161,229,1)',
        borderWidth: 0,
        hoverBackgroundColor: 'rgba(85,161,229,0.9)',
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

  return <Bar data={chartData} options={options} />;
};

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  legend: PropTypes.string.isRequired,
};

export default BarChart;
