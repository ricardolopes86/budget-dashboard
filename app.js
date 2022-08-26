// the app.js file containing all the app code

const data = {
    labels: ["Composição de Gastos"],
    datasets: [{
      axis: 'y',
      label: 'Variaveis',
      data: [3102.77],
      fill: true,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderWidth: 0
    },
    {
      axis: 'y',
      label: 'Fixos',
      data: [2517.87],
      fill: true,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)'
      ],
      borderWidth: 0
    }]
  };

  const config = {
    type: 'bar',
    data,
    options: {
      indexAxis: 'y',
      scales: {
              y: {
                  stacked: true,
                  beginAtZero: false,
                  gridLines: {display: false},
              },
              x: {
                  max: 4942,
                  stacked: true,
                  gridLines: {display: false},
                }
          }
    }
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );