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

// defining all graphs and contexts then I can destroy them later to be reused
var ctxGastos = document.getElementById('gastosChart').getContext('2d');
var chartGastos = new Chart(ctxGastos, {})
var ctxFixos = document.getElementById('fixosChart').getContext('2d');
var chartFixos = new Chart(ctxFixos, {})
var ctxVariaveis = document.getElementById('variaveisChart').getContext('2d');
var chartVariaveis = new Chart(ctxVariaveis, {})



console.log(mes, ano)

function destroyCharts() {
  chartGastos.destroy()
  chartFixos.destroy()
  chartVariaveis.destroy()
}

function convertFormToJSON(form) {
  const array = $(form).serializeArray(); // Encodes the set of form elements as an array of names and values.
  const json = {};
  $.each(array, function () {
    json[this.name] = this.value || "";
  });
  return json;
}

function postForm(form, url, redirect) {
  $.ajax({
    type: "post",
    url: url,
    data: JSON.stringify(form),
    dataType: "json",
    contentType:"application/json; charset=utf-8",
    success: function (data) {
      $("#sucesso").show();
      setTimeout(() => {
        window.location.href = redirect;
      }, 1000);
    },
  })
}

// the app.js file containing all the app code
function generateGraphs() {
  let mes = document.getElementById("mes").value
  let ano = document.getElementById("ano").value

  let urlFixos = `http://localhost:8000/api/v1/fixos/${mes}/${ano}/`
  let urlGastos = `http://localhost:8000/api/v1/gastos/${mes}/${ano}/`
  let urlVariaveis = `http://localhost:8000/api/v1/variaveis/${mes}/${ano}/`

  destroyCharts()

  fetch(urlGastos)
      .then((response) => gastosData = response.json())
      .then(data => {
        delete data['mes']
        delete data['ano']
        gastosData = data
      })
      .then(() => {


        const dataGastosChart = {
          labels: ["Total"],
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
                GeolocationCoordinates: {display: false},
              },
              x: {
                max: gastosData['Salario'],
                stacked: true,
                grid: {display: false},
              }
            },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Diferença de Gastos'
              }
            }
          }
        };




        chartGastos = new Chart(ctxGastos, configGastos)

      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });

  fetch(urlFixos)
      .then((response) => fixosData = response.json())
      .then(data => {
        delete data['mes']
        delete data['ano']
        fixosData = data
      })
      .then(() => {
        const dataFixos = {
          labels: Object.keys(fixosData),
          datasets: [
            {
              label: 'Dataset 1',
              data: Object.values(fixosData),
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
              CHART_COLORS.grey,    // bar 6
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

        chartFixos = new Chart(ctxFixos, configFixos)

      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });

  fetch(urlVariaveis)
      .then((response) => variaveisData = response.json())
      .then(data => {
        delete data['mes']
        delete data['ano']
        variaveisData = data
      })
      .then(() => {
        const dataVariaveis = {
          labels: Object.keys(variaveisData),
          datasets: [
            {
              label: 'Dataset 1',
              data: Object.values(variaveisData),
            }
          ]
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

        chartVariaveis = new Chart(ctxVariaveis, configVariaveis)

      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
}
