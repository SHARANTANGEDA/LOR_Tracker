const getYearsForSelector = () => {
    let today = new Date();
    let yearArray=[];
    let max = today.getFullYear();
    for(let x=2008; x<=max;x++) {
        yearArray.push({ value: x, label: x });
    }
    return yearArray
};

export default getYearsForSelector