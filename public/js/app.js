const content = document.querySelector('#content');
const hint = document.querySelector('#hint');
const showHint = document.createElement('button');

const params = new URLSearchParams(document.location.search);
const side = params.get('side');

if (side === 'question') { 
    // Hide the hint when the page loads
    hint.style.display = 'none';

    // Add a button prompting the user to display the hint
    showHint.textContent = 'Hint';
    content.append(showHint);

    // When button is clicked, show the hint and hide the button
    showHint.addEventListener('click', e => {
        e.target.style.display = 'none';
        hint.style.display = 'block';
    });
}
