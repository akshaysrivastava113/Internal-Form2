import axios from "axios"
import { useState } from "react";

export default function Form() {
    const [recData, setRecData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [desc, setDesc] = useState("");
    function fetchSFData() {

        const postData = {
            name,
            email,
            desc
          };

        axios.post("http://localhost:3000/sfdata", postData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => {
            let receivedDataSize = resp.data.totalSize;
            let receivedData  = resp.data.records
            if(receivedDataSize > 0){
                setRecData(receivedData)
            }
            console.log(resp);
        })
        .catch((err) => {
            console.log('error', err);
        })
    }

    function postForm() {

    }
    return(
        <>
        <div className="flex flex-col">
            <input placeholder="Enter Name" className=" border-2 rounded-md text-center p-2 m-4" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Enter Email" className=" border-2 rounded-md text-center p-2 m-4" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Enter Description" className=" border-2 rounded-md text-center p-2 m-4" onChange={(e) => setDesc(e.target.value)}/>
        </div>
        <div>
            <button className="border-2 rounded-md p-2 m-2 bg-blue-400 w-32" onClick={fetchSFData}>Submit</button>
        </div>
        <div>
            {recData.length>0&&"Received Accounts:"}  {recData.length>0&&recData.map((recD) => {
                return `${recD.Name}, ${recD.Id}`
            })}
        </div>
        </>
    )
}