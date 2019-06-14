let logs = [];
const ATM = {
    isAuth: false,
    currentUser: {},
    // all cash available in ATM
    cash: 2000,
    // all available users
    users: [
        {id: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {id: "0025", pin: "123", debet: 675, type: "user"}
    ],
    // authorization
    auth() {
        let containerOfLoginForm = document.getElementById('log_in');
        let input = containerOfLoginForm.getElementsByTagName('Input');
        let id = (input[0].value);
        let pass = (input[1].value);
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id && this.users[i].pin === pass) {
                this.currentUser = this.users[i];
                this.isAuth = true;
                document.getElementById('log_out').style.display = 'block';
                document.getElementById('log_in').style.display = 'none';
                if (this.currentUser.type === "user") {
                    document.getElementById('users_info').style.display = 'block';
                    document.getElementById('container').style.display = 'block';
                    availableCash(0);
                } else {
                    document.getElementById('admin_info').style.display = 'block';
                    document.getElementById('container').style.display = 'block';
                    availableCash(1);
                }
                this.check();
                return;
            }
        }
        let error = containerOfLoginForm.getElementsByTagName('h3')[0];
        error.style.textAlign = 'center';
        error.style.display = 'block';
    },
    // check current debet
    check() {
        document.getElementById('users_info').getElementsByTagName('h3')[0].innerText =
            'On your card is ' + this.currentUser.debet + "$";
    },
    // get cash - available for user only
    getCash(amount) {
        let error = document.getElementById('get_money_error');
        if (amount < 1 || isNaN(amount)) {
            error.innerText = 'You want to get a negative amount of money';
            error.style.display = 'block';
            logs.push(new Date() + "; user: " + this.currentUser.id + "; type: " + this.currentUser.type + "; get: try to get negative amount of money");
            return;
        }
        if (this.currentUser.debet < amount) {
            error.innerText = 'You want to withdraw more money than you have';
            error.style.display = 'block';
            logs.push(new Date() + "; user: " + this.currentUser.id + "; type: " + this.currentUser.type + "; get: user have not enough money on his bill");
            return;
        } else if (this.cash < amount) {
            error.innerText = 'Sorry, but the Bank doesn\'t have enough money';
            error.style.display = 'block';
            logs.push(new Date() + "; user: " + this.currentUser.id + "; type: " + this.currentUser.type + "; get: in the bank was not enough money");
            return;
        }
        this.cash -= amount;
        this.currentUser.debet -= amount;
        this.check();
        availableCash(0);
        logs.push(new Date() + "; user: " + this.currentUser.id + "; type: " + this.currentUser.type + "; get: " + amount)
    },
    // load cash - available for user only
    loadCash(amount) {
        if (amount < 1 || isNaN(amount)) {
            let error = document.getElementById('put_money_error');
            error.innerText = 'You want to put a negative amount of money';
            error.style.display = 'block';
            logs.push(new Date() + "; user: " + this.currentUser.id + "; type: " + this.currentUser.type + "; put: want to put negative amount of money");
            return;
        }
        this.cash += amount;
        this.currentUser.debet += amount;
        this.check();
        availableCash(0);
        logs.push(new Date() + "; user: " + this.currentUser.id + "; type: " + this.currentUser.type + "; put: " + amount)
    },
    // load cash to ATM - available for admin only - EXTENDED
    loadAtmCash(amount) {
        if (amount < 1 || isNaN(amount)) {
            let error = document.getElementById('banks_bill_error');
            error.innerText = 'You want to put a negative amount of money into banks bill';
            error.style.display = 'block';
            logs.push(new Date() + "; user: " + this.currentUser.id + "; type: " + this.currentUser.type + "; put: want to put negative amount of money");
            return;
        }
        this.cash += amount;
        availableCash(1);
        logs.push(new Date() + "; user: " + this.currentUser.id + "; type: " + this.currentUser.type + "; put: " + amount)
    },
    // get cash actions logs - available for admin only - EXTENDED
    getLogs() {
        var logsUl = document.getElementById('logs');
        for (let i = 0; i < logs.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = logs[i];
            logsUl.appendChild(li);
            console.log(logs[i])
        }
    },
    // log out
    logout() {
        let containerOfLoginForm = document.getElementById('log_in');
        for (let i = 0; i < containerOfLoginForm.getElementsByTagName('input').length; i++) {
            containerOfLoginForm.getElementsByTagName('input')[i].value = '';
        }
        if (this.currentUser.type === "user") {
            document.getElementById('users_info').style.display = 'none';
        } else {
            document.getElementById('admin_info').style.display = 'none';
        }
        this.currentUser = null;
        this.isAuth = false;
        document.getElementById('log_out').style.display = 'none';
        document.getElementById('container').style.display = 'none';
        document.getElementById('log_in').style.display = 'block';
        containerOfLoginForm.getElementsByTagName('h3')[0].style.display = 'none';
    }
};
function availableCash(i) {
    document.getElementsByClassName('moneyInBank')[i].innerHTML = 'Available cash to take off: ' + ATM.cash + "$";
}

document.getElementById('authorization').onclick = () => {
    ATM.auth()
};
document.getElementById('logout').onclick = () => {
    ATM.logout()
};
document.getElementById('btn_put_money').onclick = () => {
    ATM.loadCash(+document.getElementById('put_money').value);
};
document.getElementById('btn_get_money').onclick = () => {
    ATM.getCash(+document.getElementById('get_money').value);
};
document.getElementById('put_money_to_bank').onclick = () => {
    ATM.loadAtmCash(+document.getElementById('put_to_banks_bill').value)
};
document.getElementById('logs_btn').onclick = () => {
    ATM.getLogs()
};
