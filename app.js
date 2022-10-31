const actualPassword = document.querySelector(".actual-password")
const passwordLengthValue = document.querySelector(".value")
const progressBar = document.querySelector(".progress-bar")

const uppercaseCheckbox = document.querySelector("#uppercase")
const lowercaseCheckbox = document.querySelector("#lowercase")
const numbersCheckbox = document.querySelector("#numbers")
const symbolsCheckbox = document.querySelector("#symbols")

const passwordStrength = document.querySelector(".strength-status")
const msgEl = document.querySelector(".message")
const passwordCopied = document.querySelector(".copied-to-clipboard")

const btnCopy = document.querySelector(".bi-clipboard2")
const btnGenerate = document.querySelector(".btn-generate")

const strengthSignalBarOne = document.querySelector(".bar-one")
const strengthSignalBarTwo = document.querySelector(".bar-two")
const passwordStrengthStatus = document.querySelector(".strength-status")

const strengthSignalBarThree = document.querySelector(".bar-three")
const strengthSignalBarFour = document.querySelector(".bar-four")
const passwordStrengthContainer = document.querySelector(".strength-value")


btnGenerate.addEventListener("click", generatePassword)
btnCopy.addEventListener("click", copyToClipboard)

//*************!Generator Functions!**************//


const getFunctions = {
    lower: getRandomLowercase,
    upper: getRandomUppercase,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

//**********?This will run on copy to clipboard**********
function copyToClipboard() {
   navigator.clipboard.writeText(actualPassword.textContent)
   let copyMsg = "Copied to clipboard!!!"
   let holdTypesCount = []
   passwordCopied.textContent =  copyMsg

   setTimeout(()=> {
    passwordCopied.textContent = "";
   }, 2000);
}


//?this runs when the "generate" button is clicked
function generatePassword() {
    const lowerCase = lowercaseCheckbox.checked
    const upperCase = uppercaseCheckbox.checked
    const numbers = numbersCheckbox.checked
    const symbols = symbolsCheckbox.checked

    actualPassword.textContent =  generatedPass(
    lowerCase, 
    upperCase, 
    numbers, 
    symbols,
    )

}


//? this runs inside the "generatePassword() function"
function generatedPass(lower, upper, number, symbol) {
   let generatedPassword = ""

   const typesCount = lower + upper + number + symbol
   console.log('typesCount', typesCount)

   const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]) // make these objects with true/ false values if they are checked or not

   //console.log('typesArr', typesArr)
    if (typesCount === 0) {
        generatedPassword = "";
        progressBar.style.width = "0%"
        typesCountEqualToZero()
        passwordStrengthContainer.style.display = "none"
    } 

    else if (typesCount === 1) {
      for (let i = 0; i < 5; i += typesCount) {
            typesArr.forEach(type => {
                let functionName = Object.keys(type) [0]

               generatedPassword += getFunctions[functionName]()
           })
        }
        msgEl.textContent = "";
        passwordStrengthStatus.textContent = "TOO WEAK"
        passwordStrengthContainer.style.display = "flex"
    }  else if (typesCount === 2) {
        for (let i = 0; i < 10; i += typesCount) {
            typesArr.forEach(type => {
                const functionName = Object.keys(type) [0]

                generatedPassword += getFunctions[functionName]()
            })
        }
        msgEl.textContent = "";
        passwordStrengthStatus.textContent = "WEAK"
        passwordStrengthContainer.style.display = "flex"
    }  else if (typesCount === 3) {
        for (let i = 0; i < 15; i += typesCount) {
            typesArr.forEach(type => {
                const functionName = Object.keys(type) [0]

                generatedPassword += getFunctions[functionName]()
            })
        } 
        msgEl.textContent = "";
        passwordStrengthStatus.textContent = "MODERATE"
        passwordStrengthContainer.style.display = "flex"
    } else if (typesCount === 4) {
        for (let i = 0; i < 20; i += typesCount) {
            typesArr.forEach(type => {
                const functionName = Object.keys(type) [0]

                generatedPassword += getFunctions[functionName]()
            })
        }
        msgEl.textContent = "";
        passwordStrengthStatus.textContent = "STRONG"
        passwordStrengthContainer.style.display = "flex"
    } 

    let tobeChangedToArray = generatedPassword
    let toSplit = tobeChangedToArray.split("")
     
    if (toSplit.length === 5) {
    progressBar.style.width = "25%"
    } 
    
    else if (toSplit.length === 10) {
        progressBar.style.width = "50%"
    }

    else if (toSplit.length === 15) {
        progressBar.style.width = "75%"
    }  
    
    else if (toSplit.length === 20) {
        progressBar.style.width = "100%"
    }

    else if (toSplit.length === 0) {
        passwordCopied.textContent = ""
    }


    //**********?changing strength bars depending on password length*********
     if (generatedPassword.length === 5) {
        strengthSignalBarOne.id = "color-bg"
     }  
     
     else if (generatedPassword.length === 10) {
        strengthSignalBarOne.id = "color-bg"
        strengthSignalBarTwo.id = "color-bg"
     } 
     
     else if (generatedPassword.length === 15) {
        strengthSignalBarOne.id = "color-bg"
        strengthSignalBarTwo.id = "color-bg"
        strengthSignalBarThree.id = "color-bg"
     } 
     
     else if (generatedPassword.length === 20) {
        strengthSignalBarOne.id = "color-bg"
        strengthSignalBarTwo.id = "color-bg"
        strengthSignalBarThree.id = "color-bg"
        strengthSignalBarFour.id = "color-bg"
     }


     //**************?Decreasng Strength Bars With Decreasing Password Strength?***************//

     if (typesCount === 0) {
        strengthSignalBarOne.id = "color-bg2"
        strengthSignalBarTwo.id = "colorbg2"
        strengthSignalBarThree.id = "colorbg2"
        strengthSignalBarFour.id = "colorbg2"
     }

     else if (typesCount === 1) {
        strengthSignalBarTwo.id = "colorbg2"
        strengthSignalBarThree.id = "colorbg2"
        strengthSignalBarFour.id = "colorbg2"
     }
     
     else if (typesCount === 2) {
        strengthSignalBarThree.id = "colorbg2"
        strengthSignalBarFour.id = "colorbg2"
     } 
     
     else if (typesCount === 3) {
        strengthSignalBarFour.id = "colorbg2"
     }

    //**********************?if no password is generated, do not show "copied to clipboard" message********************

    passwordLengthValue.textContent = generatedPassword.length
    

   const finalPassword = generatedPassword.slice(0, 20)

   return finalPassword
}



function getRandomLowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97) //?97 is where it should start(thats the first character 'a')
}

function getRandomUppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    let symbols = '@#(){}[:;"?/,]*$%!`~^-=>.'
    return symbols[Math.floor(Math.random() * symbols.length)] 
} 

function typesCountEqualToZero() {
    let noPassword = null;
    actualPassword.textContent = noPassword
    msgEl.textContent = "Please atleast check one box!!"
}
 







































