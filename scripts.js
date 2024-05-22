// script.js
$(document).ready(function() {
    // Navigation logic
    $('.nav-btn').on('click', function() {
        var target = $(this).data('target');
        $('.content').removeClass('active');
        $('#' + target).addClass('active');
    });

    // Initial stats setup
    const defaultStats = {
        vie: 155480,
        mana: 250000,
        intelligence: 5115,
        endurance: 7774,
        critique: '15%',
        hate: '7%',
        maitrise: '5%',
        polyvalence: '4%',
    };

    const stats = JSON.parse(localStorage.getItem('stats')) || defaultStats;
    let userPoints = parseInt(localStorage.getItem('userPoints')) || 0;

    function updateStatsUI() {
        for (const [key, value] of Object.entries(stats)) {
            $('#' + key).text(value);
        }
    }

    function updatePointsUI() {
        $('#user-points').text(userPoints);
    }

    updateStatsUI();
    updatePointsUI();

    // Editable stats
    $('.edit-stat').on('click', function() {
        const statKey = $(this).data('stat');
        const currentValue = stats[statKey];
        const newValue = prompt(`Enter new value for ${statKey}:`, currentValue);
        if (newValue !== null) {
            stats[statKey] = newValue;
            $('#' + statKey).text(newValue);
            localStorage.setItem('stats', JSON.stringify(stats));
        }
    });

    // Specialisations setup
    const specialisations = [
        { name: 'Équilibre', active: false },
        { name: 'Farouche', active: false },
        { name: 'Gardien', active: false },
        { name: 'Restauration', active: true },
    ];

    specialisations.forEach(spec => {
        const specDiv = $('<div>').addClass('spec').addClass(spec.active ? 'active' : 'inactive');
        specDiv.attr('data-name', spec.name);
        const specTitle = $('<h3>').text(spec.name);
        const specDesc = $('<p>').text('Joueur contre Joueur');
        specDiv.append(specTitle, specDesc);
        $('#specialisation .spec-list').append(specDiv);
    });

    // Switch specialisations
    $('#specialisation .spec').on('click', function() {
        $('#specialisation .spec').removeClass('active');
        $(this).addClass('active');
    });

    // Combat logic
    $('#start-combat').on('click', function() {
        const combatLog = $('#combat-log');
        combatLog.empty();
        let enemyHealth = 10000;
        const playerAttack = parseInt(stats.intelligence) * 10;
        let combatRounds = 0;
        
        while (enemyHealth > 0) {
            combatRounds++;
            const damage = playerAttack + Math.floor(Math.random() * 100);
            combatLog.append(`<p>Round ${combatRounds}: You dealt ${damage} damage!</p>`);
            enemyHealth -= damage;
        }
        combatLog.append('<p>You defeated the enemy!</p>');
        userPoints += 100;
        updatePointsUI();
        localStorage.setItem('userPoints', userPoints);
    });

    // Shop logic
    $('.buy-item').on('click', function() {
        const itemPrice = parseInt($(this).parent().data('price'));
        if (userPoints >= itemPrice) {
            userPoints -= itemPrice;
            updatePointsUI();
            localStorage.setItem('userPoints', userPoints);
            alert('Item purchased!');
        } else {
            alert('Not enough points!');
        }
    });
});
