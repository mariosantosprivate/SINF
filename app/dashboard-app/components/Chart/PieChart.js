import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import chartTypes from '../../utils/chartTypes';

const formatTooltip = (data, chartType) => {
  switch (chartType) {
    case chartTypes.DEFAULT_CHART:
      return data;
    case chartTypes.EURO_CHART:
      return `${data.toLocaleString()} €`;
    case chartTypes.PERCENTAGE_CHART:
      return `${data} %`;
    default:
      return data;
  }
};

const PieChart = ({ data, labels, chartType }) => {
  const chartData = {
    labels,
    datasets: [
      {
        backgroundColor: [
          'rgba(85,161,229,1)',
          'rgba(108,190,191,1)',
          'rgba(248,206,107,1)',
          'rgba(242,162,84,1)',
          'rgba(237,110,133,1)',
        ],
        borderWidth: 0,
        data,
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, tooltipData) => {
          formatTooltip(
            tooltipData.datasets[tooltipItem.datasetIndex].data[tooltipItem.index], 
            chartType,
          );
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartType: PropTypes.number,
};

PieChart.defaultProps = {
  chartType: chartTypes.DEFAULT_CHART,
};

export default PieChart;
