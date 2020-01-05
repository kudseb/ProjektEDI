new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ["Niemcy", "Włochy", "Polska", "Francja", "Wielka Brytania", "Hiszpania", "Rumunia", "Bułgaria", "Węgry", "Grecja"],
      datasets: [
        {
          label: "osób (tysięcy)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#7FFF00", "#AFEEEE", "#00008B", "#808000", "#FFFF00"],
          data: [62.300, 60.600, 44.500, 35.800, 31.300, 27.900, 25.400, 14.200, 12.800, 12.000]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Ilość śmierci spowodowanych zanieczyszczeniem powietrza w 2015r.'
        // https://www.weforum.org/agenda/2018/11/chart-of-the-day-where-eu-air-pollution-is-deadliest/
      }
    }
});