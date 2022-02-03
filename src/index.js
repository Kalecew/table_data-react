import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends Component{
  constructor(props){
    super(props)
    this. state = {
      products: [],
      selected: null
    }
    this.name = React.createRef()
    this.description = React.createRef()
    this.price = React.createRef()
    this.submitBtn = React.createRef()
  }  

  componentDidMount(){
    //...получение данных из БД
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

  clearRefs = () => {
    this.name.current.value = null
    this.description.current.value = null
    this.price.current.value = 0
  }

  create = (e) => {
    e.preventDefault()
    const name = this.name.current.value
    const description = this.description.current.value
    const price = this.price.current.value
    this.clearRefs()
    const products = this.state.products
    const last = products.length - 1
    const newId = products[last].id + 1
    this.setState({products: [...products, {id: newId, name, description, price}]})
  }

  update = (targetId,e) => {
    const newProducts = Array.from(this.state.products)
    newProducts.find(item => item.id === targetId)[e.name] = e.value
    this.setState({products: newProducts})
  }   

  delete = (targetId) => this.setState({products: this.state.products.filter(({id}) => id !== targetId)})

  selectRow = (e,id) => {
    e.stopPropagation()
    this.setState({selected: id})
  }

  clearSelectRow = () => this.setState({selected: null})

  submit = () => {
    const name = this.name.current.value
    const description = this.description.current.value
    const price = this.price.current.value == 0 ? null : this.price.current.value
    // console.log(price, this.price.current.value)
    if (name && description && price) this.submitBtn.current.click()
  }

  clickApp = () => {
    this.clearSelectRow()
    this.submit()
  }

  handleKeyPress = (e,id) => {
  if(e.target.dataset.tr && e.key === 'Delete'){
    this.delete(this.state.selected)
  }
}
  

  render(){
    const {products} = this.state
    return(
      <div className="app" onClick={() => this.clickApp()}>
        <table className="products">
          <thead>
            <tr>
              <th className="products__th">◢</th>
              <th className="products__th">Код</th>
              <th className="products__th">Название</th>
              <th className="products__th">Описание</th>
              <th className="products__th">Цена</th>
              <th className="products__th"></th>
            </tr>
          </thead>
          <tbody>
            {products.map(({id,name,description,price})=>(
              <tr className={
                this.state.selected === id ? 
                  "products__tr products__tr--highlight" :
                  "products__tr"
                }
                key={id}
                tabIndex="0"
                data-tr
                onKeyDown={(e) => this.handleKeyPress(e,id)}
              >
                <td className={
                  this.state.selected === id ? 
                    "products__td products__td--first products__td--highlight" :
                    "products__td products__td--first"
                  } 
                  onClick={(e) => this.selectRow(e,id)}
                ></td>
                <td className="products__td"><input className="products__input" name="id" value={id} disabled/></td>
                <td className="products__td"><input className="products__input" name="name" value={name} onChange={(e)=>this.update(id,e.target)}/></td>
                <td className="products__td"><input className="products__input" name="description" value={description} onChange={(e)=>this.update(id,e.target)}/></td>
                <td className="products__td"><input className="products__input" name="price" value={price} onChange={(e)=>this.update(id,e.target)} type="number"/></td>
                <td className="products__td"></td>
              </tr>
            ))}
            <tr className="products__tr product__tr--last">
              <td className="products__td products__td--first">❊︎</td>
              <td className="products__td"><input className="products__input" form="create" defaultValue="(№)" name="id" disabled/></td>
              <td className="products__td"><input className="products__input" form="create" defaultValue="" name="name" ref={this.name}/></td>
              <td className="products__td"><input className="products__input" form="create" defaultValue="" name="description" ref={this.description}/></td>
              <td className="products__td"><input className="products__input" form="create" defaultValue="0" name="price" ref={this.price} type="number"/></td>
              <td className="products__td"></td>
            </tr>
          </tbody>
        </table>
        <form id="create" onSubmit={(e) => this.create(e)}/>
        <button className="products__btn" form="create" type="submit" ref={this.submitBtn}></button>
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

