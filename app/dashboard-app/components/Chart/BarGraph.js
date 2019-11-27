import Chart from 'chart.js'

Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";


// Data generation
function getRandomArray(numItems) {
    // Create random array of objects
    let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let data = [];
    for (var i = 0; i < numItems; i++) {
        data.push({
            label: names[i],
            value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
}

function getRandomDateArray(numItems) {
    // Create random array of objects (with date)
    let data = [];
    let baseTime = new Date('2018-05-01T00:00:00').getTime();
    let dayMs = 24 * 60 * 60 * 1000;
    for (var i = 0; i < numItems; i++) {
        data.push({
            time: new Date(baseTime + i * dayMs),
            value: Math.round(20 + 80 * Math.random())
        });
    }
    return data;
}

function getData() {
    let data = [];

    data.push({
        title: 'Visits',
        data: getRandomDateArray(150)
    });

    data.push({
        title: 'Categories',
        data: getRandomArray(20)
    });

    data.push({
        title: 'Categories',
        data: getRandomArray(10)
    });

    data.push({
        title: 'Data 4',
        data: getRandomArray(6)
    });

    return data;
}


// BarChart
class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map(d => d.label);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
        this.myChart.update();
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'bar',
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: 100
                            }
                        }
                    ]
                }
            },
            data: {
                labels: this.props.data.map(d => d.label),
                datasets: [{
                    label: this.props.title,
                    data: this.props.data.map(d => d.value),
                    backgroundColor: this.props.color
                }]
            }
        });
    }

    render() {
        return (
            <canvas ref={this.canvasRef} />
        );
    }
}


// App
export class BarGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: getData()
        };
    }

    componentDidMount() {
        window.setInterval(() => {
            this.setState({
                data: getData()
            })
        }, 5000)
    }

    render() {
        return (
            <div className="sub chart-wrapper">
                <BarChart
                    data={this.state.data[1].data}
                    title={this.state.data[1].title}
                    color="#70CAD1"
                />
            </div>
        );
    }
}
