// @ts-nocheck
// import { observable, computed, action } from 'mobx'
import route from '../config/route'
import axios from 'axios'


export class ItemsStore {
    Item = []
    Catgories = []
    // @observable numPeople
    get AllCatgories() { //automatically calculates the total reservations

        return this.Catgories
    }

    getCatgories = (Catgories) => {
        Catgories.map(i => this.Catgories.push(i))
        console.log(this.Catgories, Catgories)

        // this.Catgories = Catgories
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