let points = 0;

function addPoint() {
  points++;
  document.getElementById('score').innerText = `Points: ${points}`;
}

function showStats() {
  alert(`You have collected ${points} points so far!`);
}

function inviteFriend() {
  alert('Invite your friends to play this game!');
}
