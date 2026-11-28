const baseURL = `${import.meta.env.BASE_URL}`;
const pagesPath = `${baseURL}src/pages/`

const links = {
    'home': `index.html`,
    'time-complexity-basics': `time-complexity-basics/time-complexity-basics.html`,
    'built-in-methods': `built-in-methods.html`,
    'constant-time-complexity': `constant-time-complexity.html`,
    'linear-time-complexity': `linear-time-complexity.html`,
    'quadratic-time-complexity': `quadratic-time-complexity.html`,
    'time-complexity-quiz': `time-complexity-quiz/time-complexity-quiz.html`,
    'intro-to-algorithms': `intro-to-algorithms/intro-to-algorithms.html`,
    'insertion-sort': `insertion-sort/insertion-sort.html`,
    'bubble-sort': `bubble-sort/bubble-sort.html`
}

export function setLinks() {
    const dataLinks = document.querySelectorAll("[data-link]")
    console.log("set links")
    if (dataLinks) {
        dataLinks.forEach((el) => {
            if (el.dataset.link == 'home') {
                el.href = baseURL + 'index.html'
            }
            else {
                el.href = pagesPath + links[el.dataset.link]
            }
        })
    }   
}
