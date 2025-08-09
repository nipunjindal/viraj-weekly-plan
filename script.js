document.addEventListener('DOMContentLoaded', () => {
    const planContainer = document.getElementById('plan-container');
    const prevWeekButton = document.getElementById('prev-week');
    const nextWeekButton = document.getElementById('next-week');

    let currentWeek = 0;
    let weeklyData = [];

    fetch('data/plan.json')
        .then(response => response.json())
        .then(data => {
            weeklyData = data;
            renderWeek(currentWeek);
        });

    function renderWeek(weekIndex) {
        if (weekIndex < 0 || weekIndex >= weeklyData.length) {
            return;
        }
        const weekData = weeklyData[weekIndex];
        planContainer.innerHTML = ''; 

        const weekDiv = document.createElement('div');
        weekDiv.className = 'week-plan';

        for (const key in weekData) {
            if (weekData.hasOwnProperty(key)) {
                const title = document.createElement('h3');
                title.textContent = key;
                const content = document.createElement('p');
                content.textContent = weekData[key];
                weekDiv.appendChild(title);
                weekDiv.appendChild(content);
            }
        }
        planContainer.appendChild(weekDiv);
    }

    prevWeekButton.addEventListener('click', () => {
        if (currentWeek > 0) {
            currentWeek--;
            renderWeek(currentWeek);
        }
    });

    nextWeekButton.addEventListener('click', () => {
        if (currentWeek < weeklyData.length - 1) {
            currentWeek++;
            renderWeek(currentWeek);
        }
    });
});
