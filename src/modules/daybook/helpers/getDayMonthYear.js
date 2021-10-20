
const getDayMonthYear = (myDate) => {
    const dateFormat = require("dateformat")
    dateFormat.i18n = {
        dayNames: [
          "Dom",
          "Lun",
          "Mar",
          "Mi",
          "Jue",
          "Vie",
          "Sab",
          "Domingo",
          "Lunes",
          "Martes",
          "Miercoles",
          "Jueves",
          "Viernes",
          "Sabado",
        ],
    };
    const dateView = dateFormat(myDate, "dd-mm-yyyy-ddd").split("-")
    
    return {
        day : dateView[0],
        month : dateView[1],
        year : dateView[2] + dateView[3]
    }
}

export default getDayMonthYear