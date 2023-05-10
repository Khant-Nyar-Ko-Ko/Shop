
import Card from "../components/Card";
import Spinner from "../components/spinner/Spinner";
import { useStateContext } from "../context/StateContext"



const Products = () => {
    const {state: {products, cart}} = useStateContext();
  console.log(cart);

    return (
      <div className=" flex flex-wrap gap-5 my-10 justify-center">
        {products.length > 0 ?  products?.map((product) => 
          <Card key={product.id} product={product}/>
        ): <Spinner/>}
      </div>
    );
  }

  


export default Products
