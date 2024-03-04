const getFormttedDate = (currentDate:string) => {
    const date = new Date(currentDate);
    const formattedDate = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()}`;
    return formattedDate;
}

export {getFormttedDate}