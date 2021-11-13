// @ts-nocheck
// import { observable, computed, action } from 'mobx'
// import { Reservation } from './ReservationStore'
// import { observer, inject } from 'mobx-react'
// @inject("GeneralStore")

export class UsersStore {
    users = []

    get getAllItem() { //automatically calculates the total reservations

        return null
    }
    // @observable numTables = 10
    // @computed get totalReservations() { //automatically calculates the total reservations
    //     return this.reservations.length
    // }
    // @computed get openTables() { //automatically caluclates the number of tables avalible, only when the state is affected
    //     if (this.numTables >= 1) {
    //         let counter = 0
    //         this.reservations.forEach(r => r.seated ? counter++ : null)
    //         return (this.numTables - counter)
    //     }
    // }
    // @computed get restPopulation() {

    //     let numReservation = 0
    //     let reservations = this.reservations.filter(r => r.completed === false && r.seated === true)
    //     reservations.forEach(r => numReservation += parseInt(r.numPeople))
    //     return numReservation
    //     // calculate the number of people in the restaurant now
    //     // (e.g. total number of people who are seated, but their reservation is not complete)
    // }
    // @computed get completedTables() {
    //     let num = 0
    //     this.reservations.map(r => r.completed === true ? num += 1 : null)
    //     return num
    // }
    addUer = (user) => {
        this.users.push(user)
    }
    // @action seatRes = (id) => {
    //     let reservation = this.reservations.find(r => r.id === id)
    //     reservation.seated = true
    //     //find the reservation and change its seated value to true
    // }
    // @action completeRes = (id) => {
    //     let reservation = this.reservations.find(r => r.id === id)
    //     reservation.completed = true
    //     console.log(reservation)
    //     //find the reservation and mark it as completed
    //     //after you write this function, add some conditional rendering on compelted tables
    //     //e.g. strike through our a different color - this will happen on your react, not here.
    // }
}