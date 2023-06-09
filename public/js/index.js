axios.defaults.headers.post['Content-Type'] = 'application/json';
// Контейнер для вывода голосований
let container = document.querySelector(`.votes-container`);

// Массив для хранения голосований
let VOTES = [];

// Загрузка данных при запуске скрипта
loadVotes();
activateForm()
async function loadVotes() {
    // 1. Загрузи данные с сервера
    let response = await axios(`/votes/all`);
    let votes = response.data;
    // 2. Сохрани их в массив VOTES
    VOTES = votes;
    // 3. Выведи массив на экран
    renderVotes();
}

function renderVotes() {
    // 1. Очисти контейнер
    container.innerHTML = ``;

    // 2. Нарисуй каждое голосование
    for (let i = 0; i < VOTES.length; i++) {
        // 3. Получи голосование
        let vote = VOTES[i];

        // 4. Выведи информацию о голосовании
        container.innerHTML += `
        <div class="vote card border-info mb-4">
            <div class="card-header border-info">
                <h5 class="card-title mb-0">
                    <a href="#">
                        ${vote.title}
                    </a>
                </h5>
            </div>
            <div class="card-body">
                <p class="card-text mb-4">
                    ${vote.description}
                </p>
                <div class="d-flex justify-content-between">
                    <div>
                        <button type="button" class="vote-positive btn btn-outline-success">
                            За
                            <span class="badge rounded-pill text-bg-success">
                            ${vote.positive}
                            </span>
                        </button>
                        <button type="button" class="vote-negative btn btn-outline-danger">
                            Против
                            <span class="badge rounded-pill text-bg-danger">
                            ${vote.negative}
                            </span>
                        </button>
                    </div>
                    <button type="button" class="vote-remove btn btn-outline-secondary">
                        Удалить голосование
                    </button>
                </div>
            </div>
        </div>
        `;
    }
    activateClicks()
    positiveClicks()
    negativeClicks()
}


function activateForm() {
    let form = document.querySelector(`#send-data`);

    form.addEventListener(`submit`, async function (evt) {
        evt.preventDefault();

        let response = await axios.post('/votes/create', form);
        let vote = response.data;
        console.log(vote.positive)
        // Закончи код функции:
        VOTES.push(vote)
        renderVotes()
        // 1. добавь голосование в массив
        // 2. перерисуй список голосований
        form.reset();
    });
}

function activateClicks() {
    // 1. Найди все кнопки
    let removeButtons = document.querySelectorAll(`.vote-remove`);

    for (let i = 0; i < removeButtons.length; i++) {
        let button = removeButtons[i];
        let vote = VOTES[i];
        
        // 2. Повесь на каждую кнопку отбработчик
        button.addEventListener(`click`, async function () {
            let response = axios.post('/votes/remove', {
                id: vote._id
            });
            // VOTES.splice(i, 1);
            VOTES.splice(i, 1);
            renderVotes();
        });
        
    }
    
}

function positiveClicks() {
    // 1. Найди все кнопки
    let positiveButtons = document.querySelectorAll(`.vote-positive`);
    // console.log(positiveButtons)
    for (let i = 0; i < positiveButtons.length; i++) {
        let button = positiveButtons[i];
        let vote = VOTES[i];
        
        // 2. Повесь на каждую кнопку отбработчик
        button.addEventListener(`click`, async function () {
            let response = axios.post('/votes/positive', {
                id: vote._id
            });
            // VOTES.splice(i, 1);
            VOTES[i].positive++;
            
            renderVotes();
        });
        
    }
    
}


function negativeClicks() {
    // 1. Найди все кнопки
    let negativeButtons = document.querySelectorAll(`.vote-negative`);
    // console.log(positiveButtons)
    for (let i = 0; i < negativeButtons.length; i++) {
        let button = negativeButtons[i];
        let vote = VOTES[i];
        
        // 2. Повесь на каждую кнопку отбработчик
        button.addEventListener(`click`, async function () {
            let response = axios.post('/votes/negative', {
                id: vote._id
            });
            // VOTES.splice(i, 1);
            VOTES[i].negative++;
            renderVotes();
        });
        
    }
    
}



