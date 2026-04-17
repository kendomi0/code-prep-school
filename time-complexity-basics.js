   hljs.highlightAll();

    const input = document.getElementById("num-input");
    const chosenNums = document.querySelectorAll(".chosen-num");
    const btn = document.getElementById("demo-btn");

    const linearOps = document.getElementById("linear-ops");
    const quadraticOps = document.getElementById("quadratic-ops");
    const exponentialOps = document.getElementById("exponential-ops");
    const logarithmicOps = document.getElementById("log-ops");
    const linearithmicOps = document.getElementById("linearithmic-ops");
    const factorialOps = document.getElementById("factorial-ops");

    const invalidMsg = document.getElementById("invalid-msg");

    const linearBtn = document.getElementById("linear-btn");
    const quadraticBtn = document.getElementById("quadratic-btn");
    const exponentialBtn = document.getElementById("exponential-btn");
    const logarithmicBtn = document.getElementById("logarithmic-btn");
    const constantBtn = document.getElementById("constant-btn");
    const factorialBtn = document.getElementById("factorial-btn");
    const linearithmicBtn = document.getElementById("linearithmic-btn");
    const complexityGraph = document.getElementById("complexity-graph");

    const constantGraphDisclaimer = document.getElementById("constant-graph-disclaimer");

    function factorial(x) {

        let total = 1

        for (let i = x; i >= 1; i--) {
            total = total * i
        }

        return total;

    }

    // Time complexity calculation buttons

    btn.addEventListener("click", function() {
        const inputNumber = Number(input.value);

        if (inputNumber > 50) {
            invalidMsg.style.display = "block";
            return;
        }

        else {
            invalidMsg.style.display = "none";
            chosenNums.forEach(function(chosenNum) {
            chosenNum.textContent = inputNumber;
        });

        linearOps.textContent = inputNumber;
        quadraticOps.textContent = inputNumber ** 2;
        exponentialOps.textContent = 2 ** inputNumber;
        logarithmicOps.textContent = (Math.log2(inputNumber)).toFixed(3);
        linearithmicOps.textContent = (inputNumber * (Math.log2(inputNumber))).toFixed(3);
        factorialOps.textContent = factorial(inputNumber);

        }

    });

    // Graph

    function generateData(xArr, yArr, formula, i1, i2, step = 1) {
        for (let x = i1; x <= i2; x += step) {
            xArr.push(x);
            yArr.push(formula(x));
            }
    }

    const xValues = [];
    const yConstant = [];
    const yLog = [];
    const yLinear = [];
    const yLinearithmic = [];
    const yQuad = [];
    const yExpo = [];
    const yFactorial = [];
    const xEndpoint = 30;
    const increment = 2;
    const gridColor = '#242323';

    generateData(xValues, yConstant, x => 1, 0, xEndpoint, increment);
    generateData([], yLog, x => Math.log2(x), 0, xEndpoint, increment);
    generateData([], yLinear, x => x, 0, xEndpoint, increment);
    generateData([], yLinearithmic, x => x * Math.log2(x), 0, xEndpoint, increment);
    generateData([], yQuad, x => x * x, 0, xEndpoint, increment);
    generateData([], yExpo, x => 2 ** x, 0, xEndpoint, increment);
    generateData([], yFactorial, x => factorial(x), 0, xEndpoint, increment);

    const complexityGraphChart = 
        new Chart(complexityGraph, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [
                    { label: 'O(1)', data: yConstant, borderColor: '#530000' },
                    { label: 'O(logn)', data: yLog, borderColor: '#C74440' },
                    { label: 'O(n)', data: yLinear, borderColor: '#66620D' },
                    { label: 'O(nlogn)', data: yLinearithmic, borderColor: '#348543' },
                    { label: 'O(n²)', data: yQuad, borderColor: '#2D70B3' },
                    { label: 'O(2ⁿ)', data: yExpo, borderColor: '#6042A6' },
                    { label: 'O(n!)', data: yFactorial, borderColor: '#a13f94' }
                ]
            },
            options: {
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { color: gridColor }
                    },

                    y: {
                        min: 0,
                        max: 90,
                        grid: { color: gridColor }
                    }
                }
            }
        });

    // Toggle buttons for graph

    complexityBtns = [constantBtn, logarithmicBtn, linearBtn, linearithmicBtn, quadraticBtn, exponentialBtn, factorialBtn]

    complexityBtns.forEach((cBtn, index) => {
        cBtn.addEventListener('click', () => {
            cBtn.classList.toggle('active');
            complexityGraphChart.data.datasets[index].hidden = !complexityGraphChart.data.datasets[index].hidden;
            complexityGraphChart.update();
        });
    });
