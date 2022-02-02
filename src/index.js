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
        {id:1, name:"Товар1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, excepturi.", price:1500},
        {id:2, name:"Товар2", description: "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Autem, veritatis?", price:500},
        {id:3, name:"Товар3", description: "Lorem ipsum dolor sit amet consectetur adipisicing, elit. Dolore, nulla.", price:2500},
        {id:4, name:"Товар4", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, eligendi.", price:3000},
        {id:5, name:"Товар5", description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, asperiores.", price:3200},
        {id:6, name:"Товар6", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, perferendis!", price:3400},
        {id:7, name:"Товар7", description: "Lorem ipsum, dolor sit amet consectetur, adipisicing elit. Dignissimos, ad.", price:4999},
        {id:8, name:"Товар8", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, cum?", price:2555},
        {id:9, name:"Товар9", description: "Lorem ipsum dolor, sit amet, consectetur adipisicing elit. Quaerat, asperiores!", price:2999},
        {id:10, name:"Товар10", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, voluptatum.", price:100}
      ]
    }) 
  }

  create = () => {
    const products = this.state.products
    const last = products.length-1
    const newId = products[last].id + 1
    this.setState({products: [...products, {id: newId, name: "", description: "", price: 0}]})
  }

  update = (targetId,e) => {
    const newProducts = Array.from(this.state.products)
    newProducts.find(item => item.id === targetId)[e.name] = e.value
    this.setState({products: newProducts})
  }   

  delete = (targetId) => this.setState({products: this.state.products.filter(({id}) => id !== targetId)})

  render(){
    const {products} = this.state
    return(
      <div>
        <table className="products">
          <thead>
            <tr>
              <th className="products__th">#</th>
              <th className="products__th">Название</th>
              <th className="products__th">Описание</th>
              <th className="products__th">Цена</th>
              <th className="products__th"></th>
            </tr>
          </thead>
          <tbody>
            {products.map(({id,name,description,price})=>(
              <tr className="products__tr" key={id}>
                <td className="products__td"><input class="products__input" name="id" value={id} disabled/></td>
                <td className="products__td"><input class="products__input" name="name" value={name} onChange={(e)=>this.update(id,e.target)}/></td>
                <td className="products__td"><input class="products__input" name="description" value={description} onChange={(e)=>this.update(id,e.target)}/></td>
                <td className="products__td"><input class="products__input" name="price" value={price} onChange={(e)=>this.update(id,e.target)} type="number"/></td>
                <td className="products__td"><button className="products__btn" type="button" onClick={()=>this.delete(id)}>✗</button></td>
              </tr>
            ))}
            <tr className="products__tr">
              <td className="products__td"><input class="products__input" name="id" value="" disabled/></td>
              <td className="products__td"><input class="products__input" name="name" value="" onChange={(e)=>this.update(null,e.target)}/></td>
              <td className="products__td"><input class="products__input" name="description" value="" onChange={(e)=>this.update(null,e.target)}/></td>
              <td className="products__td"><input class="products__input" name="price" value="" onChange={(e)=>this.update(null,e.target)} type="number"/></td>
              <td className="products__td"></td>
            </tr>
          </tbody>
        </table>
        <hr/>
        <button className="products__btn" type="button" onClick={()=>this.create()}>✅ Добавить</button>
      </div>
    )
  }
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

