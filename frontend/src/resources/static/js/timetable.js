// Fonction pour ajouter les semaines au tableau
function addWeeks() {
  var weeksRow = document.getElementById('weeks-row');
  var today = new Date();
  var currentWeek = getWeekNumber(today);

  for (var i = 1; i <= 52; i++) {
    var weekCell = document.createElement('td');
    var weekLink = document.createElement('a');
    weekLink.href = '#';
    weekLink.textContent = i;
    weekLink.classList.add('btn', 'btn-link', 'week-link');
    weekCell.appendChild(weekLink);
    if (i === currentWeek) {
      weekCell.classList.add('current-week');
    }
    weeksRow.appendChild(weekCell);
  }
}

// Numéro de la semaine actuelle
function getWeekNumber(date) {
  // On règle la date sur le début de l'année
  var startOfYear = new Date(date.getFullYear(), 0, 1);
  // On calcule le premier jour de la semaine 1
  var dayOfWeek = startOfYear.getDay();
  var startOfFirstWeek = startOfYear;
  if (dayOfWeek > 4) { // Si le premier jour est vendredi ou samedi, on recule la semaine
    startOfFirstWeek.setDate(startOfYear.getDate() + (7 - dayOfWeek + 1));
  } else { // Sinon, on avance la semaine
    startOfFirstWeek.setDate(startOfYear.getDate() - dayOfWeek + 1);
  }

  // On calcule le nombre de jours écoulés depuis le début de l'année
  var diff = date - startOfFirstWeek;
  // On calcule le nombre de semaines écoulées
  var oneWeek = 1000 * 60 * 60 * 24 * 7;
  var weekNumber = Math.ceil((diff + 1) / oneWeek);

  return weekNumber;
}

addWeeks();


