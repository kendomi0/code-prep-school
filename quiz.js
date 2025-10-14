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
    },

    q4: {
        correct: 'b',
        messages: {
            a: 'Not quite. The insert() method adds the argument (Taylor) to the list at the given index (0), but think about what happens to the indices of the elements that follow it.',
            b: "Correct! Because 'Taylor' is not inserted at the end of the list, the list's other elements must shift position, which results in an O(n) time complexity.",
            c: 'Not quite. There are no loops within a loop that would result in a quadratic time complexity.'
        }
    },
    
    q5: {
        correct: 'b',
        messages: {
            a: 'Not quite. There are loops in this code that are dependent on input size.',
            b: 'Correct! The outer loop is dependent on the input size of n, while the inner loop always runs the same number of times (5), so the time complexity is O(5n). We drop the constant to get O(n).',
            c: 'Not quite. Note that the range for the inner loop is fixed, not a variable. Consider whether it would still be dependent on input size.'
        }
    },
     q6: {
        correct: 'c',
        messages: {
            a: 'Not quite. Take a deeper look at what exactly this code is doing.',
            b: 'Not quite. There may not be an explicit nested loop, but think about what the line in the loop body does.',
            c: 'Correct! Strings are immutable, so string concatenations do not "add" to strings. Instead, they copy each letter into a new string. Because the time complexity of the outer loop is O(n), and the code inside the loop has a time complexity is O(n), we multiply to get O(n^2).'
        }
     },

     q7: {
        correct: 'a',
        messages: {
            a: 'Correct! In the best case, target is 1, so the loop only runs once.',
            b: 'Not quite. Think about what best-case means, and think about what would occur if the condition is met on the first iteration.',
            c: 'Not quite. Consider how many times the code inside the condition would run.'
        }
     },

     q8: {
        correct: 'c',
        messages: {
            a: 'Not quite. Look at the loops in this code, then think about what the code itself does.',
            b: 'Not quite. Think about how the code inside the for loop works.',
            c: 'Correct! The in operator has a time complexity of O(n), since it internally iterates through every item in the list. Because the in operator is inside a for loop, the full code has a time complexity of O(n^2).'
        }
     },

     q9: {
        correct: 'b',
        messages: {
            a: 'Not quite. Consider the behavior of the built-in method max().',
            b: 'Correct! The max() method has a time complexity of O(n), as it internally iterates through every item in the list.',
            c: 'Not quite. There are no loops within a loop here.'
        }
     },

     q10: {
        correct: 'a',
        messages: {
            a: 'Correct! Set lookup has a constant time complexity.',
            b: 'Not quite. Consider the behavior of sets versus lists.',
            c: 'Not quite. There are no loops within a loop here.'
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