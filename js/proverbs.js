const proverbsDiv = document.querySelector('.proverbs');
const proverbsText = proverbsDiv.querySelector('p');
const proverbs = [
    'Gdy Makary pogodny cały styczeń chłodny',
    'Gdy w Eugeniego lód albo woda taka i lipcowa pokaże się pogoda',
    'Gdy Trzech Króli mrozem trzyma będzie jeszcze długa zima',
    'Na Trzech Króli słońce świeci wiosna do nas pędem leci',
    'Gdy słońce przygrzewa na Jana Dobrego spodziewać sie można lata pogodnego',
    'Jaka pogoda w Świętego Marcela będzie pogodna Wielka Niedziela',
    'Na Świetego Karola wyjrzy spod śniegu rola',
    'Urodzaje da rola gdy deszcz leje w Karola',
    'Gdy w Gromnice z dachów ciecze, zima jeszcze się przywlecze',
    'Jak pogoda w św. Błażeja, będzie ze śniegiem Wielka Niedziela',
    'Deszcz na świętego Błażeja, słaba wiosny nadzieja',
    'Na dzień świętej Doroty, ma być śniegu nad płoty',
    'Na świętego Kazimierza wyjdzie skowronek spod pierza',
    'Męczennicy, gdy mróz noszą, czterdzieści dni mrozu głoszą',
    'Na św. Grzegorza idzie zima do morza',
    'Na św. Edwarda zimy pogarda',
    'Święty Józef pogodny, będzie roczek wodny',
    'Jak po Benedykcie ciepło, to i w lecie będzie piekło',
    'Na św. Franciszka nieraz dobrze grzmi i łyska'
]

var number = Math.floor(Math.random() * proverbs.length);

proverbsText.innerHTML = proverbs[number];
