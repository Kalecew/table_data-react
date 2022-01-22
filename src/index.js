import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends Component{
  state = {
    products: []
  }

  componentDidMount(){
    //...получение данных
    this.setState({
      products: [
        {id:1, name:"Товар1", price:1500},
        {id:2, name:"Товар2", price:500},
        {id:3, name:"Товар3", price:2500},
        {id:4, name:"Товар4", price:3000},
        {id:5, name:"Товар5", price:3200},
        {id:6, name:"Товар6", price:3400},
        {id:7, name:"Товар7", price:4999},
        {id:8, name:"Товар8", price:2555},
        {id:9, name:"Товар9", price:2999},
        {id:10, name:"Товар10", price:100}
      ]
    }) 
  }

  create = () => {
    const products = this.state.products
    const last = products.length-1
    const newId = products[last].id + 1
    this.setState({products: [...products, {id: newId, name: "Новый", price: 0}]})
  }
  update = (targetId,e) => {
    this.setState({products: this.state.products.map(o => {
      if (o.id === targetId) {
        if (e.name === "name")
          return {id: o.id, name: e.value, price: o.price}
        else if (e.name === "price")
          return {id: o.id, name: o.name, price: e.value}
      } else {
        return o
      } 
    })})
  }    
  delete = (targetId) => this.setState({products: this.state.products.filter(({id}) => id !== targetId)})

  render(){
    const {products} = this.state
    return(
      <table className="products">
        <thead>
          <tr>
            <th className="products__th">#</th>
            <th className="products__th">Название</th>
            <th className="products__th">Цена</th>
            <th className="products__th"></th>
          </tr>
        </thead>
        <tbody>
          {products.map(({id,name,price})=>(
            <tr className="products__tr" key={id}>
              <td className="products__td"><input class="products__input" name="name" value={id} disabled/></td>
              <td className="products__td"><input class="products__input" name="name" value={name} onChange={(e)=>this.update(id,e.target)}/></td>
              <td className="products__td"><input class="products__input" name="price" value={price} onChange={(e)=>this.update(id,e.target)} type="number"/></td>
              <td className="products__td"><button className="products__btn" type="button" onClick={()=>this.delete(id)}>✗</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4"><button className="products__btn" type="button" onClick={()=>this.create()}>✅ Добавить</button></td>
          </tr>
        </tfoot>
      </table>
    )
  }
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

