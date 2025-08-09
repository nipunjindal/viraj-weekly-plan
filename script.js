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
                    const topics = contentValue.split(/:-/);
                    topics.forEach(topicText => {
                        const topicTrimmed = topicText.trim();
                        if (topicTrimmed) {
                            const topicItem = document.createElement('li');
                            const parts = topicTrimmed.split(/\? /);
                            topicItem.textContent = parts[0] + (parts.length > 1 ? '?' : '');
                            
                            if (parts.length > 1) {
                                const sublist = document.createElement('ul');
                                const questions = topicTrimmed.substring(parts[0].length + 1).split('- ').filter(q => q.trim());
                                questions.forEach(q => {
                                    const subListItem = document.createElement('li');
                                    subListItem.textContent = q.trim();
                                    sublist.appendChild(subListItem);
                                });
                                topicItem.appendChild(sublist);
                            }
                            list.appendChild(topicItem);
                        }
                    });
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
