//VALIDATION LOGIC FOR USER NUMBER
const numberValidation: Function =(number: string) => {
    const firstTwo:string = number.substring(0,2);
    if(firstTwo === '01'){
        if(number.length == 11){
            return 1;
        }
    }
    else{ 
        return 0;
    }
}

export {numberValidation}