const calendarEl = document.getElementById('calendar');
const confirmButton = document.getElementById('confirmButton');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');

let selectedDate = null;
let currentDate = new Date();

function populateMonthYear() {
    for (let m = 0; m < 12; m++) {
        const option = document.createElement('option');
        option.value = m;
        option.textContent = new Date(0, m).toLocaleString('pt-BR', { month: 'long' });
        monthSelect.appendChild(option);
    }

    const currentYear = currentDate.getFullYear();
    for (let y = currentYear - 10; y <= currentYear + 10; y++) {
        const option = document.createElement('option');
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }

    monthSelect.value = currentDate.getMonth();
    yearSelect.value = currentYear;

    monthSelect.addEventListener('change', generateCalendar);
    yearSelect.addEventListener('change', generateCalendar);
}

function generateCalendar() {
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    calendarEl.innerHTML = '';

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('day', 'text-transparent');
        calendarEl.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = day;
        dayCell.classList.add('day', 'text-white', 'cursor-pointer');
        dayCell.addEventListener('click', () => {
            document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
            dayCell.classList.add('selected');
            selectedDate = day;
        });
        calendarEl.appendChild(dayCell);
    }
}

confirmButton.addEventListener('click', () => {
    if (selectedDate) {
        const timeValue = document.getElementById('timeRange').value;
        const hours = Math.floor(timeValue / 60);
        const minutes = timeValue % 60;
        alert(`Data selecionada: ${yearSelect.value}-${monthSelect.value * 1 + 1}-${selectedDate} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`);
    } else {
        alert('Por favor, selecione uma data.');
    }
});

populateMonthYear();
generateCalendar();
