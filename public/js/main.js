const operand = /[\+\*\/\-]/;
let formula = "";
let formulaList = [];
let textWidth;
let displayWidth;

// change theme
$("input[name=theme]").click((e) => {
  let themeList1 = $(".theme1");
  let themeList2 = $(".theme2");
  let themeList3 = $(".theme3");
  const target = e.target.value;
  if (themeList1.length === 21){
    changeTheme(themeList1, "theme1", target);
    themeList1 = $(".theme1");
  } else if (themeList2.length === 21){
    changeTheme(themeList2, "theme2", target);
    themeList2 = $(".theme2");
  } else if (themeList3.length === 21){
    changeTheme(themeList3, "theme3", target);
    themeList3 = $(".theme3");
  }
})



//get display p
const displayText = $("#display-text")[0];

// get button 
$("button").click(function() {
  const clickedButton = $(this).val();

  if (clickedButton === "delete"){
    if (typeof(formula) !== "number"){
      formula = formula.slice(0, -1);
      displayText.innerHTML = formula;
    }
    
  } else if (clickedButton === "reset"){
    formula = "";
    displayText.innerHTML = formula;
    $("#display-text").css("font-size", "32px");

  } else if (clickedButton === "=") {
    const validate = validFormula(formula);
    if (validate){
      formula = calculateResult();
      displayText.innerHTML = formula;
      displayProperly();
      if (textWidth <= displayWidth){
        $("#display-text").css("font-size", "32px");
      }
    } else {
      formula = "Wrong Input. Press Clear to restart";
      displayText.innerHTML = formula;
    }

  } else{
    formula += clickedButton ;
    displayText.innerHTML = formula;
  }
  displayProperly();
  
})

// Functions
const displayProperly = () => {
  textWidth = $("#display-text").width();
  displayWidth = $(".display").width() - 20;
  if (textWidth >= displayWidth) {
    $("#display-text").css("font-size", "16px");
  }
}

const validFormula = (f) => {
  f = f.toString();
  let amountOfnum = 0;
  let amountOfope = 0;
  amountOfope = f.split(/\d*\.?\d*/).length - 2;
  if (amountOfope <= 0 || formula === "") return false;
  f.split(operand).forEach(val => {
    if (val !== "") {amountOfnum += 1;}
  });


  if (amountOfnum - amountOfope === 1){
    return true;
  }
  formula = "";
  return false;

}

const calculateResult = () => {
  let result = 0;
  const operators = [];
  //check if formula is right  ['', '3', '6/2', '7*2'] (-3 + 6/2 + 7*2)
  formulaList = formula.split(/[+-]/);
  if (formulaList.length === 1){
    return calculate(formulaList[0]);
  }

  formula.split(/[0-9]\d*/).forEach(value => {
    if (value === "+"){
      operators.push(value);
    } 

    if (value === "-"){
      operators.push(value);
    }
  })
  
  operators.forEach((ope, index) => {
    const num1 = calculate(formulaList[index]);
    const num2 = calculate(formulaList[index + 1]);
    if (index === 0){
      result = calc(ope, num1, num2);
    } else {
      result = calc(ope, result, num2);
    }
  })
  return result;
}

const calculate = function(formulaString){
  let result = 0;
  const numsString = formulaString.split(/[\/\*]/);
  const nums = numsString.map(Number);
  const operators = [];

  if (numsString.length === 1) {
    return Number(numsString[0]);
  }

  formulaString.split("").forEach(value => {
    if (value === "\/"){
      operators.push(value);
    }
    if (value === "\*"){
      operators.push(value);
    }
  })

  operators.forEach((ope, index) => {
    if (index === 0) {
      result = calc(ope, nums[0], nums[1]);
    } else {
      result = calc(ope, result, nums[index + 1]);
    }
  })
  return result;
}

const calc = function(operator, val1, val2){
  if (operator === "+"){
    return val1 + val2;
  }else if (operator === "-"){
    return val1 - val2;
  }else if (operator === "/"){
    return val1 / val2;
  }else{
    return val1 * val2;
  }
}

const changeTheme = (current, theme,  target) => {
  current.each((index, element) => {
    $(element).addClass(target).removeClass(theme);
  })
}