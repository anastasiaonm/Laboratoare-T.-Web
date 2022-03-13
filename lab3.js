
// Selectors
const group1 = document.getElementById('group1');
const group2 = document.getElementById('group2');
const group3 = document.getElementById('group3');

let bara = document.getElementById("bara");

let groups = [group1, group2, group3];

const flag1 = document.getElementById('coloana1Flag');
const flag2 = document.getElementById('coloana2Flag');
const flag3 = document.getElementById('coloana3Flag');

const coloana1 = document.querySelector('.coloana1');
const coloana2 = document.querySelector('.coloana2');
const coloana3 = document.querySelector('.coloana3');

const button = document.querySelector('#reset');

// Events
group1.addEventListener('click', showFlag);
group2.addEventListener('click', showFlag);
group3.addEventListener('click', showFlag);

flag1.addEventListener('click', showFlagName);
flag2.addEventListener('click', showFlagName);
flag3.addEventListener('click', showFlagName);

group1.addEventListener('click', showBorder);
group2.addEventListener('click', showBorder);
group3.addEventListener('click', showBorder);

button.addEventListener('click', reset);

// Functions
function showFlag(e) {
    const tara = e.target;
    if(tara.parentElement.id === 'group1') {
        const flag = document.getElementById('coloana1Flag');
        if (tara.id === "ucraina")
            flag.src = "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg";
        if (tara.id === "moldova")
            flag.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Moldova.svg/210px-Flag_of_Moldova.svg.png";
        if (tara.id === "elvetia")
            flag.src = "https://displaysales.com/wp-content/uploads/2020/01/switzerland-flag-1200x900.jpg";
        if (tara.id === "franta")
            flag.src = "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png";
        if (tara.id === "spania")
            flag.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2560px-Flag_of_Spain.svg.png";
    }

    if(tara.parentElement.id === 'group2') {
        const flag = document.getElementById('coloana2Flag');
        if (tara.id === "coreea-de-sud")
            flag.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1024px-Flag_of_South_Korea.svg.png";
        if (tara.id === "coreea-de-nord")
            flag.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flag_of_North_Korea.svg/1200px-Flag_of_North_Korea.svg.png";
        if (tara.id === "singapore")
            flag.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/1200px-Flag_of_Singapore.svg.png";
        if (tara.id === "taiwan")
            flag.src = "https://media.istockphoto.com/vectors/flag-of-taiwan-vector-id657673118?k=20&m=657673118&s=612x612&w=0&h=Y03JZPwk3PZAbN4P2j3TAI4oObtJ4kSAFxSFrE78zUw=";
        if (tara.id === "japonia")
            flag.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/800px-Flag_of_Japan.svg.png";
    }

    if(tara.parentElement.id === 'group3') {
        const flag = document.getElementById('coloana3Flag');
        if (tara.id === "australia")
            flag.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/640px-Flag_of_Australia_%28converted%29.svg.png";
        if (tara.id === "USA")
            flag.src = "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg";
        if (tara.id === "faroe-island")
            flag.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Flag_of_the_Faroe_Islands.svg/2560px-Flag_of_the_Faroe_Islands.svg.png";
        if (tara.id === "UK")
            flag.src = "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/640px-Flag_of_the_United_Kingdom.svg.png";
        if (tara.id === "iceland")
            flag.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Iceland.svg/2560px-Flag_of_Iceland.svg.png";
    }
}

function showFlagName(e) {
    const flag = e.target;
    let id = flag.id;
    let options = flag.parentElement.lastElementChild.lastElementChild;

    for(let i = 0; i < options.children.length; i += 3) {
        if(options.children[i].checked)
            bara.innerHTML = options.children[i].value;
    }
}

function showBorder(e) {
    const grupa = e.target.parentElement;
    let idGrupa = grupa.id;
    deleteBorders();
    if(idGrupa === 'group1') {
        coloana1.style.border = "solid "+ getColor();
    }
    if(idGrupa === 'group2') {
        coloana2.style.border = "solid "+ getColor();
    }
    if(idGrupa === 'group3') {
        coloana3.style.border = "solid " + getColor();
    }
}

function deleteBorders() {
    coloana1.style.border = "none";
    coloana2.style.border = "none";
    coloana3.style.border = "none";
}

function getColor() {
    let rgb = [];
    let count;
    for(let i = 0; i < groups.length; i++) {
        let options = groups[i].children;
        count = 0;
        for(let j = 0; j < options.length; j += 3) {
            if(options[j].checked) {
                rgb[i] = count;
                break;
            }
            count += 50;
        }
    }
    return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
}

function reset() {
    bara.innerHTML = "flag";
    for(let i = 0; i < groups.length; i++) {
        let options = groups[i].children;
        for(let j = 0; j < options.length; j += 3) {
            options[j].checked  = false;
        }
    }
    deleteBorders();
    flag1.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Moldova.svg/210px-Flag_of_Moldova.svg.png";
    flag2.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1024px-Flag_of_South_Korea.svg.png";
    flag3.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/640px-Flag_of_Australia_%28converted%29.svg.png";
}