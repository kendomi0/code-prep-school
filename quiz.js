const radios = document.querySelectorAll('input[name="q1"]');
const messageDiv = document.getElementById('message');

if (radios.length > 0) {
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'a. O(1)') {
                messageDiv.textContent = 'Not quite. It may seem like the time complexity would be constant because there are no explicitly written loops, but think about what the count() method actually does and how it would do it.';
                messageDiv.style.color = 'red';
            } else if (this.value==='b. O(n)') {
                messageDiv.textContent = 'Correct! The time complexity is O(n), because the count() method internally iterates through every character in the object, which is tongue_twister, in order to find the number of total occurrences of the argument ("p") there are.'
                messageDiv.style.color = 'green';
            }
            else {
                messageDiv.textContent = 'Not quite. There are no nested loops or anything else that would cause a quadratic time complexity.'
                messageDiv.style.color = 'red';
            }
        });
    });
}