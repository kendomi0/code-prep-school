const feedback = {
    q1: {
        correct: 'b',
        messages: {
            a: 'Not quite. It may seem like the time complexity would be constant because there are no explicitly written loops, but think about what the count() method actually does and how it would do it.',
            b: 'Correct! The time complexity is O(n), because the count() method internally iterates through every character in the object, which is tongue_twister, in order to find the number of total occurrences of the argument ("p") there are.',
            c: 'Not quite. There are no nested loops or anything else that would cause a quadratic time complexity.'
        }
    },

    q2: {
        correct: 'a',
        messages: {
            a: 'Correct! The time complexity is O(1), because the while loop never executes. Num is 100, and the while loop only runs when num is less than 50.',
            b: 'Not quite. Take a second look at the condition of the while loop, and think about whether it would be satisfied.',
            c: 'Not quite. There is one while loop in the code, but there is not a loop within a loop.'
        }
    },

    q3: {
        correct: 'a',
        messages: {
            a: 'Correct! Accessing a dictionary value using its key has a constant time complexity.',
            b: 'Not quite. When you access a dictionary value by key, the code does not have to iterate through the whole dictionary to get to that key:value pair.',
            c: 'Not quite. There are no loops in this code.'
        }
    }
};

document.querySelectorAll('.question').forEach(question => {
    const qid = question.dataset.qid;
    const radios = question.querySelectorAll('input[type="radio"]');
    const messageDiv = question.querySelector('.message');
    
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            messageDiv.textContent = feedback[qid].messages[this.value];
            messageDiv.style.color = this.value === feedback[qid].correct ? 'green' : 'red';
        });
    });
});