
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const container = document.querySelector('.container');
const selectedMovie = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');
const mapp = new Map();
const clearButton = document.getElementById('clear');

loadFromLocalStorage();
calculate();

container.addEventListener('click', function (e) {
    if (isClassListContainsClass(e, 'seat') && !isClassListContainsClass(e, 'reserved')) {
        e.target.classList.toggle('selected')
        calculate();
    }
});

selectedMovie.addEventListener('change', function (e) {
    calculate();
});


clearButton.addEventListener('click', function (e) {
    localStorage.removeItem('selectedSeats'); 
    seats.forEach(s =>{
        s.classList.remove('selected');
    });
});


function calculate() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount
    amount.innerText = selectedSeatCount * selectedMovie.value;

    const selectedSeatIndexes = [...selectedSeats].map(e => [...seats].indexOf(e));

    saveToLocalStorage('selectedMovieIndex', selectedMovie.selectedIndex);
    saveToLocalStorage('selectedSeats', selectedSeatIndexes);
}

function loadFromLocalStorage() {

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
    if (selectedMovieIndex != null) {
        selectedMovie.selectedIndex = selectedMovieIndex;
    }

    const selectedSeatsIndexs = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeatsIndexs == null){
        seats.forEach(s =>{
            s.classList.remove('selected');
        });
    }

    if(selectedSeatsIndexs !=null && selectedSeatsIndexs.length > 0){
        seats.forEach(s => {
            selectedSeatsIndexs.forEach(si => {
                if([...seats].indexOf(s) == si){ 
                    s.classList.add('selected');
                }            
            });
        });
    }

}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function isClassListContainsClass(e, clazz) {
    if (e.target.classList.contains(clazz)) {
        return true;
    }
    return false;
}