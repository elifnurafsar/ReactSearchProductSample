import React, {useState, useEffect} from "react" 
import hourglass from '../../Images/hourglass.svg' 
import search from '../../Images/search.svg' 
import ProductCard from '../Cards/ProductCard' 
//import { GetRecent } from "../Service/ProductService" 

function Home(){
    const [error, setError] = useState(false) 
    const [isLoaded, setIsLoaded] = useState(true) 
    const [products, setProducts] = useState([]) 
    const [showProducts, setShowProducts] = useState(false) 

    const onSubmit = (e) => {
        e.preventDefault() 
    }
    
    useEffect(() => {
        //api call
        setInterval(() =>{
            setShowProducts(true)
        }, 5000)
        var list = [
            { id: 1, name: 'Shoulder Bag', category: 'bag', description:'pink medium shoulder bag'},
            { id: 2, name: 'Hand Bag', category: 'bag', description:'red small handbag'},
            { id: 3, name: 'Top', category: 'clothing', description:'diesel metallic top'},
            { id: 4, name: 'Trouser', category: 'clothing', description:'smart casual trouser'},
            { id: 5, name: 'Biker Boots', category: 'shoes', description:'Leather biker boots'}
        ];
        setProducts(list);
    }, [])

    const searchFor = (e) => {
        var str = e.target.value 
        console.log("***" + str)
        if(str.length === 0){
            //
        }

        else {
            //
        }
        
    }

    if(error){
        return (<div className="container">
                <button className='input_submit' onClick={(e) => onSubmit(e)}> ReFRESH </button>
                </div>) 
    }
    else if(!isLoaded){
        return (
            <div>
                <img width={200} height={200} src={hourglass} alt="fairy girl for waiting"/>
                <br></br>
                LOADING...
            </div>
        ) 
    }
    else{
        return(
            (showProducts === true ?
                <div key={0} style={{backgroundColor: '#ddfff9', height: "100vh", overflow: "auto", marginRight: "-20px", marginTop: "-30px", paddingRight: "20px"}}>
                    
                    <div key={1} style={{backgroundColor: '#ddfff9'}}>
                        <img key={2} style={{ width: "20px", height: "20px"}}  src={search} alt="Search image for search input box"/>
                        <input key={3} type="text" placeholder='Search by name' className='input_box' onChange={e => searchFor(e)} />
                    </div>

                    <h1 key={3} style={{color: 'orange', fontFamily: "Palatino"}}>NEW</h1>
                
                    <div key={4} className="container2" >
                        {products.map( _product => (
                            <ProductCard key={_product.id} name={_product.name} category={_product.category} description={_product.description} price={_product.price}></ProductCard>
                        ))}
                    </div>
                </div>
                :
                <div key={0} style={{backgroundColor: '#ddfff9', height: "auto", overflow:"hidden", marginTop: "-30px", paddingRight: "20px"}}>
                    <>
                        <div className="bg"></div>
                        <div className="bg bg2"></div>
                        <div className="bg bg3"></div>
                        <div className="content" style={{color: "#7224bf", fontWeight: "bold", fontFamily: "Bookman"}}> WELCOME TO YOUR FAVORITE SHOPPING CLUB!</div>
                    </>
                </div>
            )
        ) 
    }
}

export default Home 