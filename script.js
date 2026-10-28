// Tracks the current god and monster, plus their plain names, so we can compare and label them once both are answered
let currentGod = null;
let currentMonster = null;
let currentGodName = null;
let currentMonsterName = null;

const emailButtons = document.querySelectorAll(".email-button");

if (emailButtons.length > 0) {
    emailButtons.forEach(function (emailButton) {
        const originalText = emailButton.textContent;

        emailButton.addEventListener("click", function (event) {
            event.preventDefault();

            navigator.clipboard.writeText(emailButton.textContent);
            emailButton.textContent = "Copied to clipboard!";

            setTimeout(function () {
                emailButton.textContent = originalText;
            }, 2500);

            console.log("*click*");
        });
    });
}

// Selects the recommendation paragraph and both audience buttons (homepage only)
const message = document.querySelector(".recommendation");
const browsingBtn = document.querySelector(".btn-browsing");
const commissionBtn = document.querySelector(".btn-commission");

// Listens for a click on the "Just Browsing" button and shows a browsing-focused message
if (browsingBtn) {
    browsingBtn.addEventListener("click", function () {
        message.textContent = "Head over to the Gallery to browse Gods and Monsters, and enjoy exploring the collection!";
    });
}

// Listens for a click on the "Looking to Commission" button and shows a commission-focused message
if (commissionBtn) {
    commissionBtn.addEventListener("click", function () {
        message.textContent = "Reach out via my Business Email to discuss a commission - feel free to check out the Gallery first to get a feel for my style.";
    });
}

// Selects the "Find Your God" button, input field, result image, result caption, recommendation paragraph, and result figure
const findBtn = document.querySelector(".btn-find-image");
const input = document.querySelector(".image-input");
const resultImage = document.querySelector(".result-image");
const resultCaption = document.querySelector(".result-caption");
const recommendation = document.querySelector(".recommendation");
const resultFigure = document.querySelector(".result-figure");
const fateEasterEgg = document.querySelector(".fate-easter-egg");

if (findBtn) {
    findBtn.addEventListener("click", function () {
        const answer = input.value.toLowerCase().trim();

        if (answer === "oldest") {
            recommendation.textContent = "";
            recommendation.style.display = "none";
            resultImage.src = "images/zues.png";
            resultImage.alt = "Zeus, reimagined for games, holding a lightning bolt";
            resultCaption.textContent = "Zeus";
            resultFigure.style.display = "block";
            currentGod = "zeus";
            currentGodName = "Zeus";

        } else if (answer === "middle") {
            recommendation.textContent = "";
            recommendation.style.display = "none";
            resultImage.src = "images/waterman.png";
            resultImage.alt = "Poseidon, reimagined for games, holding a trident";
            resultCaption.textContent = "Poseidon";
            resultFigure.style.display = "block";
            currentGod = "poseidon";
            currentGodName = "Poseidon";

        } else if (answer === "youngest") {
            recommendation.textContent = "";
            recommendation.style.display = "none";
            resultImage.src = "images/hades.png";
            resultImage.alt = "Hades, reimagined for games, holding a bident";
            resultCaption.textContent = "Hades";
            resultFigure.style.display = "block";
            currentGod = "hades";
            currentGodName = "Hades";

        } else {
            recommendation.textContent = "Please try again with oldest, middle, or youngest.";
            recommendation.style.display = "block";
            currentGod = null;
            currentGodName = null;
        }

        checkOutcome();
    });
}

// Selects the "Find Your Monster" button, input field, result image, result caption, recommendation paragraph, and result figure
const findMonsterBtn = document.querySelector(".btn-find-monster");
const monsterInput = document.querySelector(".monster-input");
const monsterResultImage = document.querySelector(".monster-result-image");
const monsterResultCaption = document.querySelector(".monster-result-caption");
const monsterRecommendation = document.querySelector(".monster-recommendation");
const monsterResultFigure = document.querySelector(".monster-result-figure");

if (findMonsterBtn) {
    findMonsterBtn.addEventListener("click", function () {
        const monsterAnswer = monsterInput.value.toLowerCase().trim();

        if (monsterAnswer === "heights") {
            monsterRecommendation.textContent = "";
            monsterRecommendation.style.display = "none";
            monsterResultImage.src = "images/harpie.png";
            monsterResultImage.alt = "Harpie, reimagined for games, flying with wings";
            monsterResultCaption.textContent = "Harpie";
            monsterResultFigure.style.display = "block";
            currentMonster = "harpy";
            currentMonsterName = "Harpie";

        } else if (monsterAnswer === "ocean") {
            monsterRecommendation.textContent = "";
            monsterRecommendation.style.display = "none";
            monsterResultImage.src = "images/cetus.png";
            monsterResultImage.alt = "Cetus, reimagined for games, a sea monster";
            monsterResultCaption.textContent = "Cetus";
            monsterResultFigure.style.display = "block";
            currentMonster = "cetus";
            currentMonsterName = "Cetus";

        } else if (monsterAnswer === "fire") {
            monsterRecommendation.textContent = "";
            monsterRecommendation.style.display = "none";
            monsterResultImage.src = "images/bigdog.png";
            monsterResultImage.alt = "Cerberus, reimagined for games, a large canine monster";
            monsterResultCaption.textContent = "Cerberus";
            monsterResultFigure.style.display = "block";
            currentMonster = "cerberus";
            currentMonsterName = "Cerberus";

        } else {
            monsterRecommendation.textContent = "Please try again with heights, ocean, or fire.";
            monsterRecommendation.style.display = "block";
            currentMonster = null;
            currentMonsterName = null;
        }

        checkOutcome();
    });
}

// Compares the current god and monster's elements once both have been answered, and labels the winner, the defeated, or an evenly matched pair
function checkOutcome() {
    if (!currentGod || !currentMonster) return;

    resultFigure.classList.remove("winner", "defeated", "even-match");
    monsterResultFigure.classList.remove("winner", "defeated", "even-match");

    const elements = { zeus: "air", poseidon: "water", hades: "fire", harpy: "air", cetus: "water", cerberus: "fire" };
    const beats = { air: "water", water: "fire", fire: "air" };

    const godElement = elements[currentGod];
    const monsterElement = elements[currentMonster];

    if (godElement === monsterElement) {
        resultFigure.classList.add("even-match");
        monsterResultFigure.classList.add("even-match");
        resultCaption.textContent = currentGodName + " - Evenly Matched";
        monsterResultCaption.textContent = currentMonsterName + " - Evenly Matched";
        fateEasterEgg.textContent = "Fittingly, these two share the same domain.";
    } else if (beats[godElement] === monsterElement) {
        resultFigure.classList.add("winner");
        monsterResultFigure.classList.add("defeated");
        resultCaption.textContent = currentGodName + " - Winner";
        monsterResultCaption.textContent = currentMonsterName + " - Defeated";
        fateEasterEgg.textContent = "";
    } else {
        monsterResultFigure.classList.add("winner");
        resultFigure.classList.add("defeated");
        monsterResultCaption.textContent = currentMonsterName + " - Winner";
        resultCaption.textContent = currentGodName + " - Defeated";
        fateEasterEgg.textContent = "";
    }
}