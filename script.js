document.addEventListener('DOMContentLoaded', () => {
    const planContainer = document.getElementById('plan-container');
    const pageTitle = document.querySelector('header h1');
    const prevWeekButton = document.getElementById('prev-week');
    const nextWeekButton = document.getElementById('next-week');
    const weekSelect = document.getElementById('week-select');

    let currentWeek = 0;
    let weeklyData = [];

    fetch('data/plan.json')
        .then(response => response.json())
        .then(data => {
            weeklyData = data;

            // Populate week selector
            weeklyData.forEach((week, index) => {
                const option = document.createElement('option');
                const label = week['Week Number'] ? `Week ${week['Week Number']}` : `Week ${index + 1}`;
                option.value = index;
                option.textContent = label;
                weekSelect.appendChild(option);
            });

            // Find the current week based on today's date
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to the start of the day

            let foundWeek = false;
            for (let i = 0; i < weeklyData.length; i++) {
                const week = weeklyData[i];
                if (week['Week Dates']) {
                    const dates = week['Week Dates'].split('–').map(d => d.trim());
                    if (dates.length === 2) {
                        const startDate = new Date(dates[0]);
                        const endDate = new Date(dates[1]);
                        startDate.setHours(0, 0, 0, 0);
                        endDate.setHours(0, 0, 0, 0);

                        if (today >= startDate && today <= endDate) {
                            currentWeek = i;
                            foundWeek = true;
                            break;
                        }
                    }
                }
            }

            weekSelect.value = currentWeek;
            renderWeek(currentWeek);
        });

    function renderWeek(weekIndex) {
        if (weekIndex < 0 || weekIndex >= weeklyData.length) {
            return;
        }
        const weekData = weeklyData[weekIndex];
        planContainer.innerHTML = '';
        weekSelect.value = weekIndex;

        // Update the main title
        let titleText = "Weekly Plan for Viraj";
        if (weekData['Week Number']) {
            titleText += `: Week ${weekData['Week Number']}`;
        }
        if (weekData['Week Dates']) {
            titleText += ` (${weekData['Week Dates']})`;
        }
        pageTitle.textContent = titleText;

        const weekDiv = document.createElement('div');
        weekDiv.className = 'week-plan fade-in';

        for (const key in weekData) {
            if (weekData.hasOwnProperty(key) && key !== 'Week Number' && key !== 'Week Dates' && weekData[key]) {
                const section = document.createElement('section');
                section.className = 'plan-section';

                const title = document.createElement('h3');
                title.textContent = key;
                section.appendChild(title);

                const contentValue = weekData[key];
                if (key.startsWith('How to Teach / Impart') && typeof contentValue === 'string') {
                    const list = document.createElement('ol');
                    const items = contentValue.split(/\d+\./).filter(item => item.trim() !== '');
                    items.forEach(itemText => {
                        const listItem = document.createElement('li');
                        listItem.textContent = itemText.trim();
                        list.appendChild(listItem);
                    });
                    section.appendChild(list);
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
                    section.appendChild(list);
                } else if (key.startsWith('Daily Rituals') && typeof contentValue === 'string') {
                    const list = document.createElement('ul');
                    const items = contentValue.split(/(Morning:|After school:|Evening:)/).filter(item => item.trim() !== '');
                    for (let i = 0; i < items.length; i += 2) {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `<strong>${items[i]}</strong> ${items[i+1]}`;
                        list.appendChild(listItem);
                    }
                    section.appendChild(list);
                } else if (key.startsWith('Park Time Options') && typeof contentValue === 'string') {
                    const list = document.createElement('ul');
                    const items = contentValue.split(/\. |:/).filter(item => item.trim() !== '');
                    items.forEach(itemText => {
                        const listItem = document.createElement('li');
                        listItem.textContent = itemText.trim();
                        list.appendChild(listItem);
                    });
                    section.appendChild(list);
                } else if (key.startsWith('Trivia Bank') && typeof contentValue === 'string') {
                    const list = document.createElement('ol');
                    const items = contentValue.split(/\d+\./).filter(item => item.trim() !== '');
                    items.forEach(itemText => {
                        const listItem = document.createElement('li');
                        listItem.textContent = itemText.trim();
                        list.appendChild(listItem);
                    });
                    section.appendChild(list);
                } else {
                    const content = document.createElement('p');
                    content.textContent = contentValue;
                    section.appendChild(content);
                }
                weekDiv.appendChild(section);
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

    weekSelect.addEventListener('change', (e) => {
        currentWeek = parseInt(e.target.value, 10);
        renderWeek(currentWeek);
    });
});
