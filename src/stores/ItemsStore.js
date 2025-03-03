// @ts-nocheck
// import { observable, computed, action } from 'mobx'
import axios from 'axios'
import route from '../config/route'


export class ItemsStore {
    Item = []
    Catagories = []
    // @observable numPeople
    get AllCatagories() { //automatically calculates the total reservations

        return this.Catagories
    }

    getCatagories = (Catagories) => {
        Catagories.map(i => this.Catagories.push(i))
        console.log(this.Catagories, Catagories)

        // this.Catagories = Catagories
        // return Items
    }

    allItems = async () => {
        let Items = await axios.get(`${route()}getItems`)
        this.Item = Items
        // return Items
    }

    addItem = async (Item) => {
        let saveStatus = await axios.post(`${route()}addNewItem`, Item)
        if (saveStatus.data === 'succes!') {
            return alert('added item successfully')
        } else {
            return alert('there was a problem with add the item, please try again')
        }
    }
}