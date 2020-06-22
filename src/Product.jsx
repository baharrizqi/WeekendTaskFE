import React from "react"
import Axios from "axios";

const API_URL = `http://localhost:8080`

class Product extends React.Component{
    state={
        selectedFile: null,
        formProduct:{
            productName:"",
            price:0,
            imageProduct:"",
        },
    }

    inputHandler = (event, key) => {
        const { value } = event.target;

        this.setState({
            formProduct: {
                ...this.state.formProduct,
                [key]: value,
            }
        })

    }

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] })
    }

    registerHandler = () => {
        let formData = new FormData();

        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        )
        formData.append("userData", JSON.stringify(this.state.formProduct))

        Axios.post(`${API_URL}/products/createProduct`, formData)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log("ERROR")
            console.log(err)
        })
        console.log(this.state.formProduct)
    }

    render(){
        return(
            <div>
                <h3>Form Register Product</h3>

                <h5>Nama Produk</h5>
                <input type="text" placeholder="Nama Produk" onChange={(e)=> this.inputHandler(e,"productName")}/>
                <h5>Harga Produk</h5>
                <input type="text" placeholder="Harga Produk" onChange={(e)=> this.inputHandler(e,"price")}/>
                <h5>File Gambar Produk</h5>
                <input type="file" onChange={this.fileChangeHandler}/>
                <input type="button" value="Upload" />
                <input type="button" value="Register" onClick={this.registerHandler}/>
            </div>
        )
    }
}

export default Product