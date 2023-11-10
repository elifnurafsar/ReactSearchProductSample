import {useState, useEffect} from "react" 
import Card from 'react-bootstrap/Card' 
import ListGroup from 'react-bootstrap/ListGroup' 
import Button from 'react-bootstrap/Button'  
import {Modal} from 'react-bootstrap'  
import Form from 'react-bootstrap/Form' 
import ReactCardFlip from 'react-card-flip' 
import hourglass from '../../Images/hourglass.svg' 
import search from '../../Images/search.svg' 
import basket from '../../Images/add_to_bag.svg'
import flip from '../../Images/flip.svg' 
import stars from '../../Images/stars.jpg';
import sunshine from '../../Images/sunshine.jpg';
import orange_yellow from '../../Images/orange_yellow.jpg';
import { GetByCategoryOrName, GetAll } from "../Service/AutoPartService" 

function Shop(){
    const [error, setError] = useState(null) 
    const [isLoaded, setIsLoaded] = useState(true) 
    const [productList, setProductList] = useState([]) 
    const [showProducts, setShowProducts] = useState(false)  
    const [showModal, setShowModal] = useState(false)
    const [amount, setAmount] = useState(0)
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [myBag, setMyBag] = useState([])
    const [index, setIndex] = useState(-1)

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Trying Again...") 

        fetch("/AutoPart")
        .then(res => res.json())
        .then(
            (results) => {
                //data loaded
                setIsLoaded(true) 
                setProductList(results) 
            },
            (error) => {
                setIsLoaded(false)
                setError(true)
            }
        )

        let _myBag  = JSON.parse(localStorage.getItem("ShoppingBag")) || [] 
        if(_myBag.length === undefined){
            _myBag = [] 
        }
        setMyBag(_myBag) 
        var _index = new Set()
        setIndex(_index)
    } 

    useEffect(() => {
        
        setInterval(() =>{
            setShowProducts(true)
        }, 5000)

        GetAll()
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    setIsLoaded(true) 
                    setProductList(results) 
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )

        var _index = new Set()
        setIndex(_index)

        let _myBag  = JSON.parse(localStorage.getItem("ShoppingBag")) || [] 
        
        //control over size because other ways have not worked.
        if(_myBag.length === undefined){
            _myBag = [] 
        }
        setMyBag(_myBag) 

        _myBag.forEach(element => {
            console.log("inside my bag -> ", element.code, " ", element.amount) 
        }) 

    }, [])

    const searchFor = (e) => {
        var str = e.target.value 
        console.log(">>>", str)
        setProductList([]) 
        if(str.length === 0){
            fetch("/AutoPart")
                .then(res => res.json())
                .then(
                    (results) => {
                        //data loaded
                        setIsLoaded(true) 
                        setProductList(results) 
                    },
                    (error) => {
                        setIsLoaded(false)
                        setError(true)
                    }
                )
        }

        else {
            GetByCategoryOrName(str)
            .then(res => res.json())
            .then(
                (results) => {
                    //data loaded
                    setIsLoaded(true) 
                    setProductList(results) 
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
        }
        
    }

    const ChangeSide = (e, _code) => {
        e.preventDefault()
        if(index==_code)
            setIndex(-1) 
        else
            setIndex(_code) 
    }

    const addProductToCard = (_amount) => {
        let _myBag = [] 
        if(myBag === null || myBag === undefined || typeof myBag === "undefined"){
            _myBag = new Set()  
        }
        else{
            console.log('Your Current Basket: ', myBag) 
            _myBag = new Set(myBag)  
        }
        
        let b = false 
        _myBag.forEach(element => {
            if(element.code === code){
                b = true 
                element.amount = parseInt(element.amount) + parseInt(_amount) 
            }
        }) 

        if(!b){
            _myBag.add({code: code, amount:  parseInt(_amount)}) 
        }

        //neccessary to convert this set to array to iterate over
        const myBagArr = Array.from(_myBag) 
        localStorage.setItem("ShoppingBag", JSON.stringify(myBagArr)) 

        let i=0 
        _myBag.forEach(element => {
            console.log(i, " ", element.code, " --> ", element.amount) 
            i++ 
        }) 
        setMyBag(_myBag) 
    }
    
    function handleModal(e, _code, _name, accept){  
        e.preventDefault() 
        setName(_name) 
        setCode(_code) 
        if(showModal && accept){
            if (amount === null || amount === 0) {
                window.alert("Cancelled!") 
            } else {
                addProductToCard(amount) 
                let s = _name + " X " + amount + "  added to basket" 
                window.alert(s.toString()) 
            }
        }
        setShowModal(accept) 
        setAmount(0) 
    } 

    function setAmountFunct(num){
        setAmount(num.target.value) 
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
                
                    <div key={5} className="container2" >
                        {productList.map( _product => (
                            <div key={`${_product.code}-card`}>
                                <ReactCardFlip isFlipped={_product.code == index} flipDirection="vertical">
                                    <Card border="secondary" style={{ width: '18rem',  maxWidth: 'auto', height: '32rem',  maxHeight: 350, margin: 15, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                                        <Card.Header key={`${_product.code}-header`}>
                                                <Card.Img key={`${_product.code}-img`} style={{ width: "auto", maxHeight: "200px", padding: '5px', position: 'relative' }} variant="top" src={orange_yellow}/>
                                        </Card.Header>

                                        <Button key={`${_product.code}-button`} className='circleButton' onClick={(e) => handleModal(e, _product.code, _product.name, true)}>
                                                <img key={`${_product.code}-image`} width={30} height={30} src={basket} alt="add to basket" />
                                        </Button>
                                        
                                        <Card.Body key={`${_product.code}-card_body`}>
                                            <Card.Title key={`${_product.code}-product_name`} style={{color: '#191970', fontWeight: 'bold'}}>{_product.name}</Card.Title>
                                            <ListGroup key={`${_product.code}-properties_list`} variant="flush">
                                                <ListGroup.Item key={`${_product.code}-brand`} style={{color: '#87ceeb'}}>{_product.brand}</ListGroup.Item>
                                                <ListGroup.Item key={`${_product.code}-category`} style={{color: '#87ceeb'}}>{_product.category}</ListGroup.Item>
                                                <ListGroup.Item key={`${_product.code}-price`} style={{color: '#87ceeb'}}>{_product.price}</ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                        <Card.Footer style={{display: "flex", alignItems: "self-end"}}>
                                            <Button key={`${_product.code}-bottom_button`} className="flipButton" onClick={(e) => ChangeSide(e, _product.code)}>
                                                <img key={`${_product.code}-show_details`} width={20} height={20} style={{position: "absolute", bottom: "1px", right: "1px"}} src={flip} alt="details" />
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                
                                    <Card key={`${_product.code}-back`} border="secondary" style={{ width: '18rem',  maxWidth: 'auto', height: '32rem',  maxHeight: 350, margin: 15, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                                        <Card.Header key={`${_product.code}-header_back`}>
                                            <Card.Title key={`${_product.code}-name_back`} style={{ color: 'skyblue', fontWeight: 'bold' }}><strong>{_product.name}</strong></Card.Title>
                                        </Card.Header>
                                        <Card.Body key={`${_product.code}-body_back`} style={{ position: 'relative', padding: '10px' }}>
                                            <ListGroup key={`${_product.code}-list_back`} variant="flush">
                                                <ListGroup.Item key={`${_product.code}-list_element_back`} style={{color: '#e6e6fa'}}>
                                                    {_product.description}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                        <Card.Footer style={{display: "flex", alignItems: "self-end"}}>
                                            <Button key={`${_product.code}-bottom_button_back`} className="flipButton" onClick={(e) => ChangeSide(e, _product.code)}>
                                                <img key={`${_product.code}-look_back`} width={20} height={20} style={{position: "absolute", bottom: "1px", right: "1px"}} src={flip} alt="details" />
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </ReactCardFlip>
                            </div>
                        ))}
                        <Modal key={14} className="modalClass" show={showModal} onHide={(e) => handleModal(e, code, name, false)}>
                            <Modal.Header key={15} style={{color: "#000080", fontWeight:"bolder"}}>Add To Basket</Modal.Header>
                            <Modal.Body>
                                <Form key={16} style={{color: "#000080"}}>
                                    <Form.Group key={17} className="mb-3">
                                        <Form.Label key={18}>Selected {name}: Please enter the amount:</Form.Label>
                                        <Form.Control key={19}
                                            className="input_box"
                                            type="number"
                                            placeholder="0"
                                            onChange={(num) => setAmountFunct(num)}
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer key={20}>
                                <Button key={21} className="modalButtonCancel" onClick={(e) => handleModal(e, code, name, false)}>Close</Button>
                                <Button key={22} className="modalButtonOk" onClick={(e) => handleModal(e, code, name, true)}>Add</Button>
                            </Modal.Footer>
                        </Modal>
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

export default Shop 