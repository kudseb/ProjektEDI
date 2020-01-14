const xlabels = [];
const ylpoz = [];
const zpow=[];

chartIt()

async function chartIt() {
    await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Liczba Pożarów na przestrzeni lat 1990-2009',
                data: ylpoz,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
        },{
            labels:xlabels,
            label:'Powierzchnia spalona na przestrzeni lat 1990-2009',
            data:zpow,
            type:'line',
            fill:false,
            borderColor:'rgb(63, 63, 191, 0.5)'
        }]
        },
    }
    );
}

async function getData() {
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const response = await fetch(`${proxy}https://gist.githubusercontent.com/kudseb/d472c5b04cf4ba18c3691baacc6523cc/raw/5d34d398bde30353f871de9bf0d4fbb43a0dd849/gistfile1.txt`);
    const data = await response.text();

    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        xlabels.push(year);
        const lpoz = columns[1];
        ylpoz.push(lpoz);
        const pow= columns[2];
        zpow.push(pow);
    });
}
