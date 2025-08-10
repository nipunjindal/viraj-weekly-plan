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

        if (weekData['Week Number']) {
            const weekNumber = document.createElement('h2');
            weekNumber.textContent = `Week ${weekData['Week Number']}`;
            weekDiv.appendChild(weekNumber);
        }

        for (const key in weekData) {
            if (weekData.hasOwnProperty(key) && key !== 'Week Number' && weekData[key]) {
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
                    const parts = contentValue.split(/:-/);

                    if (parts.length === 2) {
                        const topic = parts[0].trim();
                        const questions_str = parts[1].trim();

                        const topicItem = document.createElement('li');
                        topicItem.textContent = topic;
                        list.appendChild(topicItem);

                        const sublist = document.createElement('ul');
                        const questions = questions_str.split('-').filter(item => item.trim() !== '');
                        questions.forEach(q_text => {
                            const q_item = document.createElement('li');
                            q_item.textContent = q_text.trim();
                            sublist.appendChild(q_item);
                        });
                        topicItem.appendChild(sublist);
                    } else {
                        // Fallback for cases where there is no topic prefix.
                        const items = contentValue.split('-').filter(item => item.trim() !== '');
                        items.forEach(itemText => {
                            const listItem = document.createElement('li');
                            listItem.textContent = itemText.trim();
                            list.appendChild(listItem);
                        });
                    }
                    weekDiv.appendChild(list);
                } else if (key === 'Daily Rituals' && typeof contentValue === 'string') {
                    const list = document.createElement('ul');
                    const items = contentValue.split(/(Morning:|After school:|Evening:)/).filter(item => item.trim() !== '');
                    for (let i = 0; i < items.length; i += 2) {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `<strong>${items[i]}</strong> ${items[i+1]}`;
                        list.appendChild(listItem);
                    }
                    weekDiv.appendChild(list);
                } else if (key.startsWith('Park Time Options') && typeof contentValue === 'string') {
                    const list = document.createElement('ul');
                    const items = contentValue.split(/\. |:/).filter(item => item.trim() !== '');
                    items.forEach(itemText => {
                        const listItem = document.createElement('li');
                        listItem.textContent = itemText.trim();
                        list.appendChild(listItem);
                    });
                    weekDiv.appendChild(list);
                } else if (key.startsWith('Trivia Bank') && typeof contentValue === 'string') {
                    const list = document.createElement('ol');
                    const items = contentValue.split(/\d+\./).filter(item => item.trim() !== '');
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
