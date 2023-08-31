import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"



function Counter() {
    const [counter, setCounter] = useState(0);
    const [openTab, setOpenTab] = useState(true)
    const upward = () => {
        // setCounter(counter + 1)
        setCounter(prev => prev + 1)  // A BETTER WAY 
    }
    const downward = () => {
        // setCounter(counter - 1)
        setCounter(prev => prev - 1) // A BETTER WAY 
    }
    const resetCounter = () => {

    }
    const tabs = () => {
        // setOpenTab(!openTab)
        setOpenTab(prev => !prev)  // A BETTER WAY 
    }
    return (
        <div>
            <div style={{ float: 'right' }}>
                <AiOutlineClose onClick={tabs} />
                <button onClick={tabs}>X</button>
            </div>
            {openTab && <div>
                <div className="d-flex ">
                    <h3>  {counter} </h3>
                </div>
                <button className="btn btn-info" onClick={upward}> plus</button>
                <button className="btn btn-dark  " onClick={downward}>minus</button>
                <button className="btn btn-danger" >reset to 0</button>
            </div>
            }
        </div>
    )
}
export default Counter;