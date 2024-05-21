        document.addEventListener('DOMContentLoaded', () => {
            const characterBtn = document.getElementById('character-btn');
            const energyModal = document.getElementById('energyModal');
            const closeModalBtn = document.getElementById('closeModalBtn');
            const pomodoroBtn = document.getElementById('pomodoro-btn');
            const expensesBtn = document.getElementById('expenses-btn');
            const inventoryBtn = document.getElementById('inventory-btn');
            const nutritionBtn = document.getElementById('nutrition-btn');
            const scientistsBtn = document.getElementById('scientists-btn');
            const gameStatsSection = document.getElementById('game-stats-section');
            const inventorySection = document.getElementById('inventory-section');
            const nutritionSection = document.getElementById('nutrition-section');
            const scientistsSection = document.getElementById('scientists-section');
            const expensesSection = document.getElementById('expenses-section');
            const actionBar = document.getElementById('action-bar');

            characterBtn.addEventListener('click', () => {
                gameStatsSection.classList.remove('hidden');
                energyModal.classList.remove('hidden');
                inventorySection.classList.add('hidden');
                nutritionSection.classList.add('hidden');
                scientistsSection.classList.add('hidden');
                actionBar.classList.remove('hidden');
                expensesSection.classList.add('hidden');
                setActiveButton(characterBtn);
            });

            closeModalBtn.addEventListener('click', () => {
                energyModal.classList.add('hidden');
            });

            pomodoroBtn.addEventListener('click', () => {
                gameStatsSection.innerHTML = '<iframe src="https://flocus.com/minimalist-pomodoro-timer/" class="w-full h-96" frameborder="0"></iframe>';
                gameStatsSection.classList.remove('hidden');
                inventorySection.classList.add('hidden');
                nutritionSection.classList.add('hidden');
                scientistsSection.classList.add('hidden');
                actionBar.classList.remove('hidden');
                expensesSection.classList.add('hidden');
                setActiveButton(pomodoroBtn);
            });

            expensesBtn.addEventListener('click', () => {
                expensesSection.classList.remove('hidden');
                gameStatsSection.classList.add('hidden');
                inventorySection.classList.add('hidden');
                nutritionSection.classList.add('hidden');
                scientistsSection.classList.add('hidden');
                actionBar.classList.remove('hidden');
                setActiveButton(expensesBtn);
            });

            inventoryBtn.addEventListener('click', () => {
                inventorySection.classList.remove('hidden');
                gameStatsSection.classList.add('hidden');
                nutritionSection.classList.add('hidden');
                scientistsSection.classList.add('hidden');
                actionBar.classList.add('hidden');
                expensesSection.classList.add('hidden');
                setActiveButton(inventoryBtn);
            });

            nutritionBtn.addEventListener('click', () => {
                nutritionSection.classList.remove('hidden');
                gameStatsSection.classList.add('hidden');
                inventorySection.classList.add('hidden');
                scientistsSection.classList.add('hidden');
                actionBar.classList.remove('hidden');
                expensesSection.classList.add('hidden');
                setActiveButton(nutritionBtn);
            });

            scientistsBtn.addEventListener('click', () => {
                scientistsSection.classList.remove('hidden');
                gameStatsSection.classList.add('hidden');
                inventorySection.classList.add('hidden');
                nutritionSection.classList.add('hidden');
                actionBar.classList.add('hidden');
                expensesSection.classList.add('hidden');
                setActiveButton(scientistsBtn);
            });

            function setActiveButton(activeButton) {
                const buttons = document.querySelectorAll('.nav-button');
                buttons.forEach(button => {
                    button.classList.remove('active');
                });
                activeButton.classList.add('active');
            }

            // Show modal on page load
            energyModal.classList.remove('hidden');

            const inputs = document.querySelectorAll('#gender, #age, #weight, #height, #activity');
            inputs.forEach(input => {
                input.addEventListener('input', calculateEnergy);
            });

            function calculateBMR(gender, weight, height, age) {
                if (gender === 'male') {
                    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
                } else {
                    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
                }
            }

            function calculateDEJ(bmr, activityLevel) {
                return bmr * activityLevel;
            }

            function calculateLifeExpectancyPercentage(gender, age) {
                const lifeExpectancy = gender === 'male' ? 80.0 : 85.7;
                const remainingLifeYears = Math.max(lifeExpectancy - age, 0);
                return {
                    percentage: (remainingLifeYears / lifeExpectancy) * 100,
                    lifeExpectancy
                };
            }

            function calculateEnergy() {
                const gender = document.getElementById('gender').value;
                const weight = parseFloat(document.getElementById('weight').value);
                const height = parseFloat(document.getElementById('height').value);
                const age = parseInt(document.getElementById('age').value, 10);
                const activityLevel = parseFloat(document.getElementById('activity').value);

                if (weight > 0 && height > 0 && age > 0 && activityLevel > 0) {
                    const bmr = calculateBMR(gender, weight, height, age);
                    const dej = calculateDEJ(bmr, activityLevel);
                    document.getElementById('bmr').innerHTML = `${bmr.toFixed(0)} kcal /jour Métabolisme de Base au Repos (BMR)`;
                    document.getElementById('dej').innerHTML = `${dej.toFixed(0)} kcal /jour Dépense Énergétique Journalière (DEJ)`;
                    document.getElementById('nap').innerHTML = `${activityLevel.toFixed(2)} Niveau d'Activité Physique (NAP)`;
                    updateLifeExpectancy(gender, age);
                } else {
                    document.getElementById('bmr').innerHTML = "Please fill all fields with valid values to calculate BMR and DEJ.";
                }
            }

            function updateLifeExpectancy(gender, age) {
                if (age > 0) {
                    const lifeData = calculateLifeExpectancyPercentage(gender, age);
                    const lifePercentageFormatted = `(${lifeData.percentage.toFixed(0)}%) ${age}/ ${lifeData.lifeExpectancy.toFixed(0)}`;
                    document.getElementById('ageDisplay').innerHTML = `Age: ${age}`;
                    document.getElementById('lifePercentageText').innerHTML = lifePercentageFormatted;
                    document.getElementById('lifePercentage').style.width = `${lifeData.percentage.toFixed(2)}%`;

                    // Update additional info section
                    document.getElementById('displayed-age').innerHTML = age;
                    updateAgeProgressBar(age, gender);
                }
            }

            function updateAgeProgressBar(age, gender) {
                const lifeExpectancy = (gender === 'male') ? 80.0 : 85.7;
                const agePercentage = ((age / lifeExpectancy) * 100).toFixed(2);
                const ageProgressBarContainer = document.getElementById('ageProgressBarContainer');
                ageProgressBarContainer.innerHTML = `
                    <div class="rounded bg-green-500 relative overflow-hidden">
                        <div class="bg-green-700 text-black text-lg px-2 rounded" style="width: ${agePercentage}%; max-width: 100%; white-space: nowrap;">
                            (${agePercentage}%) ${age} / ${lifeExpectancy}
                        </div>
                    </div>
                `;
            }

            // CSV import logic
            document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);

            function handleFileSelect(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const contents = e.target.result;
                        parseCSV(contents);
                    };
                    reader.readAsText(file);
                }
            }

            function parseCSV(data) {
                const lines = data.split('\n');
                const tableBody = document.querySelector('#expensesTable tbody');
                tableBody.innerHTML = ''; // Clear existing table rows

                for (let i = 0; i < lines.length; i++) {
                    const row = lines[i].split('\t'); // Assuming tab-separated values
                    if (row.length === 3) {
                        const newRow = document.createElement('tr');
                        for (let j = 0; j < row.length; j++) {
                            const cell = document.createElement('td');
                            cell.textContent = row[j];
                            cell.className = 'py-2 px-4 border-t border-gray-700';
                            newRow.appendChild(cell);
                        }
                        tableBody.appendChild(newRow);
                    }
                }
            }
        });

        // Change background color and text color based on MBTI type
        function changeBackgroundColorAndTextColor() {
            const mbtiType = document.getElementById('mbti-type').value;
            let bgColor = '';
            let textColor = '';

            switch (mbtiType) {
                case 'ISTJ':
                    bgColor = 'bg-gray-700';
                    textColor = 'text-gray-400';
                    break;
                case 'ISFJ':
                    bgColor = 'bg-green-700';
                    textColor = 'text-green-400';
                    break;
                case 'INFJ':
                    bgColor = 'bg-blue-700';
                    textColor = 'text-blue-400';
                    break;
                case 'INTJ':
                    bgColor = 'bg-purple-700';
                    textColor = 'text-purple-400';
                    break;
                case 'ISTP':
                    bgColor = 'bg-red-700';
                    textColor = 'text-red-400';
                    break;
                case 'ISFP':
                    bgColor = 'bg-yellow-700';
                    textColor = 'text-yellow-400';
                    break;
                case 'INFP':
                    bgColor = 'bg-pink-700';
                    textColor = 'text-pink-400';
                    break;
                case 'INTP':
                    bgColor = 'bg-indigo-700';
                    textColor = 'text-indigo-400';
                    break;
                case 'ESTP':
                    bgColor = 'bg-orange-700';
                    textColor = 'text-orange-400';
                    break;
                case 'ESFP':
                    bgColor = 'bg-teal-700';
                    textColor = 'text-teal-400';
                    break;
                case 'ENFP':
                    bgColor = 'bg-cyan-700';
                    textColor = 'text-cyan-400';
                    break;
                case 'ENTP':
                    bgColor = 'bg-lime-700';
                    textColor = 'text-lime-400';
                    break;
                case 'ESTJ':
                    bgColor = 'bg-amber-700';
                    textColor = 'text-amber-400';
                    break;
                case 'ESFJ':
                    bgColor = 'bg-rose-700';
                    textColor = 'text-rose-400';
                    break;
                case 'ENFJ':
                    bgColor = 'bg-fuchsia-700';
                    textColor = 'text-fuchsia-400';
                    break;
                case 'ENTJ':
                    bgColor = 'bg-violet-700';
                    textColor = 'text-violet-400';
                    break;
                default:
                    bgColor = 'bg-gray-800';
                    textColor = 'text-white';
            }

            document.body.className = `${bgColor} text-white font-sans leading-normal tracking-normal`;
            document.getElementById('character-name').className = `font-bold text-lg overflow-hidden transition-color ${textColor}`;
        }