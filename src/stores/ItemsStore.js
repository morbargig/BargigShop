import { observable, computed, action } from 'mobx'
import route from '../config/route'
import axios from 'axios'


export class ItemsStore {
    @observable Item = []
    // @observable numPeople
    @computed  get getAllItem  ()  { //automatically calculates the total reservations
      
        return null
    }
    @action allItems = async () => {
        let Items = await axios.get(`${route}getItems`)
        this.Item = Items
        // return Items
    }
        
    @action addItem = async (Item) => {     
      let  saveStatus = await axios.post(`${route}addNewItem`, Item)
        if (saveStatus.data === 'succes!') {
           return alert('added item successfully')
        } else {
           return  alert('there was a problem with add the item, please try again')
        }
    }
}