const leftdBtn = document.querySelector("[data-check-btn='1']"),
    transitdBtn = document.querySelector("[data-check-btn='2']"),
    arrivedBtn = document.querySelector("[data-check-btn='3']"),
    unloadingBtn = document.querySelector("[data-check-btn='4']"),
    payedBtn = document.querySelector("[data-check-btn='5']"),
    err = document.querySelector('.err'),
    statusErr = document.querySelector('.status-err');

const carStatus = document.getElementById('car-status'),
    payStatus = document.getElementById('pay-status'),
    loadStatus = document.getElementById('load-status'),
    date = document.getElementById('date-loaded'),
    fileLabel = document.getElementById('file-label'),
    fileInput = document.getElementById('file'),
    carNumber = document.getElementById('car'),
    sendBtn = document.getElementById('send'),
    form = document.getElementById('form'),
    fromWhere = document.getElementById('from-where'),
    toWhere = document.getElementById('to-where');

let regular = new RegExp();

const carLeft = () => {
    leftdBtn.children[0].classList.add('active');

    transitdBtn.children[0].classList.remove('active');
    arrivedBtn.children[0].classList.remove('active');
    unloadingBtn.children[0].classList.remove('active');
    loadStatus.value = "❌";

    statusErr.classList.remove('active-err');

    carStatus.value = "Машина выехала";
}

const carMove = () => {
    transitdBtn.children[0].classList.add('active');
    
    leftdBtn.children[0].classList.remove('active');
    arrivedBtn.children[0].classList.remove('active');
    unloadingBtn.children[0].classList.remove('active');
    loadStatus.value = "❌";

    statusErr.classList.remove('active-err');

    carStatus.value = "Машина в пути";
}
const carArrive = () => {
    arrivedBtn.children[0].classList.add('active');

    leftdBtn.children[0].classList.remove('active');
    transitdBtn.children[0].classList.remove('active');

    statusErr.classList.remove('active-err');

    carStatus.value = "Машина доехала";
}

const carUnloading = () => {
    if (leftdBtn.children[0].classList.contains('active') || transitdBtn.children[0].classList.contains('active')) {
        return;
    }
    unloadingBtn.children[0].classList.toggle('active');

    if (unloadingBtn.children[0].classList.contains('active')) {
        loadStatus.value = "✅";
    } else {
        loadStatus.value = "❌";
    }
}

const carPay = () => {
    payedBtn.children[0].classList.toggle('active');
    if (payedBtn.children[0].classList.contains('active')) {
        payStatus.value = "✅";
    } else {
        payStatus.value = "❌";
    }
}

const addFile = () => {
    fileLabel.innerHTML = fileInput.value;
}

const init = (event) => {
    event.preventDefault();
    if (carNumber.value != '' && fromWhere.value != '' && toWhere.value != '' && date.value != '' && fileInput.value != '') {
        if (carStatus.value != '') {
            form.submit();
        } else {
            statusErr.classList.add('active-err');
        }
    } else {
        err.classList.add('active-err');
        setTimeout(() => {
            err.classList.remove('active-err');
        }, 3000);
    }
}

send.addEventListener('click', init);

leftdBtn.addEventListener('click', carLeft);
transitdBtn.addEventListener('click', carMove);
arrivedBtn.addEventListener('click', carArrive);
unloadingBtn.addEventListener('click', carUnloading);
payedBtn.addEventListener('click', carPay);
fileInput.addEventListener('change', addFile);
