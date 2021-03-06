function logout(){
    fetch("/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(res => {
        if (res.success === true) {
            window.location.href=`http://localhost:3000/login`;    
         }
    })
    .catch((err) => console.log(err))
}

let val_data = [];
let cont_data = 0;

// Validation for CUSTOMER NAME-------------------------------------------
function isCustomer(input) {
    document.getElementById('cname').value = document.getElementById('cname').value.trim();
    input = input.trim();
    let customerName = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
    if (input.length >= 2 && input.length <= 50 && input.match(customerName)) {
        setSuccessMsg(cname);
        val_data[0] = 1;
        return True;
    }
    else {
        setErrorMsg(cname);
        val_data[0] = 0;
        return false;
    }
}

// Validations for CONTACT INFORMATION---------------------------------------------------------

function isContact(evt, input) {
    let charcode = evt.keyCode;
    if (charcode > 31 && (charcode < 48 || charcode > 57)) {
        ccontact.parentElement.className = "form-control error";
        return false;
    }
    else {
        ccontact.parentElement.className = "form-control";
        return true;
    }
}

function isLength(len, input, type) {
    let letters = /^[6-9][0-9]{0,9}$/;
    if (input.value.length === len && input.value.match(letters)) {
        setSuccessMsg(input);
        val_data[1] = 1;
        return true;
    }
    else {
        setErrorMsg(input);
        val_data[1] = 0;
        return false;
    }
}


// Validation for EMAIL ID----------------------------------------------
function isemail(input) {
    document.getElementById('cemail').value = document.getElementById('cemail').value.trim();
    input = input.trim();

    let email1 = /^[^\s]+([a-zA-Z0-9._-])+\@([a-zA-Z0-9])+\.([a-zA-Z]{2,4})$/;
    let email2 = /^[^\s]([a-zA-Z0-9._-])+\@([a-zA-Z0-9])+\.([a-zA-Z]{2,4})+\.([a-zA-Z]{2,4})$/;
    let ans = input.localeCompare('NULL');


    if (input.match(email1) || input.match(email2) || input.length == 0 || ans === 0) {
        setSuccessMsg(cemail);
        val_data[2] = 1;
        return true;
    }
    else {
        setErrorMsg(cemail);
        val_data[2] = 0;
        return false;
    }
}

// Validation for ADDRESS-----------------------------------------------
function isAddress(input) {
    document.getElementById('caddress').value = document.getElementById('caddress').value.trim();
    input = input.trim();
    let ans = input.localeCompare('NULL');

    let addr = /^[A-Za-z0-9,.-/]+( [A-Za-z0-9,.-/]+)*$/;
    if (input.match(addr) || input.length == 0 || ans === 0) {
        setSuccessMsg(caddress);
        val_data[3] = 1;
        return true;
    }
    else {
        setErrorMsg(caddress);
        val_data[3] = 0;
        return false;
    }
}

// Validation for GENDER------------------------------------------------
function isOneChecked() {

    var chec = document.getElementsByTagName('input');
    for (var i = 0; i < chec.length; i++) {
        if (chec[i].type == 'radio' && chec[i].checked) {
            return true;
        }
    }
    return false;
}

// SUCCESS AND ERROR MESSAGE--------------------------------------------

function setSuccessMsg(input) {
    let formControl = input.parentElement;
    formControl.className = "form-control success";
}
function setErrorMsg(input) {
    let formControl = input.parentElement;
    formControl.className = "form-control  error";
}


function updateCustomer(value) {
    let flag = 1;

    if (!isOneChecked()) {
        flag = 0;
    }

    if (flag == 0) {
        alert("Please fill all the required fields!");
        return false;
    }

    for (let i = 0; i < val_data.length; i++) {
        if (val_data[i] == 0) {
            alert('Please correct the input fields!');
            flag = 0;
            return false;
        }
    }
    if (document.getElementById("cemail").value.length == 0)
        document.getElementById("cemail").value = "NULL";

    if (document.getElementById("caddress").value.length == 0)
        document.getElementById("caddress").value = "NULL";

    if (flag) {
        let cname = (document.getElementById("cname").value).toUpperCase();
        let ccontact = (document.getElementById("ccontact").value).toUpperCase();
        let cemail = (document.getElementById("cemail").value).toUpperCase();
        let caddress = (document.getElementById("caddress").value).toUpperCase();
        let cmale = document.getElementById("male").checked;
        let cfemale = document.getElementById("female").checked;
        let id = parseInt(value);
        let row, fg;

        if (cmale) {
            fg = 1;
        }
        else if (cfemale) {
            fg = 2;
        }
        else fg = 3;

        fg = parseInt(fg);

        row = { id, cname, ccontact, cemail, caddress, fg };

        fetch(`/update/customer/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(row)
        }).then((res) => res.json())
            .then(res => {
                if (res.success === true) {
                    alert("Customer updated!")
                    location.reload();
                }
                else {
                    alert("Error!")
                    location.reload();
                }
            })
            .catch((err) => console.log(err))
    }
}