import { useState } from "react";
import Navigation from "./Navigation/Nav";
import Products from "./products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar"
import products from "./db/data";
import Card from "./components/Card";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [query,setQuery] = useState("");

  const handleInputChange = (event)=>{
    setQuery(event.target.value);
  };

  const filteredItems = products.filter((product) => product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())!== 
  -1
  );
  const handleChange = (event) =>{ setSelectedCategory(event.target.value);

  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products,query,selected){
    let filteredProducts = products;

    if(query){
      filteredProducts = filteredItems;
    }

    if(selected){
      filteredProducts = filteredProducts.filter(({
        category, color, company, newPrice, title 
      }) => category === selected || color === selected || company === selected || newPrice.toString() === selected || title.toLocaleLowerCase() === selected );
    }
    return filteredProducts.map(({img, title, star, reviews,newPrice, prevPrice}) => (
      <Card 
       key={Math.random()}
       img={img}
       title={title}
       star={star}
       reviews={reviews}
       newPrice={newPrice}
       prevPrice={prevPrice}

      />
    )
    );
  }

 const result =  filteredData(products,query,selectedCategory)



  
  return (
  <>
  <Sidebar handleChange={handleChange} />
  <Navigation query ={query} handleInputChange={handleInputChange}/>
  <Recommended handleClick={handleClick}/>
  <Products result={result}/>
  
  </> 
  );
}

export default App;
