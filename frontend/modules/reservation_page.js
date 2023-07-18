import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

try {
  let reservation = await fetch(config.backendEndpoint + "/reservations/");
  return await reservation.json();
} catch (error) {
  return null;
}
  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  // console.log(reservations);
  //Conditionally render the no-reservation-banner and reservation-table-parent
  let noReservation = document.getElementById("no-reservation-banner");
  let reservationTable = document.getElementById("reservation-table-parent");
  if(reservations.length>0){
    noReservation.style.display = "none";
    reservationTable.style.display = "block";
  }
  else{
    noReservation.style.display = "block";
    reservationTable.style.display = "none";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  const options = { year: "numeric", day: "numeric", month: "long", hour: "numeric", minute: "numeric", second: "numeric", hour12: true, };
    // console.log(currentDate.toLocaleDateString('de-DE', options));
 let reservation_Table = document.getElementById("reservation-table");
 for(let i=0;i<reservations.length;i++){
  let str = new Date(reservations[i].time).toLocaleString("en-IN",options);
  let tr = document.createElement("tr");
  tr.innerHTML = `<td scope="col">${reservations[i].id}</td>
  <td scope="col">${reservations[i].name}</td>
  <td scope="col">${reservations[i].adventureName}</td>
  <td scope="col">${reservations[i].person}</td>
  <td scope="col">${new Date(reservations[i].date).toLocaleDateString("en-IN")}</td>
  <td scope="col">${reservations[i].price}</td>
  <td scope="col">${str.split("at")[0].trim()},${str.split("at")[1]}</td>
  <td scope="col"><div class = "reservation-visit-button" id="${reservations[i].id}"><a href="../detail/?adventure=${reservations[i].adventure}">Visit Adventure</a></div></td>`;
  reservation_Table.append(tr);
 }

}

export { fetchReservations, addReservationToTable };
