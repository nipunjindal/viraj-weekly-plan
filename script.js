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
                weekDiv.appendChild(title);

                const contentValue = weekData[key];
                if (key === 'How to Teach / Impart' && typeof contentValue === 'string') {
                    const list = document.createElement('ol');
                    const items = contentValue.split(/\d+\./).filter(item => item.trim() !== '');
                    items.forEach(itemText => {
                        const listItem = document.createElement('li');
                        listItem.textContent = itemText.trim();
                        list.appendChild(listItem);
                    });
                    weekDiv.appendChild(list);
                } else if (key === 'Trivia & GK Focus' && typeof contentValue === 'string') {
                    const list = document.createElement('ul');
                    const items = contentValue.split('-').filter(item => item.trim() !== '');
                    items.forEach(itemText => {
                        const listItem = document.createElement('li');
                        listItem.textContent = itemText.trim();
                        list.appendChild(listItem);
                    });
                    weekDiv.appendChild(list);
                } else {
                    const content = document.createElement('p');
                    content.textContent = contentValue;
                    weekDiv.appendChild(content);
                }
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
