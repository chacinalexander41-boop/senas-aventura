/* =========================================================
   SEÑAS AVENTURA
   ENTREGA 3
   SISTEMA DE NIVELES
========================================================= */


/* =========================================================
   VARIABLES
========================================================= */

let currentUser = null;

let selectedLevel = null;


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const GAME_CONFIG = {

    initialLives: 5,

    maxLives: 5,

    initialCoins: 0,

    initialXP: 0,

    initialScore: 0,

    initialLevel: 1,

    xpPerLevel: 100

};


/* =========================================================
   DATOS DE LOS NIVELES
========================================================= */

const LEVELS = [

    {
        id: 1,

        illustration: "alphabet",

        title: "Abecedario",

        description:
            "Aprende las letras del abecedario " +
            "mediante lengua de señas.",

        difficulty: "Fácil",

        rewardScore: 100,

        rewardXP: 50,

        rewardCoins: 20

    },


    {
        id: 2,

        illustration: "numbers",

        title: "Números",

        description:
            "Aprende a reconocer y expresar " +
            "números en lengua de señas.",

        difficulty: "Fácil",

        rewardScore: 150,

        rewardXP: 75,

        rewardCoins: 25

    },


    {
        id: 3,

        illustration: "colors",

        title: "Colores",

        description:
            "Descubre diferentes colores " +
            "y aprende sus señas.",

        difficulty: "Fácil",

        rewardScore: 200,

        rewardXP: 100,

        rewardCoins: 30

    },


    {
        id: 4,

        illustration: "animals",

        title: "Animales",

        description:
            "Aprende los nombres de animales " +
            "utilizando lengua de señas.",

        difficulty: "Fácil",

        rewardScore: 250,

        rewardXP: 125,

        rewardCoins: 35

    },


    {
        id: 5,

        illustration: "family",

        title: "Familia",

        description:
            "Aprende palabras relacionadas " +
            "con familiares y personas.",

        difficulty: "Intermedio",

        rewardScore: 300,

        rewardXP: 150,

        rewardCoins: 40

    },


    {
        id: 6,

        illustration: "food",

        title: "Alimentos",

        description:
            "Aprende señas relacionadas " +
            "con comidas y bebidas.",

        difficulty: "Intermedio",

        rewardScore: 350,

        rewardXP: 175,

        rewardCoins: 45

    },


    {
        id: 7,

        illustration: "school",

        title: "Escuela",

        description:
            "Aprende vocabulario relacionado " +
            "con la escuela.",

        difficulty: "Intermedio",

        rewardScore: 400,

        rewardXP: 200,

        rewardCoins: 50

    },


    {
        id: 8,

        illustration: "home",

        title: "Casa",

        description:
            "Aprende objetos y lugares " +
            "dentro de una casa.",

        difficulty: "Intermedio",

        rewardScore: 450,

        rewardXP: 225,

        rewardCoins: 55

    },


    {
        id: 9,

        illustration: "actions",

        title: "Acciones",

        description:
            "Aprende diferentes acciones " +
            "y verbos.",

        difficulty: "Avanzado",

        rewardScore: 500,

        rewardXP: 250,

        rewardCoins: 60

    },


    {
        id: 10,

        illustration: "phrases",

        title: "Frases",

        description:
            "Combina palabras para comprender " +
            "frases completas.",

        difficulty: "Avanzado",

        rewardScore: 600,

        rewardXP: 300,

        rewardCoins: 70

    },


    {
        id: 11,

        illustration: "comprehension",

        title: "Comprensión",

        description:
            "Pon a prueba tus conocimientos " +
            "con ejercicios más difíciles.",

        difficulty: "Avanzado",

        rewardScore: 750,

        rewardXP: 350,

        rewardCoins: 80

    },


    {
        id: 12,

        illustration: "master",

        title: "Maestro de Señas",

        description:
            "El desafío final para demostrar " +
            "todo lo que has aprendido.",

        difficulty: "Experto",

        rewardScore: 1000,

        rewardXP: 500,

        rewardCoins: 100

    }

];

function levelIllustration(illustration, label) {

    return `
        <svg
            class="illustration-image"
            viewBox="0 0 128 128"
            role="img"
            aria-label="${label}"
        >
            <use href="#illustration-${illustration}"></use>
        </svg>
    `;

}

function hideAlphabetImageCredit() {

    document.getElementById(
        "alphabetImageCredit"
    ).hidden = true;

}


function numberIllustration(number) {

    return `
        <svg
            class="question-art"
            viewBox="0 0 128 128"
            role="img"
            aria-label="Número ${number}"
        >
            <rect x="8" y="8" width="112" height="112" rx="28" fill="#ede9fe"/>
            <circle cx="28" cy="29" r="5" fill="#f59e0b"/>
            <circle cx="100" cy="99" r="5" fill="#22c55e"/>
            <text
                x="64"
                y="86"
                text-anchor="middle"
                font-family="Arial, Helvetica, sans-serif"
                font-size="76"
                font-weight="700"
                fill="#6d28d9"
            >${number}</text>
        </svg>
    `;

}

function colorIllustration(color) {

    return `
        <svg
            class="question-art"
            viewBox="0 0 128 128"
            role="img"
            aria-label="Color ${color.name.toLowerCase()}"
        >
            <rect x="8" y="8" width="112" height="112" rx="28" fill="#f8fafc"/>
            <circle
                cx="64"
                cy="64"
                r="37"
                fill="${color.color}"
                stroke="${color.name === "BLANCO" ? "#94a3b8" : "#ffffff"}"
                stroke-width="5"
            />
            <path
                d="M47 48c7-8 20-12 30-7"
                fill="none"
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-opacity=".7"
                stroke-width="6"
            />
        </svg>
    `;

}

function alphabetIllustration(letter) {

    const imageName =
        letter === "Ñ"
        ? "enye"
        : letter.toLowerCase();

    return `
        <img
            class="question-art"
            src="assets/senas/lse/${imageName}.png"
            alt="Seña de dactilología LSE para la letra ${letter}"
        >
    `;

}


/* =========================================================
   USUARIOS
========================================================= */

function getUsers() {

    const data =
        localStorage.getItem(
            "senasAventuraUsers"
        );


    if (!data) {

        return [];

    }


    try {

        return JSON.parse(data);

    }

    catch {

        return [];

    }

}


/* =========================================================
   GUARDAR USUARIOS
========================================================= */

function saveUsers(users) {

    localStorage.setItem(

        "senasAventuraUsers",

        JSON.stringify(users)

    );

}


/* =========================================================
   MOSTRAR PANTALLA
========================================================= */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(
            ".screen"
        );


    screens.forEach(
        screen => {

            screen.classList.remove(
                "active"
            );

        }
    );


    const selected =
        document.getElementById(
            screenId
        );


    if (selected) {

        selected.classList.add(
            "active"
        );

    }

}


/* =========================================================
   CREAR JUGADOR
========================================================= */

function createNewPlayer(
    username,
    password
) {

    return {

        username: username,

        password: password,

        avatar: "🧑‍🎓",

        score: 0,

        xp: 0,

        level: 1,

        lives: 5,

        coins: 0,

        coinsEarned: 0,

        bestCorrect: 0,

        ownedCosmetics: [],

        equippedFrame: "",

        equippedCard: "",

        equippedBadge: "",

        progress: 0,

        streak: 0,

        lastLogin: null,

        lessonsCompleted: 0,

        gamesCompleted: 0,

        totalCorrect: 0,

        totalIncorrect: 0,

        achievements: [],

        unlockedLevels: [1],

        levelProgress: {

            1: {
                progress: 0,
                stars: 0,
                completed: false
            }

        }

    };

}


/* =========================================================
   NORMALIZAR JUGADOR
========================================================= */

function normalizeUser(user) {

    return {

        username:
            user.username || "Jugador",

        password:
            user.password || "",

        avatar:
            user.avatar || "🧑‍🎓",

        score:
            Number(user.score) || 0,

        xp:
            Number(user.xp) || 0,

        level:
            Number(user.level) || 1,

        lives:
            Number(user.lives) || 5,

        coins:
            Number(user.coins) || 0,

        coinsEarned:
            Number(user.coinsEarned) ||
            Number(user.coins) ||
            0,

        bestCorrect:
            Number(user.bestCorrect) || 0,

        ownedCosmetics:
            Array.isArray(user.ownedCosmetics)
                ? user.ownedCosmetics.filter(
                    item => typeof item === "string"
                )
                : [],

        equippedFrame:
            typeof user.equippedFrame === "string"
                ? user.equippedFrame
                : "",

        equippedCard:
            typeof user.equippedCard === "string"
                ? user.equippedCard
                : "",

        equippedBadge:
            typeof user.equippedBadge === "string"
                ? user.equippedBadge
                : "",

        progress:
            Number(user.progress) || 0,

        streak:
            Number(user.streak) || 0,

        lastLogin:
            user.lastLogin || null,

        lessonsCompleted:
            Number(
                user.lessonsCompleted
            ) || 0,

        gamesCompleted:
            Number(
                user.gamesCompleted
            ) || 0,

        totalCorrect:
            Number(
                user.totalCorrect
            ) || 0,

        totalIncorrect:
            Number(
                user.totalIncorrect
            ) || 0,

        achievements:
            Array.isArray(user.achievements)
                ? [...new Set(user.achievements.map(id => ({
                    firstGame: "first_game",
                    fiveHundred: "five_hundred",
                    levelFive: "level_five",
                    sevenDays: "seven_days"
                }[id] || id)))]
                : [],

        unlockedLevels:
            Array.isArray(
                user.unlockedLevels
            )
                ? user.unlockedLevels
                : [1],

        levelProgress:
            user.levelProgress || {

                1: {
                    progress: 0,
                    stars: 0,
                    completed: false
                }

            }

    };

}


/* =========================================================
   REGISTRO
========================================================= */

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                document
                    .getElementById(
                        "registerUsername"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "registerPassword"
                    )
                    .value;


            const password2 =
                document
                    .getElementById(
                        "registerPassword2"
                    )
                    .value;


            const message =
                document.getElementById(
                    "registerMessage"
                );


            if (
                username.length < 3
            ) {

                message.textContent =
                    "El usuario necesita mínimo 3 caracteres.";

                message.style.color =
                    "#dc2626";

                return;

            }


            if (
                password.length < 4
            ) {

                message.textContent =
                    "La contraseña necesita mínimo 4 caracteres.";

                message.style.color =
                    "#dc2626";

                return;

            }


            if (
                password !== password2
            ) {

                message.textContent =
                    "Las contraseñas no coinciden.";

                message.style.color =
                    "#dc2626";

                return;

            }


            const users =
                getUsers();


            const exists =
                users.some(
                    user =>
                        user.username
                            .toLowerCase()
                        ===
                        username.toLowerCase()
                );


            if (exists) {

                message.textContent =
                    "Ese usuario ya existe.";

                message.style.color =
                    "#dc2626";

                return;

            }


            const newPlayer =
                createNewPlayer(
                    username,
                    password
                );


            users.push(
                newPlayer
            );


            saveUsers(
                users
            );


            message.textContent =
                "🎉 ¡Cuenta creada!";

            message.style.color =
                "#16a34a";


            registerForm.reset();


            setTimeout(
                function() {

                    document
                        .getElementById(
                            "loginUsername"
                        )
                        .value =
                        username;


                    showScreen(
                        "loginScreen"
                    );

                },
                700
            );

        }
    );

}


/* =========================================================
   LOGIN
========================================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                document
                    .getElementById(
                        "loginUsername"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            const users =
                getUsers();


            const user =
                users.find(
                    item =>
                        item.username
                            .toLowerCase()
                        ===
                        username.toLowerCase()
                        &&
                        item.password
                        ===
                        password
                );


            if (!user) {

                message.textContent =
                    "❌ Usuario o contraseña incorrectos.";

                message.style.color =
                    "#dc2626";

                return;

            }


            currentUser =
                normalizeUser(
                    user
                );


            updateStreak();


            saveCurrentUser();


            localStorage.setItem(
                "senasAventuraCurrentUser",
                currentUser.username
            );


            loadPlayerData();


            showScreen(
                "homeScreen"
            );

        }
    );

}


/* =========================================================
   RACHA
========================================================= */

function updateStreak() {

    if (!currentUser) {

        return;

    }


    const today =
        new Date();


    const todayString =
        today
            .toISOString()
            .split("T")[0];


    if (
        !currentUser.lastLogin
    ) {

        currentUser.streak = 1;

        currentUser.lastLogin =
            todayString;

        return;

    }


    if (
        currentUser.lastLogin
        ===
        todayString
    ) {

        return;

    }


    const previous =
        new Date(
            currentUser.lastLogin
        );


    const difference =
        today.getTime()
        -
        previous.getTime();


    const days =
        Math.floor(
            difference
            /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    if (days === 1) {

        currentUser.streak += 1;

    }

    else {

        currentUser.streak = 1;

    }


    currentUser.lastLogin =
        todayString;

}


/* =========================================================
   CARGAR DATOS
========================================================= */

function loadPlayerData() {

    if (!currentUser) {

        return;

    }


    document.getElementById(
        "playerName"
    ).textContent =
        currentUser.username;


    document.getElementById(
        "homeAvatar"
    ).textContent =
        currentUser.avatar;


    document.getElementById(
        "homeLevel"
    ).textContent =
        currentUser.level;


    document.getElementById(
        "homeXP"
    ).textContent =
        currentUser.xp;


    document.getElementById(
        "score"
    ).textContent =
        currentUser.score;


    document.getElementById(
        "xp"
    ).textContent =
        currentUser.xp;


    document.getElementById(
        "lives"
    ).textContent =
        currentUser.lives;


    document.getElementById(
        "coins"
    ).textContent =
        currentUser.coins;


    document.getElementById(
        "streak"
    ).textContent =
        currentUser.streak;


    document.getElementById(
        "progressText"
    ).textContent =
        currentUser.progress
        +
        "%";


    document.getElementById(
        "progressBar"
    ).style.width =
        currentUser.progress
        +
        "%";


    updateXPBar();

}


/* =========================================================
   XP
========================================================= */

function updateXPBar() {

    if (!currentUser) {

        return;

    }


    const xpNeeded =
        GAME_CONFIG.xpPerLevel;


    const currentXP =
        currentUser.xp
        %
        xpNeeded;


    const percentage =
        (
            currentXP
            /
            xpNeeded
        )
        *
        100;


    document.getElementById(
        "xpBar"
    ).style.width =
        percentage
        +
        "%";


    document.getElementById(
        "xpText"
    ).textContent =
        currentXP
        +
        " / "
        +
        xpNeeded
        +
        " XP";

}


/* =========================================================
   AGREGAR XP
========================================================= */

function addXP(amount) {

    if (!currentUser) {

        return;

    }


    currentUser.xp +=
        amount;


    checkLevelUp();


    saveCurrentUser();


    loadPlayerData();

}


/* =========================================================
   SUBIR NIVEL
========================================================= */

function checkLevelUp() {

    if (!currentUser) {

        return;

    }


    const requiredXP =
        currentUser.level
        *
        GAME_CONFIG.xpPerLevel;


    if (
        currentUser.xp
        >=
        requiredXP
    ) {

        currentUser.level += 1;


        currentUser.lives =
            GAME_CONFIG.maxLives;


        currentUser.coins +=
            50;

        currentUser.coinsEarned +=
            50;


        unlockLevel(
            currentUser.level
        );


        alert(

            "🎉 ¡SUBISTE DE NIVEL!\n\n"
            +
            "Ahora eres nivel "
            +
            currentUser.level
            +
            "\n\n"
            +
            "💎 +50 monedas"

        );

    }

}


/* =========================================================
   DESBLOQUEAR NIVEL
========================================================= */

function unlockLevel(level) {

    if (!currentUser) {

        return;

    }


    if (
        !currentUser
            .unlockedLevels
            .includes(level)
    ) {

        currentUser
            .unlockedLevels
            .push(level);

    }


    if (
        !currentUser
            .levelProgress[level]
    ) {

        currentUser
            .levelProgress[level] = {

                progress: 0,

                stars: 0,

                completed: false

            };

    }

}


/* =========================================================
   MAPA
========================================================= */

function startAdventure() {

    if (!currentUser) {

        return;

    }


    renderLevels();


    document.getElementById(
        "mapLevel"
    ).textContent =
        currentUser.level;


    showScreen(
        "adventureScreen"
    );

}


/* =========================================================
   DIBUJAR NIVELES
========================================================= */

function renderLevels() {

    const map =
        document.getElementById(
            "levelsMap"
        );


    map.innerHTML = "";


    LEVELS.forEach(
        level => {

            const unlocked =
                currentUser
                    .unlockedLevels
                    .includes(
                        level.id
                    );


            const data =
                currentUser
                    .levelProgress[
                        level.id
                    ]
                ||
                {
                    progress: 0,

                    stars: 0,

                    completed: false

                };


            const card =
                document.createElement(
                    "div"
                );


            let className =
                "level-card ";


            if (unlocked) {

                className +=
                    "unlocked ";

            }

            else {

                className +=
                    "locked ";

            }


            if (
                data.completed
            ) {

                className +=
                    "completed";

            }


            card.className =
                className;


            card.innerHTML = `

                <div class="level-number">

                    ${level.id}

                </div>


                <div class="level-illustration">

                    ${levelIllustration(
                        level.illustration,
                        level.title
                    )}

                </div>


                <div class="level-information">

                    <h2>

                        ${level.title}

                    </h2>


                    <p>

                        ${level.description}

                    </p>


                    <div class="level-progress">

                        <div class="level-progress-bar">

                            <div
                                class="level-progress-fill"
                                style="
                                    width:
                                    ${data.progress}%
                                "
                            ></div>

                        </div>

                    </div>


                    <div class="level-stars">

                        ${getStars(
                            data.stars
                        )}

                    </div>

                </div>


                <div class="level-status">

                    ${
                        data.completed
                        ? "🏆"
                        : unlocked
                        ? "🔓"
                        : "🔒"
                    }

                </div>

            `;


            if (unlocked) {

                card.onclick =
                    function() {

                        openLevel(
                            level.id
                        );

                    };

            }

            else {

                card.onclick =
                    function() {

                        lockedLevel();

                    };

            }


            map.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   ESTRELLAS
========================================================= */

function getStars(stars) {

    let result = "";


    for (
        let i = 1;
        i <= 3;
        i++
    ) {

        if (
            i <= stars
        ) {

            result += "⭐";

        }

        else {

            result += "☆";

        }

    }


    return result;

}


/* =========================================================
   ABRIR NIVEL
========================================================= */

function openLevel(levelId) {

    const level =
        LEVELS.find(
            item =>
                item.id ===
                levelId
        );


    if (!level) {

        return;

    }


    selectedLevel =
        level;


    document.getElementById(
        "selectedLevelIcon"
    ).innerHTML =
        levelIllustration(
            level.illustration,
            level.title
        );


    document.getElementById(
        "selectedLevelTitle"
    ).textContent =
        level.title;


    document.getElementById(
        "selectedLevelDescription"
    ).textContent =
        level.description;


    showScreen(
        "levelIntroScreen"
    );

}


/* =========================================================
   COMENZAR NIVEL
========================================================= */

function startSelectedLevel() {

    if (!selectedLevel) {
        return;
    }


    switch (
        selectedLevel.id
    ) {

        case 1:

            startAlphabetGame();

            break;


        case 2:

            startNumberGame();

            break;


        case 3:

            startColorGame();

            break;


        case 4:

            startAnimalGame();

            break;

        case 5:

            startCategoryGame(
                FAMILY_DATA,
                "👨‍👩‍👧 Familia",
                5
            );

            break;

        case 6:

            startCategoryGame(
                FOOD_DATA,
                "🍎 Alimentos",
                6
            );

            break;

        case 7:

            startCategoryGame(
                SCHOOL_DATA,
                "🏫 Escuela",
                7
            );

            break;

        case 8:

            startCategoryGame(
                HOUSE_DATA,
                "🏠 Casa",
                8
            );

            break;

        case 9:

            startCategoryGame(
                ACTION_DATA,
                "🏃 Acciones",
                9
            );

            break;

        case 10:

            startPhraseGame();

            break;

        case 11:

            startCategoryGame(
                COMPREHENSION_DATA,
                "🧠 Comprensión",
                11
            );

            break;

        case 12:

            startCategoryGame(
                FINAL_CHALLENGE_DATA,
                "🚀 Maestro de Señas",
                12
            );

            break;

        default:

            alert(
                "🔒 Este nivel todavía está en construcción."
            );

    }

}


/* =========================================================
   NIVEL BLOQUEADO
========================================================= */

function lockedLevel() {

    alert(

        "🔒 NIVEL BLOQUEADO\n\n"
        +
        "Completa los niveles anteriores "
        +
        "para continuar."

    );

}


/* =========================================================
   COMPLETAR NIVEL
   ESTA FUNCIÓN SERÁ UTILIZADA
   EN LAS PRÓXIMAS ENTREGAS
========================================================= */

function completeLevel(
    levelId,
    stars
) {

    if (!currentUser) {

        return;

    }


    const level =
        LEVELS.find(
            item =>
                item.id ===
                levelId
        );


    if (!level) {

        return;

    }


    currentUser
        .levelProgress[levelId] = {

            progress: 100,

            stars:
                Math.max(
                    0,
                    Math.min(
                        3,
                        stars
                    )
                ),

            completed: true

        };


    if (
        !currentUser
            .unlockedLevels
            .includes(
                levelId + 1
            )
        &&
        levelId <
        LEVELS.length
    ) {

        currentUser
            .unlockedLevels
            .push(
                levelId + 1
            );

    }


    currentUser.score +=
        level.rewardScore;


    currentUser.xp +=
        level.rewardXP;


    currentUser.coins +=
        level.rewardCoins;

    currentUser.coinsEarned +=
        level.rewardCoins;


    currentUser.lessonsCompleted +=
        1;


    currentUser.progress =
        Math.min(
            100,
            currentUser.progress + 8
        );


    checkLevelUp();


    saveCurrentUser();


    loadPlayerData();


    alert(

        "🏆 ¡NIVEL COMPLETADO!\n\n"
        +
        getStars(stars)
        +
        "\n\n"
        +
        "⭐ +"
        +
        level.rewardScore
        +
        " puntos\n"
        +
        "⚡ +"
        +
        level.rewardXP
        +
        " XP\n"
        +
        "💎 +"
        +
        level.rewardCoins
        +
        " monedas"

    );


    startAdventure();

}


/* =========================================================
   PERFIL
========================================================= */

function openProfile() {

    if (!currentUser) {

        return;

    }


    loadProfile();
    updateProfileAdvancedStats();


    showScreen(
        "profileScreen"
    );

}


/* =========================================================
   CARGAR PERFIL
========================================================= */

function loadProfile() {

    if (!currentUser) {

        return;

    }


    document.getElementById(
        "profileAvatar"
    ).textContent =
        currentUser.avatar;

    const profileCard =
        document.getElementById(
            "profileCardDisplay"
        );

    profileCard.className =
        "profile-card-display";

    if (currentUser.equippedCard) {
        profileCard.classList.add(
            `profile-card-${currentUser.equippedCard}`
        );
    }

    if (currentUser.equippedFrame) {
        profileCard.classList.add(
            `profile-frame-${currentUser.equippedFrame}`
        );
    }

    const badge =
        document.getElementById(
            "profileBadgeDisplay"
        );

    const equippedBadge =
        getCosmetic(currentUser.equippedBadge);

    badge.hidden =
        !equippedBadge;

    badge.textContent =
        equippedBadge
        ? equippedBadge.icon
        : "";

    badge.title =
        equippedBadge
        ? equippedBadge.name
        : "";


    document.getElementById(
        "profileName"
    ).textContent =
        currentUser.username;


    document.getElementById(
        "profileLevel"
    ).textContent =
        currentUser.level;


    document.getElementById(
        "profileScore"
    ).textContent =
        currentUser.score;


    document.getElementById(
        "profileXP"
    ).textContent =
        currentUser.xp;


    document.getElementById(
        "profileCoins"
    ).textContent =
        currentUser.coins;


    document.getElementById(
        "profileStreak"
    ).textContent =
        currentUser.streak;


    document.getElementById(
        "profileLessons"
    ).textContent =
        currentUser.lessonsCompleted;


    document.getElementById(
        "profileGames"
    ).textContent =
        currentUser.gamesCompleted;


    updateAchievements();

}


/* =========================================================
   AVATAR
========================================================= */

function selectAvatar(avatar) {

    if (!currentUser) {

        return;

    }


    currentUser.avatar =
        avatar;


    saveCurrentUser();


    loadProfile();


    loadPlayerData();

}


/* =========================================================
   LOGROS
========================================================= */

function updateAchievements() {

    const container =
        document.getElementById(
            "achievements"
        );


    if (!container) {
        return;
    }

    container.replaceChildren();

    ACHIEVEMENT_DATA.forEach(achievement => {

        const unlocked =
            currentUser.achievements.includes(
                achievement.id
            );

        const card =
            document.createElement("article");

        card.className =
            unlocked
            ? "achievement"
            : "achievement locked";

        const icon =
            document.createElement("span");

        icon.className =
            "achievement-icon";

        icon.textContent =
            unlocked
            ? achievement.icon
            : "🔒";

        const details =
            document.createElement("span");

        details.textContent =
            `${achievement.title} · ${unlocked ? "Conseguido" : getAchievementProgress(achievement)}`;

        card.append(icon, details);
        container.appendChild(card);

    });

}


/* =========================================================
   MENSAJE
========================================================= */

function showLockedMessage(type) {

    if (type === "achievements") {
        showAchievements();
        return;
    }

    if (type === "shop") {
        openShop();
        return;
    }

    if (
        type === "videos"
    ) {

        openVideos();

        return;

    }


    if (
        type === "ranking"
    ) {

        showRanking();

        return;

    }


    alert(
        "🏆 Esta sección estará disponible pronto."
    );

}


/* =========================================================
   GUARDAR JUGADOR
========================================================= */

function saveCurrentUser() {

    if (!currentUser) {

        return;

    }


    const users =
        getUsers();


    const index =
        users.findIndex(
            user =>
                user.username
                ===
                currentUser.username
        );


    if (index !== -1) {

        users[index] =
            currentUser;


        saveUsers(
            users
        );

    }

}


/* =========================================================
   CERRAR SESIÓN
========================================================= */

function logout() {

    currentUser = null;


    localStorage.removeItem(
        "senasAventuraCurrentUser"
    );


    showScreen(
        "welcomeScreen"
    );

}


/* =========================================================
   RESTAURAR SESIÓN
========================================================= */

function restoreSession() {

    const username =
        localStorage.getItem(
            "senasAventuraCurrentUser"
        );


    if (!username) {

        return;

    }


    const users =
        getUsers();


    const user =
        users.find(
            item =>
                item.username
                ===
                username
        );


    if (!user) {

        return;

    }


    currentUser =
        normalizeUser(
            user
        );


    updateStreak();


    saveCurrentUser();


    loadPlayerData();


    showScreen(
        "homeScreen"
    );

}


/* =========================================================
   INICIO DE LA APLICACIÓN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        restoreSession();

    }
);
/* =========================================================
   ENTREGA 4
   JUEGO DEL ABECEDARIO
========================================================= */


/* =========================================================
   CONFIGURACIÓN DEL JUEGO
========================================================= */

const ALPHABET_GAME = {

    totalQuestions: 10,

    timePerQuestion: 30,

    pointsCorrect: 100,

    pointsIncorrect: 0,

    xpCorrect: 10,

    maxComboBonus: 50

};


/* =========================================================
   LETRAS
========================================================= */

const ALPHABET_LETTERS = [

    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "Ñ",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"

];


/* =========================================================
   VARIABLES
========================================================= */

let alphabetQuestions = [];

let alphabetQuestionIndex = 0;

let alphabetScore = 0;

let alphabetCorrect = 0;

let alphabetIncorrect = 0;

let alphabetCombo = 0;

let alphabetTimer = null;

let alphabetTimeLeft =
    ALPHABET_GAME.timePerQuestion;

let alphabetAnswered = false;


/* =========================================================
   CREAR PREGUNTAS
========================================================= */

function createAlphabetQuestions() {

    let letters = [
        ...ALPHABET_LETTERS
    ];


    /*
       Mezclamos las letras para
       que cada partida sea diferente.
    */

    letters =
        shuffleArray(
            letters
        );


    alphabetQuestions =
        letters.slice(
            0,
            ALPHABET_GAME.totalQuestions
        )
        .map(
            letter => {

                return {

                    answer: letter,

                    options:
                        createOptions(
                            letter
                        )

                };

            }
        );

}


/* =========================================================
   MEZCLAR ARRAY
========================================================= */

function shuffleArray(array) {

    const copy =
        [...array];


    for (
        let i =
            copy.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random()
                *
                (i + 1)
            );


        [
            copy[i],
            copy[j]
        ] =
        [
            copy[j],
            copy[i]
        ];

    }


    return copy;

}


/* =========================================================
   CREAR OPCIONES
========================================================= */

function createOptions(correctAnswer) {

    const options = [
        correctAnswer
    ];


    while (
        options.length < 4
    ) {

        const randomLetter =
            ALPHABET_LETTERS[
                Math.floor(
                    Math.random()
                    *
                    ALPHABET_LETTERS.length
                )
            ];


        if (
            !options.includes(
                randomLetter
            )
        ) {

            options.push(
                randomLetter
            );

        }

    }


    return shuffleArray(
        options
    );

}


/* =========================================================
   INICIAR JUEGO
========================================================= */

function startAlphabetGame() {

    if (!currentUser) {

        alert(
            "Debes iniciar sesión."
        );

        return;

    }


    alphabetQuestionIndex = 0;

    alphabetScore = 0;

    alphabetCorrect = 0;

    alphabetIncorrect = 0;

    alphabetCombo = 0;

    alphabetAnswered = false;


    createAlphabetQuestions();


    document.getElementById(
        "gameScore"
    ).textContent = "0";


    document.getElementById(
        "gameLives"
    ).textContent =
        currentUser.lives;


    document.getElementById(
        "gameCombo"
    ).textContent = "0";


    document.getElementById(
        "totalQuestions"
    ).textContent =
        ALPHABET_GAME.totalQuestions;


    showScreen(
        "alphabetGameScreen"
    );


    showAlphabetQuestion();

}


/* =========================================================
   MOSTRAR PREGUNTA
========================================================= */

function showAlphabetQuestion() {

    clearAlphabetTimer();


    alphabetAnswered = false;


    const question =
        alphabetQuestions[
            alphabetQuestionIndex
        ];


    if (!question) {

        finishAlphabetGame();

        return;

    }


    document.getElementById(
        "currentQuestion"
    ).textContent =
        alphabetQuestionIndex + 1;


    const percentage =
        (
            (
                alphabetQuestionIndex + 1
            )
            /
            ALPHABET_GAME.totalQuestions
        )
        *
        100;


    document.getElementById(
        "questionPercentage"
    ).textContent =
        Math.round(
            percentage
        )
        +
        "%";


    document.getElementById(
        "questionProgressFill"
    ).style.width =
        percentage
        +
        "%";


    document.getElementById(
        "answerMessage"
    ).textContent =
        "";


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "none";


    document.querySelector(
        "#alphabetGameScreen .question-icon"
    ).innerHTML =
        alphabetIllustration(
            question.answer
        );

    document.getElementById(
        "questionHint"
    ).textContent =
        "Observa la seña de la mano y elige la letra correcta.";

    document.getElementById(
        "alphabetImageCredit"
    ).hidden = false;

    const signImage =
        document.querySelector(
            "#alphabetGameScreen .question-art"
        );

    signImage.onerror = () => {
        document.getElementById(
            "questionHint"
        ).textContent =
            "No se pudo cargar la imagen de la seña. " +
            "Comprueba que la carpeta assets/senas/lse está junto al juego.";
    };


    const optionsContainer =
        document.getElementById(
            "alphabetOptions"
        );


    optionsContainer.innerHTML = "";


    question.options.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "alphabet-option";


            button.textContent =
                option;


            button.onclick =
                function() {

                    checkAlphabetAnswer(
                        option,
                        button
                    );

                };


            optionsContainer.appendChild(
                button
            );

        }
    );


    startAlphabetTimer();

}


/* =========================================================
   TEMPORIZADOR
========================================================= */

function startAlphabetTimer() {

    alphabetTimeLeft =
        ALPHABET_GAME.timePerQuestion;


    updateAlphabetTimer();


    alphabetTimer =
        setInterval(
            function() {

                alphabetTimeLeft--;


                updateAlphabetTimer();


                if (
                    alphabetTimeLeft <= 0
                ) {

                    clearAlphabetTimer();


                    if (
                        !alphabetAnswered
                    ) {

                        timeOutAlphabetQuestion();

                    }

                }

            },
            1000
        );

}


/* =========================================================
   ACTUALIZAR TIEMPO
========================================================= */

function updateAlphabetTimer() {

    const timer =
        document.getElementById(
            "gameTimer"
        );


    if (timer) {

        timer.textContent =
            alphabetTimeLeft;

    }

}


/* =========================================================
   DETENER TEMPORIZADOR
========================================================= */

function clearAlphabetTimer() {

    if (alphabetTimer) {

        clearInterval(
            alphabetTimer
        );

        alphabetTimer =
            null;

    }

}


/* =========================================================
   COMPROBAR RESPUESTA
========================================================= */

function checkAlphabetAnswer(
    selectedAnswer,
    clickedButton
) {

    if (
        alphabetAnswered
    ) {

        return;

    }


    alphabetAnswered = true;


    clearAlphabetTimer();


    const question =
        alphabetQuestions[
            alphabetQuestionIndex
        ];


    const buttons =
        document.querySelectorAll(
            ".alphabet-option"
        );


    buttons.forEach(
        button => {

            button.classList.add(
                "disabled"
            );

        }
    );


    if (
        selectedAnswer
        ===
        question.answer
    ) {

        handleCorrectAnswer(
            clickedButton
        );

    }

    else {

        handleIncorrectAnswer(
            clickedButton,
            question.answer
        );

    }


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "block";

}


/* =========================================================
   RESPUESTA CORRECTA
========================================================= */

function handleCorrectAnswer(
    button
) {

    button.classList.add(
        "correct"
    );


    alphabetCorrect++;


    alphabetCombo++;


    /*
       Puntos normales
    */

    let points =
        ALPHABET_GAME.pointsCorrect;


    /*
       Bonificación por combo
    */

    const comboBonus =
        Math.min(
            alphabetCombo * 10,
            ALPHABET_GAME.maxComboBonus
        );


    points +=
        comboBonus;


    alphabetScore +=
        points;


    document.getElementById(
        "gameScore"
    ).textContent =
        alphabetScore;


    document.getElementById(
        "gameCombo"
    ).textContent =
        alphabetCombo;


    const message =
        document.getElementById(
            "answerMessage"
        );


    message.textContent =
        "🎉 ¡Correcto! +"
        +
        points
        +
        " puntos";


    message.className =
        "answer-message answer-correct";


    /*
       Guardamos progreso
    */

    currentUser.totalCorrect++;


    /*
       XP temporal del juego.
       Se entrega definitivamente
       al terminar el nivel.
    */

}


/* =========================================================
   RESPUESTA INCORRECTA
========================================================= */

function handleIncorrectAnswer(
    button,
    correctAnswer
) {

    button.classList.add(
        "incorrect"
    );


    alphabetIncorrect++;


    alphabetCombo = 0;


    document.getElementById(
        "gameCombo"
    ).textContent =
        "0";


    /*
       Quitamos una vida
    */

    currentUser.lives =
        Math.max(
            0,
            currentUser.lives - 1
        );


    document.getElementById(
        "gameLives"
    ).textContent =
        currentUser.lives;


    /*
       Marcamos la respuesta correcta
    */

    const buttons =
        document.querySelectorAll(
            ".alphabet-option"
        );


    buttons.forEach(
        item => {

            if (
                item.textContent
                ===
                correctAnswer
            ) {

                item.classList.add(
                    "correct"
                );

            }

        }
    );


    const message =
        document.getElementById(
            "answerMessage"
        );


    message.textContent =
        "❌ Incorrecto. La respuesta era "
        +
        correctAnswer;


    message.className =
        "answer-message answer-incorrect";


    currentUser.totalIncorrect++;


    /*
       Si se queda sin vidas,
       terminamos la partida.
    */

    if (
        currentUser.lives <= 0
    ) {

        setTimeout(
            function() {

                finishAlphabetGame(
                    true
                );

            },
            1000
        );

    }

}


/* =========================================================
   TIEMPO AGOTADO
========================================================= */

function timeOutAlphabetQuestion() {

    if (
        alphabetAnswered
    ) {

        return;

    }


    alphabetAnswered = true;


    alphabetIncorrect++;


    alphabetCombo = 0;


    currentUser.lives =
        Math.max(
            0,
            currentUser.lives - 1
        );


    document.getElementById(
        "gameLives"
    ).textContent =
        currentUser.lives;


    const question =
        alphabetQuestions[
            alphabetQuestionIndex
        ];


    const buttons =
        document.querySelectorAll(
            ".alphabet-option"
        );


    buttons.forEach(
        button => {

            button.classList.add(
                "disabled"
            );


            if (
                button.textContent
                ===
                question.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    const message =
        document.getElementById(
            "answerMessage"
        );


    message.textContent =
        "⏰ ¡Se acabó el tiempo! " +
        "La respuesta era " +
        question.answer;


    message.className =
        "answer-message answer-incorrect";


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "block";


    currentUser.totalIncorrect++;


    if (
        currentUser.lives <= 0
    ) {

        setTimeout(
            function() {

                finishAlphabetGame(
                    true
                );

            },
            1000
        );

    }

}


/* =========================================================
   SIGUIENTE PREGUNTA
========================================================= */

function nextAlphabetQuestion() {

    if (
        currentUser.lives <= 0
    ) {

        finishAlphabetGame(
            true
        );

        return;

    }


    alphabetQuestionIndex++;


    if (
        alphabetQuestionIndex
        >=
        ALPHABET_GAME.totalQuestions
    ) {

        finishAlphabetGame();

        return;

    }


    showAlphabetQuestion();

}


/* =========================================================
   FINALIZAR JUEGO
========================================================= */

function finishAlphabetGame(
    failed = false
) {

    clearAlphabetTimer();


    /*
       Calculamos estrellas
    */

    let stars = 0;


    if (!failed) {

        if (
            alphabetCorrect >= 9
        ) {

            stars = 3;

        }

        else if (
            alphabetCorrect >= 7
        ) {

            stars = 2;

        }

        else if (
            alphabetCorrect >= 5
        ) {

            stars = 1;

        }

    }


    /*
       XP según desempeño
    */

    const earnedXP =
        alphabetCorrect
        *
        ALPHABET_GAME.xpCorrect;


    /*
       Guardamos el resultado
    */

    if (currentUser) {

        currentUser.score +=
            alphabetScore;


        currentUser.xp +=
            earnedXP;


        currentUser.gamesCompleted++;

        currentUser.bestCorrect =
            Math.max(
                currentUser.bestCorrect,
                alphabetCorrect
            );


        /*
           Si consiguió al menos
           5 respuestas correctas,
           consideramos completado
           el nivel.
        */

        if (
            alphabetCorrect >= 5
        ) {

            if (
                !currentUser
                    .levelProgress[1]
            ) {

                currentUser
                    .levelProgress[1] = {

                        progress: 100,

                        stars: stars,

                        completed: true

                    };

            }

            else {

                currentUser
                    .levelProgress[1]
                    .progress = 100;


                currentUser
                    .levelProgress[1]
                    .stars =
                    Math.max(
                        currentUser
                            .levelProgress[1]
                            .stars || 0,
                        stars
                    );


                currentUser
                    .levelProgress[1]
                    .completed = true;

            }


            /*
               Desbloqueamos nivel 2
            */

            unlockLevel(2);


            /*
               Aumentamos progreso general
            */

            currentUser.progress =
                Math.min(
                    100,
                    currentUser.progress + 8
                );

        }


        checkLevelUp();


        saveCurrentUser();

    }


    /*
       Mostrar resultados
    */

    document.getElementById(
        "finalScore"
    ).textContent =
        alphabetScore;


    document.getElementById(
        "finalCorrect"
    ).textContent =
        alphabetCorrect;


    document.getElementById(
        "finalIncorrect"
    ).textContent =
        alphabetIncorrect;


    document.getElementById(
        "finalXP"
    ).textContent =
        earnedXP;


    document.getElementById(
        "resultStars"
    ).textContent =
        getStars(stars);


    const resultMessage =
        document.getElementById(
            "resultMessage"
        );


    const resultIcon =
        document.getElementById(
            "resultIcon"
        );


    if (
        alphabetCorrect >= 9
    ) {

        resultIcon.textContent =
            "🏆";


        resultMessage.textContent =
            "¡Excelente! Dominas muy bien el abecedario.";

    }

    else if (
        alphabetCorrect >= 7
    ) {

        resultIcon.textContent =
            "🎉";


        resultMessage.textContent =
            "¡Muy bien! Sigue practicando para conseguir 3 estrellas.";

    }

    else if (
        alphabetCorrect >= 5
    ) {

        resultIcon.textContent =
            "👏";


        resultMessage.textContent =
            "¡Buen trabajo! Has desbloqueado el siguiente nivel.";

    }

    else {

        resultIcon.textContent =
            "💪";


        resultMessage.textContent =
            "Necesitas practicar un poco más. ¡No te rindas!";

    }


    showScreen(
        "alphabetResultScreen"
    );

}


/* =========================================================
   SALIR DEL JUEGO
========================================================= */

function exitAlphabetGame() {

    clearAlphabetTimer();


    const confirmExit =
        confirm(
            "¿Quieres salir de esta partida?"
        );


    if (!confirmExit) {

        return;

    }


    startAdventure();

}
/* =========================================================
   ENTREGA 5
   SISTEMA DE SEÑAS
========================================================= */

const SIGN_DATA = {

    A: {
        word: "Letra A",
        image: "assets/senas/A.png"
    },

    B: {
        word: "Letra B",
        image: "assets/senas/B.png"
    },

    C: {
        word: "Letra C",
        image: "assets/senas/C.png"
    },

    D: {
        word: "Letra D",
        image: "assets/senas/D.png"
    },

    E: {
        word: "Letra E",
        image: "assets/senas/E.png"
    },

    F: {
        word: "Letra F",
        image: "assets/senas/F.png"
    },

    G: {
        word: "Letra G",
        image: "assets/senas/G.png"
    },

    H: {
        word: "Letra H",
        image: "assets/senas/H.png"
    }

};


function showSign(letter) {

    const sign =
        SIGN_DATA[letter];

    if (!sign) {

        return;

    }


    const container =
        document.getElementById(
            "signImageContainer"
        );


    container.innerHTML = `

        <img
            src="${sign.image}"
            alt="Seña ${letter}"
            onerror="
                this.style.display='none';
                this.parentElement.innerHTML='🤟';
            "
        >

    `;


    document.getElementById(
        "signLetter"
    ).textContent =
        letter;


    document.getElementById(
        "signWord"
    ).textContent =
        sign.word;


    showScreen(
        "signLearningScreen"
    );

}
/* =========================================================
   ENTREGA 6
   JUEGO DE NÚMEROS
========================================================= */

const NUMBER_DATA = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
];


let numberIndex = 0;

let numberScore = 0;

let numberCorrect = 0;

let numberQuestions = [];


function startNumberGame() {

    numberIndex = 0;

    numberScore = 0;

    numberCorrect = 0;


    numberQuestions =
        shuffleArray(
            NUMBER_DATA
        );


    document.getElementById(
        "numbersScore"
    ).textContent = "0";


    showScreen(
        "numbersGameScreen"
    );


    showNumberQuestion();

}


function showNumberQuestion() {

    if (
        numberIndex >= 10
    ) {

        finishNumberGame();

        return;

    }


    const answer =
        numberQuestions[
            numberIndex
        ];


    document.getElementById(
        "numbersQuestion"
    ).textContent =
        numberIndex + 1;


    document.getElementById(
        "numbersPercent"
    ).textContent =
        ((numberIndex + 1) * 10)
        +
        "%";


    document.getElementById(
        "numbersProgress"
    ).style.width =
        ((numberIndex + 1) * 10)
        +
        "%";


    document.getElementById(
        "numberQuestionIcon"
    ).innerHTML =
        numberIllustration(answer);


    const options =
        document.getElementById(
            "numbersOptions"
        );


    options.innerHTML = "";


    let answers = [
        answer
    ];


    while (
        answers.length < 4
    ) {

        const random =
            NUMBER_DATA[
                Math.floor(
                    Math.random()
                    *
                    NUMBER_DATA.length
                )
            ];


        if (
            !answers.includes(
                random
            )
        ) {

            answers.push(
                random
            );

        }

    }


    answers =
        shuffleArray(
            answers
        );


    answers.forEach(
        option => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "alphabet-option";


            button.textContent =
                option;


            button.onclick =
                () => {

                    checkNumberAnswer(
                        option,
                        answer,
                        button
                    );

                };


            options.appendChild(
                button
            );

        }
    );

}


function checkNumberAnswer(
    selected,
    correct,
    button
) {

    const buttons =
        document.querySelectorAll(
            "#numbersOptions button"
        );


    buttons.forEach(
        b => {

            b.disabled = true;

        }
    );


    if (
        selected === correct
    ) {

        button.classList.add(
            "correct"
        );


        numberCorrect++;


        numberScore += 100;


        document.getElementById(
            "numbersScore"
        ).textContent =
            numberScore;


        document.getElementById(
            "numbersMessage"
        ).textContent =
            "🎉 ¡Correcto!";


        document.getElementById(
            "numbersMessage"
        ).className =
            "answer-message answer-correct";

    }

    else {

        button.classList.add(
            "incorrect"
        );


        document.getElementById(
            "numbersMessage"
        ).textContent =
            "❌ La respuesta correcta era "
            +
            correct;


        document.getElementById(
            "numbersMessage"
        ).className =
            "answer-message answer-incorrect";

    }


    document.getElementById(
        "numbersNext"
    ).style.display =
        "block";

}


function nextNumberQuestion() {

    numberIndex++;

    document.getElementById(
        "numbersNext"
    ).style.display =
        "none";


    document.getElementById(
        "numbersMessage"
    ).textContent =
        "";


    showNumberQuestion();

}


function finishNumberGame() {

    currentUser.score +=
        numberScore;


    currentUser.xp +=
        numberCorrect * 10;


    currentUser.gamesCompleted++;

    currentUser.bestCorrect =
        Math.max(
            currentUser.bestCorrect,
            numberCorrect
        );


    currentUser.levelProgress[2] = {

        progress: 100,

        stars:
            numberCorrect >= 9
            ? 3
            : numberCorrect >= 7
            ? 2
            : numberCorrect >= 5
            ? 1
            : 0,

        completed:
            numberCorrect >= 5

    };


    if (
        numberCorrect >= 5
    ) {

        unlockLevel(3);

    }


    saveCurrentUser();

    loadPlayerData();


    alert(

        "🔢 NIVEL DE NÚMEROS TERMINADO\n\n"
        +
        "⭐ "
        +
        numberScore
        +
        " puntos\n"
        +
        "✅ "
        +
        numberCorrect
        +
        " correctas"

    );


    startAdventure();

}
/* =========================================================
   ENTREGA 7
   JUEGO DE COLORES
========================================================= */

const COLOR_DATA = [

    {
        name: "ROJO",
        emoji: "🔴",
        color: "#ef4444"
    },

    {
        name: "AZUL",
        emoji: "🔵",
        color: "#3b82f6"
    },

    {
        name: "VERDE",
        emoji: "🟢",
        color: "#22c55e"
    },

    {
        name: "AMARILLO",
        emoji: "🟡",
        color: "#facc15"
    },

    {
        name: "NARANJA",
        emoji: "🟠",
        color: "#f97316"
    },

    {
        name: "MORADO",
        emoji: "🟣",
        color: "#a855f7"
    },

    {
        name: "NEGRO",
        emoji: "⚫",
        color: "#1e293b"
    },

    {
        name: "BLANCO",
        emoji: "⚪",
        color: "#ffffff"
    }

];


let colorIndex = 0;

let colorScore = 0;

let colorCorrect = 0;

let colorQuestions = [];


function startColorGame() {

    hideAlphabetImageCredit();

    colorIndex = 0;

    colorScore = 0;

    colorCorrect = 0;


    colorQuestions =
        shuffleArray(
            COLOR_DATA
        );


    showScreen(
        "alphabetGameScreen"
    );


    document.querySelector(
        "#alphabetGameScreen .game-title"
    ).textContent =
        "🎨 Colores";


    document.querySelector(
        "#alphabetGameScreen .question-card h1"
    ).textContent =
        "¿Qué color es?";


    showColorQuestion();

}


function showColorQuestion() {

    if (
        colorIndex >= 8
    ) {

        finishColorGame();

        return;

    }


    const correct =
        colorQuestions[
            colorIndex
        ];


    document.getElementById(
        "currentQuestion"
    ).textContent =
        colorIndex + 1;


    document.getElementById(
        "totalQuestions"
    ).textContent =
        "8";


    document.getElementById(
        "gameScore"
    ).textContent =
        colorScore;


    document.querySelector(
        "#alphabetGameScreen .question-icon"
    ).innerHTML =
        colorIllustration(correct);


    const options =
        document.getElementById(
            "alphabetOptions"
        );


    options.innerHTML = "";


    let answers = [
        correct.name
    ];


    while (
        answers.length < 4
    ) {

        const random =
            COLOR_DATA[
                Math.floor(
                    Math.random()
                    *
                    COLOR_DATA.length
                )
            ].name;


        if (
            !answers.includes(
                random
            )
        ) {

            answers.push(
                random
            );

        }

    }


    answers =
        shuffleArray(
            answers
        );


    answers.forEach(
        answer => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "alphabet-option";


            button.textContent =
                answer;


            button.onclick =
                () => {

                    colorAnswer(
                        answer,
                        correct.name,
                        button
                    );

                };


            options.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "none";

}


function colorAnswer(
    selected,
    correct,
    button
) {

    const buttons =
        document.querySelectorAll(
            "#alphabetOptions button"
        );


    buttons.forEach(
        b => {

            b.disabled = true;

        }
    );


    if (
        selected === correct
    ) {

        button.classList.add(
            "correct"
        );


        colorCorrect++;


        colorScore += 100;


        document.getElementById(
            "answerMessage"
        ).textContent =
            "🎉 ¡Correcto!";


        document.getElementById(
            "answerMessage"
        ).className =
            "answer-message answer-correct";

    }

    else {

        button.classList.add(
            "incorrect"
        );


        document.getElementById(
            "answerMessage"
        ).textContent =
            "❌ Era "
            +
            correct;


        document.getElementById(
            "answerMessage"
        ).className =
            "answer-message answer-incorrect";

    }


    document.getElementById(
        "gameScore"
    ).textContent =
        colorScore;


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "block";


    document.getElementById(
        "nextQuestionButton"
    ).onclick =
        function() {

            colorIndex++;

            showColorQuestion();

        };

}


function finishColorGame() {

    currentUser.score +=
        colorScore;


    currentUser.xp +=
        colorCorrect * 10;


    currentUser.gamesCompleted++;

    currentUser.bestCorrect =
        Math.max(
            currentUser.bestCorrect,
            colorCorrect
        );


    const stars =
        colorCorrect >= 7
        ? 3
        : colorCorrect >= 5
        ? 2
        : colorCorrect >= 4
        ? 1
        : 0;


    currentUser.levelProgress[3] = {

        progress: 100,

        stars: stars,

        completed:
            colorCorrect >= 4

    };


    if (
        colorCorrect >= 4
    ) {

        unlockLevel(4);

    }


    saveCurrentUser();

    loadPlayerData();


    alert(

        "🎨 COLORES COMPLETADO\n\n"
        +
        getStars(stars)
        +
        "\n"
        +
        "⭐ "
        +
        colorScore
        +
        " puntos"

    );


    startAdventure();

}
/* =========================================================
   ENTREGA 8
   JUEGO DE ANIMALES
========================================================= */

const ANIMAL_DATA = [

    {
        name: "PERRO",
        emoji: "🐶"
    },

    {
        name: "GATO",
        emoji: "🐱"
    },

    {
        name: "LEÓN",
        emoji: "🦁"
    },

    {
        name: "ELEFANTE",
        emoji: "🐘"
    },

    {
        name: "MONO",
        emoji: "🐵"
    },

    {
        name: "CABALLO",
        emoji: "🐴"
    },

    {
        name: "VACA",
        emoji: "🐮"
    },

    {
        name: "PEZ",
        emoji: "🐟"
    }

];


let animalIndex = 0;

let animalScore = 0;

let animalCorrect = 0;


function startAnimalGame() {

    hideAlphabetImageCredit();

    animalIndex = 0;

    animalScore = 0;

    animalCorrect = 0;


    showScreen(
        "alphabetGameScreen"
    );


    document.querySelector(
        "#alphabetGameScreen .game-title"
    ).textContent =
        "🐶 Animales";


    document.querySelector(
        "#alphabetGameScreen .question-card h1"
    ).textContent =
        "¿Qué animal es?";


    showAnimalQuestion();

}


function showAnimalQuestion() {

    if (
        animalIndex >=
        ANIMAL_DATA.length
    ) {

        finishAnimalGame();

        return;

    }


    const correct =
        ANIMAL_DATA[
            animalIndex
        ];


    document.getElementById(
        "currentQuestion"
    ).textContent =
        animalIndex + 1;


    document.getElementById(
        "totalQuestions"
    ).textContent =
        ANIMAL_DATA.length;


    document.querySelector(
        ".question-icon"
    ).textContent =
        correct.emoji;


    document.getElementById(
        "gameScore"
    ).textContent =
        animalScore;


    const options =
        document.getElementById(
            "alphabetOptions"
        );


    options.innerHTML = "";


    let answers = [
        correct.name
    ];


    while (
        answers.length < 4
    ) {

        const random =
            ANIMAL_DATA[
                Math.floor(
                    Math.random()
                    *
                    ANIMAL_DATA.length
                )
            ].name;


        if (
            !answers.includes(
                random
            )
        ) {

            answers.push(
                random
            );

        }

    }


    answers =
        shuffleArray(
            answers
        );


    answers.forEach(
        answer => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "alphabet-option";


            button.textContent =
                answer;


            button.onclick =
                () => {

                    animalAnswer(
                        answer,
                        correct.name,
                        button
                    );

                };


            options.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "none";

}


function animalAnswer(
    selected,
    correct,
    button
) {

    const buttons =
        document.querySelectorAll(
            "#alphabetOptions button"
        );


    buttons.forEach(
        b => {

            b.disabled = true;

        }
    );


    if (
        selected === correct
    ) {

        button.classList.add(
            "correct"
        );


        animalCorrect++;


        animalScore += 100;


        document.getElementById(
            "answerMessage"
        ).textContent =
            "🎉 ¡Correcto!";


        document.getElementById(
            "answerMessage"
        ).className =
            "answer-message answer-correct";

    }

    else {

        button.classList.add(
            "incorrect"
        );


        document.getElementById(
            "answerMessage"
        ).textContent =
            "❌ Era "
            +
            correct;


        document.getElementById(
            "answerMessage"
        ).className =
            "answer-message answer-incorrect";

    }


    document.getElementById(
        "gameScore"
    ).textContent =
        animalScore;


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "block";


    document.getElementById(
        "nextQuestionButton"
    ).onclick =
        function() {

            animalIndex++;

            showAnimalQuestion();

        };

}


function finishAnimalGame() {

    currentUser.score +=
        animalScore;


    currentUser.xp +=
        animalCorrect * 12;


    currentUser.gamesCompleted++;

    currentUser.bestCorrect =
        Math.max(
            currentUser.bestCorrect,
            animalCorrect
        );


    const stars =
        animalCorrect >= 7
        ? 3
        : animalCorrect >= 5
        ? 2
        : animalCorrect >= 4
        ? 1
        : 0;


    currentUser.levelProgress[4] = {

        progress: 100,

        stars: stars,

        completed:
            animalCorrect >= 4

    };


    if (
        animalCorrect >= 4
    ) {

        unlockLevel(5);

    }


    saveCurrentUser();

    loadPlayerData();


    alert(

        "🐶 ANIMALES COMPLETADO\n\n"
        +
        getStars(stars)
        +
        "\n"
        +
        "⭐ "
        +
        animalScore
        +
        " puntos"

    );


    startAdventure();

}
/* =========================================================
   ENTREGA 9
   JUEGO DE FRASES
========================================================= */

const PHRASE_DATA = [

    {
        phrase: "YO ___ AGUA",

        answer: "QUIERO",

        options: [
            "QUIERO",
            "PERRO",
            "ROJO",
            "CINCO"
        ]

    },

    {
        phrase: "MI ___ ES GRANDE",

        answer: "CASA",

        options: [
            "CASA",
            "AZUL",
            "GATO",
            "TRES"
        ]

    },

    {
        phrase: "EL ___ LADRA",

        answer: "PERRO",

        options: [
            "PERRO",
            "AGUA",
            "VERDE",
            "SIETE"
        ]

    },

    {
        phrase: "YO TENGO ___ AÑOS",

        answer: "DIEZ",

        options: [
            "DIEZ",
            "GATO",
            "CASA",
            "ROJO"
        ]

    },

    {
        phrase: "MI ___ ES AZUL",

        answer: "CAMISA",

        options: [
            "CAMISA",
            "PERRO",
            "CINCO",
            "LEÓN"
        ]

    },

    {
        phrase: "QUIERO COMER ___",

        answer: "PAN",

        options: [
            "PAN",
            "PERRO",
            "AZUL",
            "OCHO"
        ]

    },

    {
        phrase: "EL ___ ES AMARILLO",

        answer: "SOL",

        options: [
            "SOL",
            "GATO",
            "CASA",
            "TRES"
        ]

    },

    {
        phrase: "ME GUSTA EL ___",

        answer: "FÚTBOL",

        options: [
            "FÚTBOL",
            "PERRO",
            "VERDE",
            "NUEVE"
        ]

    }

];


let phraseIndex = 0;

let phraseScore = 0;

let phraseCorrect = 0;


function startPhraseGame() {

    hideAlphabetImageCredit();

    phraseIndex = 0;

    phraseScore = 0;

    phraseCorrect = 0;


    showScreen(
        "alphabetGameScreen"
    );


    document.querySelector(
        "#alphabetGameScreen .game-title"
    ).textContent =
        "💬 Frases";


    document.querySelector(
        "#alphabetGameScreen .question-card h1"
    ).textContent =
        "Completa la frase";


    showPhraseQuestion();

}


function showPhraseQuestion() {

    if (
        phraseIndex >=
        PHRASE_DATA.length
    ) {

        finishPhraseGame();

        return;

    }


    const question =
        PHRASE_DATA[
            phraseIndex
        ];


    document.getElementById(
        "currentQuestion"
    ).textContent =
        phraseIndex + 1;


    document.getElementById(
        "totalQuestions"
    ).textContent =
        PHRASE_DATA.length;


    document.querySelector(
        ".question-icon"
    ).textContent =
        "💬";


    document.querySelector(
        "#alphabetGameScreen .question-card h1"
    ).textContent =
        question.phrase;


    document.getElementById(
        "gameScore"
    ).textContent =
        phraseScore;


    const options =
        document.getElementById(
            "alphabetOptions"
        );


    options.innerHTML = "";


    question.options.forEach(
        answer => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "alphabet-option";


            button.textContent =
                answer;


            button.onclick =
                () => {

                    phraseAnswer(
                        answer,
                        question.answer,
                        button
                    );

                };


            options.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "none";

}


function phraseAnswer(
    selected,
    correct,
    button
) {

    const buttons =
        document.querySelectorAll(
            "#alphabetOptions button"
        );


    buttons.forEach(
        b => {

            b.disabled = true;

        }
    );


    if (
        selected === correct
    ) {

        button.classList.add(
            "correct"
        );


        phraseCorrect++;


        phraseScore += 150;


        document.getElementById(
            "answerMessage"
        ).textContent =
            "🎉 ¡Excelente!";


        document.getElementById(
            "answerMessage"
        ).className =
            "answer-message answer-correct";

    }

    else {

        button.classList.add(
            "incorrect"
        );


        document.getElementById(
            "answerMessage"
        ).textContent =
            "❌ La respuesta era "
            +
            correct;


        document.getElementById(
            "answerMessage"
        ).className =
            "answer-message answer-incorrect";

    }


    document.getElementById(
        "gameScore"
    ).textContent =
        phraseScore;


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "block";


    document.getElementById(
        "nextQuestionButton"
    ).onclick =
        function() {

            phraseIndex++;

            showPhraseQuestion();

        };

}


function finishPhraseGame() {

    currentUser.score +=
        phraseScore;


    currentUser.xp +=
        phraseCorrect * 15;


    currentUser.gamesCompleted++;

    currentUser.bestCorrect =
        Math.max(
            currentUser.bestCorrect,
            phraseCorrect
        );


    const stars =
        phraseCorrect >= 7
        ? 3
        : phraseCorrect >= 5
        ? 2
        : phraseCorrect >= 4
        ? 1
        : 0;


    currentUser.levelProgress[10] = {

        progress: 100,

        stars: stars,

        completed:
            phraseCorrect >= 4

    };

    if (phraseCorrect >= 4) {
        unlockLevel(11);
    }


    saveCurrentUser();

    loadPlayerData();


    alert(

        "💬 FRASES COMPLETADO\n\n"
        +
        getStars(stars)
        +
        "\n\n"
        +
        "⭐ "
        +
        phraseScore
        +
        " puntos"

    );


    startAdventure();

}
/* =========================================================
   ENTREGA 10
   LOGROS
========================================================= */

const ACHIEVEMENT_DATA = [

    {
        id: "first_game",
        icon: "🎮",
        title: "Primer juego",
        description: "Completa tu primera actividad.",
        metric: "gamesCompleted",
        target: 1
    },
    {
        id: "five_games",
        icon: "🎯",
        title: "Jugador dedicado",
        description: "Completa 5 actividades.",
        metric: "gamesCompleted",
        target: 5
    },
    {
        id: "five_hundred",
        icon: "⭐",
        title: "Primeras estrellas",
        description: "Consigue 500 puntos.",
        metric: "score",
        target: 500
    },
    {
        id: "thousand",
        icon: "🏆",
        title: "Gran aprendiz",
        description: "Consigue 1.000 puntos.",
        metric: "score",
        target: 1000
    },
    {
        id: "seven_days",
        icon: "🔥",
        title: "Racha de fuego",
        description: "Aprende durante 7 días consecutivos.",
        metric: "streak",
        target: 7
    },
    {
        id: "five_lessons",
        icon: "📚",
        title: "Estudiante",
        description: "Completa 5 lecciones.",
        metric: "lessonsCompleted",
        target: 5
    },
    {
        id: "level_five",
        icon: "🚀",
        title: "Explorador",
        description: "Alcanza el nivel 5.",
        metric: "level",
        target: 5
    },
    {
        id: "master",
        icon: "👑",
        title: "Maestro de Señas",
        description: "Consigue 5.000 puntos.",
        metric: "score",
        target: 5000
    },
    {
        id: "perfect_game",
        icon: "💯",
        title: "¡Impecable!",
        description: "Responde correctamente 10 preguntas en una actividad.",
        metric: "bestCorrect",
        target: 10
    },
    {
        id: "three_levels",
        icon: "🗺️",
        title: "Gran explorador",
        description: "Completa 3 niveles del mapa.",
        metric: "completedLevels",
        target: 3
    },
    {
        id: "ten_levels",
        icon: "🌟",
        title: "Camino de estrellas",
        description: "Completa 10 niveles del mapa.",
        metric: "completedLevels",
        target: 10
    },
    {
        id: "accuracy_80",
        icon: "🎯",
        title: "Buena puntería",
        description: "Alcanza al menos 80% de respuestas correctas.",
        metric: "accuracy",
        target: 80
    },
    {
        id: "coin_saver",
        icon: "💎",
        title: "Ahorrista de gemas",
        description: "Reúne 100 gemas.",
        metric: "coinsEarned",
        target: 100
    }

];

function getAchievementValue(achievement) {

    if (!currentUser) {
        return 0;
    }

    if (achievement.metric === "completedLevels") {
        return Object.values(
            currentUser.levelProgress
        ).filter(progress =>
            progress && progress.completed
        ).length;
    }

    if (achievement.metric === "accuracy") {
        const total =
            currentUser.totalCorrect +
            currentUser.totalIncorrect;

        return total === 0
            ? 0
            : Math.round(
                (currentUser.totalCorrect / total) * 100
            );
    }

    if (achievement.metric === "bestCorrect") {
        return Number(currentUser.bestCorrect) || 0;
    }

    if (achievement.metric === "coinsEarned") {
        return Number(currentUser.coinsEarned) || 0;
    }

    return Number(currentUser[achievement.metric]) || 0;

}

function getAchievementProgress(achievement) {

    const value =
        getAchievementValue(achievement);

    return `${Math.min(value, achievement.target)}/${achievement.target}`;

}


/* =========================================================
   COMPROBAR LOGROS
========================================================= */

function checkAchievements(showNotifications = true) {

    if (!currentUser) {

        return;

    }


    ACHIEVEMENT_DATA.forEach(
        achievement => {

            const already =
                currentUser
                    .achievements
                    .includes(
                        achievement.id
                    );


            const unlocked =
                getAchievementValue(achievement) >=
                achievement.target;


            if (
                unlocked &&
                !already
            ) {

                currentUser
                    .achievements
                    .push(
                        achievement.id
                    );


                currentUser.coins +=
                    25;

                currentUser.coinsEarned +=
                    25;


                if (showNotifications) {
                    showAchievementNotification(
                        achievement
                    );
                }

            }

        }
    );


    saveCurrentUser();

}


/* =========================================================
   NOTIFICACIÓN
========================================================= */

function showAchievementNotification(
    achievement
) {

    alert(

        "🏆 ¡NUEVO LOGRO!\n\n"
        +
        achievement.icon
        +
        " "
        +
        achievement.title
        +
        "\n\n"
        +
        achievement.description
        +
        "\n\n"
        +
        "💎 +25 gemas"

    );

}


const COSMETIC_DATA = [
    { id: "frame_sky", type: "frame", name: "Marco cielo", description: "Un borde azul para tu perfil.", cost: 50, preview: "🌤️" },
    { id: "frame_sunset", type: "frame", name: "Marco atardecer", description: "Colores cálidos para destacar.", cost: 90, preview: "🌅" },
    { id: "frame_garden", type: "frame", name: "Marco jardín", description: "Un marco lleno de color.", cost: 140, preview: "🌷" },
    { id: "card_ocean", type: "card", name: "Carta océano", description: "Un fondo azul para tu tarjeta.", cost: 80, preview: "🌊" },
    { id: "card_candy", type: "card", name: "Carta dulce", description: "Un fondo alegre y divertido.", cost: 120, preview: "🍬" },
    { id: "card_galaxy", type: "card", name: "Carta galaxia", description: "Brilla como una estrella.", cost: 180, preview: "🌌" },
    { id: "badge_star", type: "badge", name: "Insignia estrella", description: "Muestra que sigues aprendiendo.", cost: 60, icon: "⭐" },
    { id: "badge_rainbow", type: "badge", name: "Insignia arcoíris", description: "Un toque de muchos colores.", cost: 100, icon: "🌈" },
    { id: "badge_champion", type: "badge", name: "Insignia campeón", description: "Para celebrar tu esfuerzo.", cost: 160, icon: "🏆" }
];

let shopReturnScreen = "homeScreen";

function getCosmetic(id) {
    return COSMETIC_DATA.find(item => item.id === id) || null;
}

function showAchievements() {
    if (!currentUser) {
        return;
    }

    checkAchievements(false);

    const list = document.getElementById("achievementsList");
    const summary = document.getElementById("achievementSummary");
    if (!list || !summary) {
        return;
    }

    const unlockedCount = ACHIEVEMENT_DATA.filter(item =>
        currentUser.achievements.includes(item.id)
    ).length;

    summary.textContent =
        `${unlockedCount} de ${ACHIEVEMENT_DATA.length} logros · Cada logro conseguido da 25 gemas.`;

    list.replaceChildren();

    ACHIEVEMENT_DATA.forEach(item => {
        const unlocked = currentUser.achievements.includes(item.id);
        const value = Math.min(getAchievementValue(item), item.target);
        const card = document.createElement("article");
        card.className = `achievement-card${unlocked ? " achievement-unlocked" : " achievement-locked"}`;

        const icon = document.createElement("span");
        icon.className = "achievement-icon";
        icon.textContent = item.icon;

        const details = document.createElement("div");
        details.className = "achievement-details";

        const title = document.createElement("strong");
        title.textContent = item.title;
        const description = document.createElement("p");
        description.textContent = item.description;

        const progress = document.createElement("div");
        progress.className = "achievement-progress";
        const progressBar = document.createElement("span");
        progressBar.style.width = `${item.target ? Math.min(100, value / item.target * 100) : 100}%`;
        progress.appendChild(progressBar);

        const status = document.createElement("small");
        status.textContent = unlocked
            ? "✅ Conseguido · 💎 +25"
            : `${value}/${item.target} · Recompensa: 💎 25`;

        details.append(title, description, progress, status);
        card.append(icon, details);
        list.appendChild(card);
    });

    showScreen("achievementsScreen");
}

function openShop() {
    if (!currentUser) {
        return;
    }

    const activeScreen = document.querySelector(".screen.active");
    shopReturnScreen = activeScreen?.id || "homeScreen";
    renderShop();
    showScreen("shopScreen");
}

function closeShop() {
    showScreen(shopReturnScreen);
}

function renderShop(message = "") {
    if (!currentUser) {
        return;
    }

    const balance = document.getElementById("shopCoins");
    const container = document.getElementById("shopItems");
    if (!balance || !container) {
        return;
    }

    balance.textContent = String(currentUser.coins);
    container.replaceChildren();

    const status = document.createElement("p");
    status.className = "shop-status";
    status.setAttribute("role", "status");
    status.textContent = message;
    container.appendChild(status);

    const groups = [
        ["frame", "🖼️ Marcos de perfil"],
        ["card", "🎨 Cartas de perfil"],
        ["badge", "🏅 Insignias"]
    ];

    groups.forEach(([type, heading]) => {
        const section = document.createElement("section");
        section.className = "shop-category";
        const title = document.createElement("h2");
        title.textContent = heading;
        const grid = document.createElement("div");
        grid.className = "shop-category-grid";

        COSMETIC_DATA.filter(item => item.type === type).forEach(item => {
            const owned = currentUser.ownedCosmetics.includes(item.id);
            const equippedField = type === "frame"
                ? "equippedFrame"
                : type === "card" ? "equippedCard" : "equippedBadge";
            const equipped = currentUser[equippedField] === item.id;

            const card = document.createElement("article");
            card.className = "shop-item";
            const preview = document.createElement("div");
            preview.className = `shop-item-preview shop-preview-${item.type} ${item.id}`;
            preview.textContent = item.type === "badge" ? item.icon : item.preview;

            const name = document.createElement("h3");
            name.textContent = item.name;
            const description = document.createElement("p");
            description.textContent = item.description;
            const price = document.createElement("small");
            price.textContent = `💎 ${item.cost}`;
            const button = document.createElement("button");
            button.type = "button";
            button.className = "shop-item-button";
            button.disabled = equipped;
            button.textContent = equipped ? "Equipado" : owned ? "Equipar" : "Comprar";
            button.addEventListener("click", () => {
                if (owned) {
                    equipCosmetic(item.id);
                } else {
                    purchaseCosmetic(item.id);
                }
            });

            card.append(preview, name, description, price, button);
            grid.appendChild(card);
        });

        section.append(title, grid);
        container.appendChild(section);
    });
}

function purchaseCosmetic(id) {
    const item = getCosmetic(id);
    if (!currentUser || !item) {
        return;
    }

    if (currentUser.ownedCosmetics.includes(item.id)) {
        renderShop("Ese artículo ya es tuyo. Puedes equiparlo cuando quieras.");
        return;
    }

    if (currentUser.coins < item.cost) {
        renderShop(`Te faltan ${item.cost - currentUser.coins} gemas para comprar ${item.name}.`);
        return;
    }

    currentUser.coins -= item.cost;
    currentUser.ownedCosmetics.push(item.id);
    equipCosmetic(id, `${item.name} comprado y equipado.`);
}

function equipCosmetic(id, message) {
    const item = getCosmetic(id);
    if (!currentUser || !item) {
        return;
    }

    if (!currentUser.ownedCosmetics.includes(item.id)) {
        renderShop("Primero debes comprar este artículo.");
        return;
    }

    if (item.type === "frame") {
        currentUser.equippedFrame = item.id;
    } else if (item.type === "card") {
        currentUser.equippedCard = item.id;
    } else {
        currentUser.equippedBadge = item.id;
    }

    saveCurrentUser();
    renderShop(message || `${item.name} equipado.`);
    loadPlayerData();
    loadProfile();
}


/* =========================================================
   RANKING LOCAL
========================================================= */

function getRanking() {

    const users =
        getUsers();


    return users
        .map(
            user => {

                return {

                    username:
                        user.username,

                    avatar:
                        user.avatar ||
                        "🧑‍🎓",

                    badge:
                        getCosmetic(user.equippedBadge)?.icon || "",

                    score:
                        Number(
                            user.score
                        ) || 0,

                    level:
                        Number(
                            user.level
                        ) || 1

                };

            }
        )
        .sort(
            (
                a,
                b
            ) =>
                b.score -
                    a.score ||
                b.level -
                    a.level ||
                a.username.localeCompare(
                    b.username,
                    "es"
                )
        );

}


/* =========================================================
   MOSTRAR RANKING
========================================================= */

function showRanking() {

    const ranking =
        getRanking();

    const container =
        document.getElementById(
            "rankingList"
        );

    container.replaceChildren();

    if (ranking.length === 0) {
        const emptyState =
            document.createElement("p");

        emptyState.className =
            "ranking-empty";

        emptyState.textContent =
            "Todavía no hay jugadores guardados. Crea una cuenta y juega para aparecer aquí.";

        container.appendChild(emptyState);
    } else {
        ranking.forEach(
            (player, index) => {

                const row =
                    document.createElement("article");

                row.className =
                    "ranking-row";

                if (
                    currentUser &&
                    player.username === currentUser.username
                ) {
                    row.classList.add("current-player");
                }

                const position =
                    document.createElement("span");

                position.className =
                    "ranking-position";

                position.textContent =
                    index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : `${index + 1}.`;

                const avatar =
                    document.createElement("span");

                avatar.className =
                    "ranking-avatar";

                avatar.setAttribute(
                    "aria-hidden",
                    "true"
                );

                avatar.textContent =
                    player.avatar;

                const details =
                    document.createElement("div");

                details.className =
                    "ranking-player-details";

                const name =
                    document.createElement("strong");

                name.textContent =
                    player.username;

                const level =
                    document.createElement("span");

                level.textContent =
                    `Nivel ${player.level}`;

                const playerName = document.createElement("span");
                playerName.className = "ranking-name";
                playerName.appendChild(name);
                if (player.badge) {
                    const badge = document.createElement("span");
                    badge.className = "ranking-badge";
                    badge.textContent = player.badge;
                    badge.setAttribute("aria-label", "Insignia equipada");
                    playerName.appendChild(badge);
                }

                details.append(
                    playerName,
                    level
                );

                const score =
                    document.createElement("strong");

                score.className =
                    "ranking-score";

                score.textContent =
                    `${player.score} puntos`;

                row.append(
                    position,
                    avatar,
                    details,
                    score
                );

                container.appendChild(row);

            }
        );
    }

    showScreen("rankingScreen");

}


/* =========================================================
   ESTADÍSTICAS AVANZADAS
========================================================= */

function getAccuracy() {

    if (!currentUser) {

        return 0;

    }


    const total =
        currentUser.totalCorrect
        +
        currentUser.totalIncorrect;


    if (
        total === 0
    ) {

        return 0;

    }


    return Math.round(

        (
            currentUser.totalCorrect
            /
            total
        )
        *
        100

    );

}


/* =========================================================
   ACTUALIZAR ESTADÍSTICAS
========================================================= */

function updateAdvancedStats() {

    if (!currentUser) {

        return;

    }


    checkAchievements();


    currentUser.accuracy =
        getAccuracy();


    saveCurrentUser();

}


/* =========================================================
   MODIFICAR CARGA DE DATOS
========================================================= */

const oldLoadPlayerData =
    loadPlayerData;


/*
   Guardamos una referencia de
   la función anterior y creamos
   una versión actualizada.
*/

loadPlayerData = function() {

    oldLoadPlayerData();


    if (!currentUser) {

        return;

    }


    updateAdvancedStats();

};
function updateProfileAdvancedStats() {

    if (!currentUser) {

        return;

    }


    const accuracy =
        getAccuracy();


    const accuracyElement =
        document.getElementById(
            "profileAccuracy"
        );


    const achievementElement =
        document.getElementById(
            "profileAchievementCount"
        );


    if (accuracyElement) {

        accuracyElement.textContent =
            accuracy
            +
            "%";

    }


    if (achievementElement) {

        achievementElement.textContent =
            currentUser
                .achievements
                .length;

    }

}
/* =========================================================
   ENTREGA 11
   FAMILIA + ALIMENTOS + ESCUELA
========================================================= */

const FAMILY_DATA = [
    { name: "MAMÁ", emoji: "👩" },
    { name: "PAPÁ", emoji: "👨" },
    { name: "HERMANO", emoji: "👦" },
    { name: "HERMANA", emoji: "👧" },
    { name: "ABUELO", emoji: "👴" },
    { name: "ABUELA", emoji: "👵" },
    { name: "BEBÉ", emoji: "👶" },
    { name: "FAMILIA", emoji: "👨‍👩‍👧‍👦" }
];

const FOOD_DATA = [
    { name: "MANZANA", emoji: "🍎" },
    { name: "BANANA", emoji: "🍌" },
    { name: "PAN", emoji: "🍞" },
    { name: "LECHE", emoji: "🥛" },
    { name: "ARROZ", emoji: "🍚" },
    { name: "HUEVO", emoji: "🥚" },
    { name: "PESCADO", emoji: "🐟" },
    { name: "AGUA", emoji: "💧" }
];

const SCHOOL_DATA = [
    { name: "LIBRO", emoji: "📕" },
    { name: "LÁPIZ", emoji: "✏️" },
    { name: "CUADERNO", emoji: "📓" },
    { name: "ESCUELA", emoji: "🏫" },
    { name: "PROFESOR", emoji: "👨‍🏫" },
    { name: "MESA", emoji: "🪑" },
    { name: "MOCHILA", emoji: "🎒" },
    { name: "REGLA", emoji: "📏" }
];

const HOUSE_DATA = [
    { name: "CASA", emoji: "🏠" },
    { name: "PUERTA", emoji: "🚪" },
    { name: "VENTANA", emoji: "🪟" },
    { name: "CAMA", emoji: "🛏️" },
    { name: "SILLA", emoji: "🪑" },
    { name: "MESA", emoji: "🪵" },
    { name: "BAÑO", emoji: "🛁" },
    { name: "COCINA", emoji: "🍳" }
];

const ACTION_DATA = [
    { name: "COMER", emoji: "🍽️" },
    { name: "BEBER", emoji: "🥤" },
    { name: "DORMIR", emoji: "😴" },
    { name: "LEER", emoji: "📖" },
    { name: "CORRER", emoji: "🏃" },
    { name: "SALTAR", emoji: "🤸" },
    { name: "JUGAR", emoji: "⚽" },
    { name: "ESCRIBIR", emoji: "✍️" }
];

const COMPREHENSION_DATA = [
    ...FAMILY_DATA,
    ...FOOD_DATA,
    ...SCHOOL_DATA,
    ...HOUSE_DATA,
    ...ACTION_DATA
];

const FINAL_CHALLENGE_DATA = [
    ...COMPREHENSION_DATA,
    ...ANIMAL_DATA,
    ...COLOR_DATA.map(color => ({
        name: color.name,
        emoji: color.emoji
    })),
    ...NUMBER_DATA.map(number => ({
        name: number,
        emoji: number
    }))
];

let categoryGameData = [];
let categoryIndex = 0;
let categoryScore = 0;
let categoryCorrect = 0;
let activeCategoryLevelId = null;

function startCategoryGame(data, title, levelId = null) {

    hideAlphabetImageCredit();

    categoryGameData = shuffleArray([...data]);
    categoryIndex = 0;
    categoryScore = 0;
    categoryCorrect = 0;
    activeCategoryLevelId = levelId;

    showScreen("alphabetGameScreen");

    document.querySelector(
        "#alphabetGameScreen .game-title"
    ).textContent = title;

    document.querySelector(
        "#alphabetGameScreen .question-card h1"
    ).textContent = "¿Qué representa esta imagen?";

    document.getElementById(
        "questionHint"
    ).textContent = "Mira la imagen y elige la palabra correcta.";

    showCategoryQuestion();
}

function showCategoryQuestion() {

    if (categoryIndex >= categoryGameData.length) {
        finishCategoryGame();
        return;
    }

    const question =
        categoryGameData[categoryIndex];

    document.getElementById(
        "currentQuestion"
    ).textContent = categoryIndex + 1;

    document.getElementById(
        "totalQuestions"
    ).textContent =
        categoryGameData.length;

    const categoryProgress =
        Math.round(
            ((categoryIndex + 1) / categoryGameData.length) * 100
        );

    document.getElementById(
        "questionPercentage"
    ).textContent =
        categoryProgress + "%";

    document.getElementById(
        "questionProgressFill"
    ).style.width =
        categoryProgress + "%";

    document.getElementById(
        "answerMessage"
    ).textContent = "";

    document.getElementById(
        "answerMessage"
    ).className = "answer-message";

    document.querySelector(
        "#alphabetGameScreen .question-icon"
    ).textContent = question.emoji;

    document.getElementById(
        "gameScore"
    ).textContent = categoryScore;

    const options =
        document.getElementById("alphabetOptions");

    options.innerHTML = "";

    let answers = [question.name];

    while (answers.length < 4) {

        const random =
            categoryGameData[
                Math.floor(
                    Math.random() *
                    categoryGameData.length
                )
            ].name;

        if (!answers.includes(random)) {
            answers.push(random);
        }
    }

    shuffleArray(answers).forEach(answer => {

        const button =
            document.createElement("button");

        button.className =
            "alphabet-option";

        button.textContent = answer;

        button.onclick = () => {

            categoryAnswer(
                answer,
                question.name,
                button
            );

        };

        options.appendChild(button);

    });

    document.getElementById(
        "nextQuestionButton"
    ).style.display = "none";
}

function categoryAnswer(
    selected,
    correct,
    button
) {

    const buttons =
        document.querySelectorAll(
            "#alphabetOptions button"
        );

    buttons.forEach(
        b => b.disabled = true
    );

    if (selected === correct) {

        button.classList.add("correct");

        categoryCorrect++;

        categoryScore += 100;
        currentUser.totalCorrect++;

        document.getElementById(
            "answerMessage"
        ).textContent = "🎉 ¡Correcto!";

    } else {

        button.classList.add("incorrect");
        currentUser.totalIncorrect++;

        document.getElementById(
            "answerMessage"
        ).textContent =
            "❌ Respuesta correcta: " +
            correct;

        document.getElementById(
            "answerMessage"
        ).className = "answer-message answer-incorrect";
    }

    if (selected === correct) {
        document.getElementById(
            "answerMessage"
        ).className = "answer-message answer-correct";
    }

    document.getElementById(
        "gameScore"
    ).textContent = categoryScore;

    document.getElementById(
        "nextQuestionButton"
    ).style.display = "block";

    document.getElementById(
        "nextQuestionButton"
    ).onclick = () => {

        categoryIndex++;

        showCategoryQuestion();

    };
}

function finishCategoryGame() {

    currentUser.score += categoryScore;

    currentUser.xp +=
        categoryCorrect * 10;

    currentUser.gamesCompleted++;

    currentUser.bestCorrect =
        Math.max(
            currentUser.bestCorrect,
            categoryCorrect
        );

    let completed = false;
    let stars = 0;

    if (activeCategoryLevelId !== null) {
        const totalQuestions = categoryGameData.length;
        const passingScore = Math.ceil(totalQuestions / 2);

        completed =
            categoryCorrect >= passingScore;

        stars =
            categoryCorrect >= Math.ceil(totalQuestions * 0.875)
            ? 3
            : categoryCorrect >= Math.ceil(totalQuestions * 0.75)
            ? 2
            : completed
            ? 1
            : 0;

        currentUser.levelProgress[activeCategoryLevelId] = {
            progress: 100,
            stars,
            completed
        };

        if (
            completed &&
            activeCategoryLevelId < LEVELS.length
        ) {
            unlockLevel(activeCategoryLevelId + 1);
        }
    }

    saveCurrentUser();
    loadPlayerData();

    checkAchievements();

    alert(
        (completed || activeCategoryLevelId === null
            ? "🎉 ¡ACTIVIDAD COMPLETADA!"
            : "💪 ¡Sigue practicando!") +
        "\n\n" +
        (activeCategoryLevelId !== null
            ? getStars(stars) + "\n"
            : "") +
        "⭐ Puntos: " +
        categoryScore +
        "\n✅ Correctas: " +
        categoryCorrect +
        " de " +
        categoryGameData.length +
        (activeCategoryLevelId !== null && !completed
            ? "\nNecesitas la mitad de respuestas correctas para desbloquear el siguiente nivel."
            : "")
    );

    activeCategoryLevelId = null;
    startAdventure();
}
/* =========================================================
   ENTREGA 13
   EXAMEN
========================================================= */

const EXAM_DATA = [

    ...NUMBER_DATA.map(n => ({
        question: "¿Qué número es?",
        icon: n,
        iconType: "number",
        answer: n,
        options: NUMBER_DATA
            .slice(0, 4)
    })),

    ...COLOR_DATA.map(c => ({
        question: "¿Qué color es?",
        icon: c.emoji,
        iconType: "color",
        answer: c.name,
        options: COLOR_DATA
            .map(x => x.name)
            .slice(0, 4)
    })),

    ...ANIMAL_DATA.map(a => ({
        question: "¿Qué animal es?",
        icon: a.emoji,
        answer: a.name,
        options: ANIMAL_DATA
            .map(x => x.name)
            .slice(0, 4)
    }))
];

let examIndex = 0;
let examScore = 0;

function startExam() {

    examIndex = 0;
    examScore = 0;

    showScreen("examScreen");

    showExamQuestion();
}

function showExamQuestion() {

    if (
        examIndex >= 10
    ) {

        finishExam();

        return;
    }

    const question =
        EXAM_DATA[
            Math.floor(
                Math.random() *
                EXAM_DATA.length
            )
        ];

    document.getElementById(
        "examQuestion"
    ).textContent =
        question.question;

    const examIcon =
        document.getElementById(
            "examIcon"
        );

    if (question.iconType === "number") {
        examIcon.innerHTML =
            numberIllustration(question.answer);
    } else if (question.iconType === "color") {
        const color =
            COLOR_DATA.find(
                item => item.name === question.answer
            );

        examIcon.innerHTML =
            colorIllustration(color);
    } else {
        examIcon.textContent =
            question.icon;
    }

    const container =
        document.getElementById(
            "examOptions"
        );

    container.innerHTML = "";

    const options =
        shuffleArray(
            [...question.options]
        );

    options.forEach(option => {

        const button =
            document.createElement("button");

        button.className =
            "alphabet-option";

        button.textContent = option;

        button.onclick = () => {

            if (
                option ===
                question.answer
            ) {

                examScore += 100;

                button.classList.add(
                    "correct"
                );

            } else {

                button.classList.add(
                    "incorrect"
                );
            }

            container
                .querySelectorAll("button")
                .forEach(
                    b => b.disabled = true
                );

            setTimeout(() => {

                examIndex++;

                showExamQuestion();

            }, 800);

        };

        container.appendChild(button);

    });
}

function finishExam() {

    currentUser.score +=
        examScore;

    currentUser.xp +=
        examScore / 5;

    saveCurrentUser();

    checkAchievements();

    alert(
        "🧠 EXAMEN TERMINADO\n\n" +
        "⭐ " +
        examScore +
        " puntos"
    );

    startAdventure();
}
/* =========================================================
   ENTREGA 14
========================================================= */

let timer = 30;
let timerInterval = null;
let lives = 3;
let combo = 0;

function startChallengeMode() {

    lives = 3;
    combo = 0;
    timer = 30;

    showScreen(
        "alphabetGameScreen"
    );

    document.querySelector(
        "#alphabetGameScreen .game-title"
    ).textContent =
        "🔥 Modo desafío";

    startTimer();

    startCategoryGame(
        ANIMAL_DATA,
        "🔥 Desafío"
    );
}

function startTimer() {

    clearInterval(timerInterval);

    timer = 30;

    timerInterval =
        setInterval(() => {

            timer--;

            const title =
                document.querySelector(
                    "#alphabetGameScreen .game-title"
                );

            if (title) {

                title.textContent =
                    "🔥 Desafío | ⏱️ " +
                    timer;

            }

            if (timer <= 0) {

                clearInterval(
                    timerInterval
                );

                alert(
                    "⏰ ¡Se acabó el tiempo!"
                );

                startAdventure();

            }

        }, 1000);
}

function resetChallenge() {

    clearInterval(
        timerInterval
    );

    timer = 30;
    lives = 3;
    combo = 0;
}
lives--;

combo = 0;

if (lives <= 0) {

    alert(
        "💔 Te quedaste sin vidas."
    );

    startAdventure();

}
/* =========================================================
   ENTREGA 15
========================================================= */

const VIDEO_DATA = [

    {
        title:
            "Introducción a la lengua de señas",

        description:
            "Conceptos básicos para comenzar.",

        url:
            "https://www.youtube.com/results?search_query=LSE+lengua+de+signos+espa%C3%B1ola"
    },

    {
        title:
            "Abecedario en lengua de señas",

        description:
            "Aprende las letras.",

        url:
            "https://www.youtube.com/results?search_query=abecedario+dactilol%C3%B3gico+LSE"
    },

    {
        title:
            "Números en lengua de señas",

        description:
            "Aprende los números.",

        url:
            "https://www.youtube.com/results?search_query=n%C3%BAmeros+lengua+de+signos+espa%C3%B1ola+LSE"
    },

    {
        title:
            "Saludos",

        description:
            "Aprende saludos básicos.",

        url:
            "https://www.youtube.com/results?search_query=saludos+lengua+de+signos+espa%C3%B1ola+LSE"
    }

];

const VIDEO_TOPICS = [
    {
        icon: "🤟",
        title: "Abecedario dactilológico LSE",
        description: "Aprende las letras hechas con la mano en la Lengua de Signos Española.",
        query: "alfabeto dactilológico LSE lengua de signos española"
    },
    {
        icon: "🔢",
        title: "Números en LSE",
        description: "Busca videos para aprender a expresar números en LSE.",
        query: "números lengua de signos española LSE"
    },
    {
        icon: "👋",
        title: "Saludos y presentaciones",
        description: "Practica saludos y formas de presentarte en LSE.",
        query: "saludos presentaciones lengua de signos española LSE"
    },
    {
        icon: "👨‍👩‍👧",
        title: "La familia en LSE",
        description: "Encuentra videos para aprender vocabulario de la familia.",
        query: "familia vocabulario lengua de signos española LSE"
    },
    {
        icon: "🍎",
        title: "Alimentos en LSE",
        description: "Busca cómo se signan comidas y bebidas en LSE.",
        query: "alimentos comida bebidas lengua de signos española LSE"
    },
    {
        icon: "🐶",
        title: "Animales en LSE",
        description: "Descubre videos de vocabulario de animales en LSE.",
        query: "animales vocabulario lengua de signos española LSE"
    },
    {
        icon: "🏫",
        title: "La escuela en LSE",
        description: "Aprende vocabulario de objetos y personas de la escuela.",
        query: "escuela colegio vocabulario lengua de signos española LSE"
    },
    {
        icon: "🏠",
        title: "La casa en LSE",
        description: "Busca videos sobre habitaciones y objetos de la casa.",
        query: "casa objetos hogar lengua de signos española LSE"
    },
    {
        icon: "📚",
        title: "Recursos educativos de la Fundación CNSE",
        description: "Consulta el banco oficial de imágenes y signos en LSE.",
        url: "https://fundacioncnse.org/educa/bancolse/"
    }
];

function renderVideoLibrary() {

    const search =
        document.getElementById("videoSearch");

    const container =
        document.getElementById("videoList");

    const status =
        document.getElementById("videoResultsStatus");

    const query =
        search.value
            .trim()
            .toLocaleLowerCase("es");

    const videos =
        VIDEO_TOPICS.filter(video =>
            `${video.title} ${video.description}`
                .toLocaleLowerCase("es")
                .includes(query)
        );

    container.replaceChildren();

    status.textContent =
        videos.length === 0
        ? "No encontramos temas con esa búsqueda. Prueba otra palabra."
        : `${videos.length} recursos disponibles.`;

    videos.forEach(video => {

        const card =
            document.createElement("article");

        card.className =
            "video-card";

        const icon =
            document.createElement("div");

        icon.className =
            "video-icon";

        icon.setAttribute("aria-hidden", "true");
        icon.textContent =
            video.icon;

        const title =
            document.createElement("h2");

        title.textContent =
            video.title;

        const description =
            document.createElement("p");

        description.textContent =
            video.description;

        const link =
            document.createElement("a");

        link.className =
            "main-button video-link";

        link.target =
            "_blank";

        link.rel =
            "noopener noreferrer";

        if (video.url) {
            link.href =
                video.url;

            link.textContent =
                "📖 ABRIR RECURSO";
        } else {
            link.href =
                "https://www.youtube.com/results?search_query=" +
                encodeURIComponent(video.query);

            link.textContent =
                "▶ BUSCAR VIDEOS";
        }

        card.append(
            icon,
            title,
            description,
            link
        );

        container.appendChild(card);

    });

}

function openVideos() {

    showScreen(
        "videosScreen"
    );

    const search =
        document.getElementById("videoSearch");

    search.value = "";
    search.oninput =
        renderVideoLibrary;

    renderVideoLibrary();
}
/* =========================================================
   ENTREGA 20
   SISTEMA FINAL
========================================================= */

function openGameMenu() {

    const menu = [

        "🎮 JUGAR",

        "📺 VIDEOS",

        "📚 BIBLIOTECA",

        "🏆 LOGROS",

        "🏆 CLASIFICACIÓN LOCAL",

        "🧠 EXAMEN",

        "🔥 DESAFÍO",

        "⚙️ CONFIGURACIÓN"

    ];

    const selection =
        prompt(
            menu.join("\n") +
            "\n\nEscribe el número:"
        );

    switch(selection) {

        case "1":

            startAdventure();

            break;

        case "2":

            openVideos();

            break;

        case "3":

            openLibrary();

            break;

        case "4":

            showAchievements();

            break;

        case "5":

            showRanking();

            break;

        case "6":

            startExam();

            break;

        case "7":

            startChallengeMode();

            break;

        case "8":

            openSettings();

            break;

        default:

            break;

    }

}

const LIBRARY_DATA = [

    {
        icon: "🔤",
        title: "Abecedario",
        text:
            "Aprende las letras de la lengua de señas."
    },

    {
        icon: "🔢",
        title: "Números",
        text:
            "Practica los números."
    },

    {
        icon: "🎨",
        title: "Colores",
        text:
            "Aprende colores básicos."
    },

    {
        icon: "🐶",
        title: "Animales",
        text:
            "Descubre nombres de animales."
    },

    {
        icon: "👨‍👩‍👧",
        title: "Familia",
        text:
            "Aprende palabras relacionadas con la familia."
    },

    {
        icon: "🏫",
        title: "Escuela",
        text:
            "Aprende vocabulario escolar."
    }

];

function openLibrary() {

    showScreen(
        "libraryScreen"
    );

    const container =
        document.getElementById(
            "libraryContent"
        );

    container.innerHTML = "";

    LIBRARY_DATA.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "video-card";

        card.innerHTML = `

            <div class="video-icon">
                ${item.icon}
            </div>

            <h2>
                ${item.title}
            </h2>

            <p>
                ${item.text}
            </p>

        `;

        container.appendChild(card);

    });
}

function openSettings() {

    showScreen(
        "settingsScreen"
    );

    loadSettings();

}

function loadSettings() {

    const settings =
        JSON.parse(
            localStorage.getItem(
                "senasSettings"
            )
        ) || {
            fontSize: 18,
            highContrast: false,
            animations: true
        };

    document.getElementById(
        "fontSizeControl"
    ).value =
        settings.fontSize;

    document.getElementById(
        "highContrast"
    ).checked =
        settings.highContrast;

    document.getElementById(
        "animationsControl"
    ).checked =
        settings.animations;

    applySettings(
        settings
    );

}

function saveSettings() {

    const settings = {
        fontSize:
            Number(
                document.getElementById(
                    "fontSizeControl"
                ).value
            ),
        highContrast:
            document.getElementById(
                "highContrast"
            ).checked,
        animations:
            document.getElementById(
                "animationsControl"
            ).checked
    };

    localStorage.setItem(
        "senasSettings",
        JSON.stringify(settings)
    );

    applySettings(
        settings
    );

}

function applySettings(settings) {

    document.documentElement
        .style
        .setProperty(
            "--game-font-size",
            settings.fontSize + "px"
        );

    document.body.style.fontSize =
        settings.fontSize + "px";

    document.body.classList.toggle(
        "high-contrast",
        settings.highContrast
    );

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const font =
            document.getElementById(
                "fontSizeControl"
            );

        const contrast =
            document.getElementById(
                "highContrast"
            );

        const animations =
            document.getElementById(
                "animationsControl"
            );

        if (font) {
            font.addEventListener(
                "input",
                saveSettings
            );
        }

        if (contrast) {
            contrast.addEventListener(
                "change",
                saveSettings
            );
        }

        if (animations) {
            animations.addEventListener(
                "change",
                saveSettings
            );
        }

    }
);

function saveGameProgress() {

    if (!currentUser) {
        return;
    }

    updateAdvancedStats();

    localStorage.setItem(
        "senasCurrentUser",
        JSON.stringify(currentUser)
    );

}
