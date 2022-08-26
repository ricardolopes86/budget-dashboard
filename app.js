// the app.js file containing all the app code
const gastosData = {
  'Fixos': 2517.87,
  'Variaveis': 3102.77,
  'Salario': 4942,
}

const fixosData = {
  'Contas': 400,
  'Assinaturas': 300,
  'Seguros': 150,
  'Mesadas': 247,
  'Impostos': 220,
}

const variaveisData = {
  'Compras': 1133.89,
  'Restaurantes': 158.58,
  'Mercado': 752.75,
  'Carro': 448.63,
}

const CHART_COLORS = {
  red: 'rgba(255, 99, 132, 0.5)',
  orange: 'rgba(255, 159, 64, 0.5)',
  yellow: 'rgba(255, 205, 86, 0.5)',
  green: 'rgba(75, 192, 192, 0.5)',
  blue: 'rgba(54, 162, 235, 0.5)',
  purple: 'rgba(153, 102, 255, 0.5)',
  grey: 'rgba(201, 203, 207, 0.5)'
};

const NAMED_COLORS = [
  CHART_COLORS.red,
  CHART_COLORS.orange,
  CHART_COLORS.yellow,
  CHART_COLORS.green,
  CHART_COLORS.blue,
  CHART_COLORS.purple,
  CHART_COLORS.grey,
];


const dataGastosChart = {
    labels: ["Composição de Gastos"],
    datasets: [{
      axis: 'y',
      label: "Variaveis",
      data: [gastosData['Variaveis']],
      fill: true,
      backgroundColor: [
        CHART_COLORS.red
      ],
      borderWidth: 0
    },
    {
      axis: 'y',
      label: "Fixos",
      data: [gastosData['Fixos']],
      fill: true,
      backgroundColor: [
        CHART_COLORS.orange
      ],
      borderWidth: 0
    }]
  };

  const configGastos = {
    type: 'bar',
    data: dataGastosChart,
    options: {
      indexAxis: 'y',
      scales: {
              y: {
                  stacked: true,
                  beginAtZero: false,
                  gridLines: {display: false},
              },
              x: {
                  max: gastosData['Salario'],
                  stacked: true,
                  gridLines: {display: false},
                }
          }
    }
  };

const dataFixos = {
  labels: Object.keys(fixosData),
  datasets: [
    {
      label: 'Dataset 1',
      data: Object.values(fixosData),
    }
  ]
};

const dataVariaveis = {
  labels: Object.keys(variaveisData),
  datasets: [
    {
      label: 'Dataset 1',
      data: Object.values(variaveisData),
    }
  ]
};

const configFixos = {
  type: 'doughnut',
  data: dataFixos,
  options: {
    backgroundColor: [
      CHART_COLORS.orange,  // Bar 1
      CHART_COLORS.red,     // Bar 2
      CHART_COLORS.purple,  // Bar 3
      CHART_COLORS.blue,    // Bar 4
      CHART_COLORS.yellow,  // bar 5
    ],
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Custos Fixos do Mês'
      }
    }
  },
};

const configVariaveis = {
  type: 'doughnut',
  data: dataVariaveis,
  options: {
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)',  // Bar 1
      'rgba(54, 162, 235, 0.5)',  // Bar 2
      'rgba(255, 206, 86, 0.5)',  // Bar 3
      'rgba(75, 192, 192, 0.5)',  // Bar 4
    ],
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Custos Variáveis do Mês'
      }
    }
  },
};

  const ctxGastos = document.getElementById('gastosChart').getContext('2d');
  const chartGastos = new Chart(ctxGastos, configGastos)

  const ctxFixos = document.getElementById('fixosChart').getContext('2d');
  const chartFixos = new Chart(ctxFixos, configFixos)

  const ctxVariaveis = document.getElementById('variaveisChart').getContext('2d');
  const chartVariaveis = new Chart(ctxVariaveis, configVariaveis)