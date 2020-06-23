import React from "react"
import Axios from "axios";

const API_URL = `http://localhost:8080`

class Product extends React.Component {
    state = {
        selectedFile: null,
        formProduct: {
            productName: "",
            price: 0,
            imageProduct: "",
        },
        editProduct:{
            id: "",
            productName:"",
            price:0,
            imageProduct:"",
        },
        productData: [],
        kondisiEdit: false,
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
    editHandler = (event, key) => {
        const { value } = event.target;

        this.setState({
            editProduct: {
                ...this.state.editProduct,
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
        formData.append("productData", JSON.stringify(this.state.formProduct))

        Axios.post(`${API_URL}/products/createProduct`, formData)
            .then((res) => {
                console.log(res.data)
                this.readProduct()
            })
            .catch((err) => {
                console.log("ERROR")
                console.log(err)
            })
        console.log(this.state.formProduct)
    }

    readProduct = () => {
        Axios.get(`${API_URL}/products/readProduct`)
            .then((res) => {
                console.log(res.data)
                this.setState({ productData: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.readProduct()
    }
    renderProduct = () => {
        return this.state.productData.map((val, idx) => {
            return (
                <tr>
                    <td>{idx + 1}</td>
                    <td>{val.productName}</td>
                    <td>{val.price}</td>
                    <td>{val.imageProduct}</td>
                    {/* <td><input type="button" value="Edit" onClick={() => this.editBtnHandler(idx)}/></td> */}
                    <td><input type="button" value="Edit" onClick={() => this.editBtnHandler(val.id)}/></td>
                    <td><input type="button" value="Delete" onClick={()=> this.deleteProduct(val.id)}/></td>
                </tr>
            )
        })
    }

    deleteProduct = (id) => {
        Axios.delete(`${API_URL}/products/delete/${id}`)
        .then((res)=> {
            console.log(res.data)
            this.readProduct()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    editProduct = () => {
        alert("masuk")
        let formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        )
        formData.append(
            "editData",
            JSON.stringify(this.state.editProduct)
        )
        // JSON.stringify(this.state.editProduct)
        Axios.put(`${API_URL}/products/editProduct/${this.state.editProduct.id}`, formData)
            .then((res) => {
                console.log(res.data);
                alert("Data sudah Diedit")
                this.readProduct()
                this.setState({kondisiEdit:false})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // editBtnHandler = (idx) => {
    //     this.setState({
    //         editProduct: {
    //             ...this.state.productData[idx],
    //         },
    //         kondisiEdit:true,
    //     });
    // };

    editBtnHandler = (id) => {
        this.setState({
            kondisiEdit: true,
        })
        Axios.get(`${API_URL}/products/readProduct/${id}`)
            .then((res) => {
                this.setState({editProduct:res.data})
                console.log(this.state.editProduct)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log(this.state.editProduct.id)
    }
    testing = () => {
        console.log(this.state.editProduct.id)
    }
    inputFormHandler = (e, key, form) => {
        const { value } = e.target
        this.setState({
            [form]: {
                ...this.state[form],
                [key]: value
            }
        })
    }

    render() {
        return (
            <div>
                <h3>Form Register Product</h3>

                <h5>Nama Produk</h5>
                <input type="text" placeholder="Nama Produk" onChange={(e) => this.inputHandler(e, "productName")} />
                <h5>Harga Produk</h5>
                <input type="text" placeholder="Harga Produk" onChange={(e) => this.inputHandler(e, "price")} />
                <h5>File Gambar Produk</h5>
                <input type="file" onChange={this.fileChangeHandler} />
                {/* <input type="button" value="Upload" /> */}
                <input type="button" value="Register" onClick={this.registerHandler} />

                <br /><br /><br />
                <table class="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Harga</th>
                            <th>Gambar</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProduct()}
                    </tbody>
                </table>
                {
                    this.state.kondisiEdit == true ? (
                        <>
                        <input type="text" placeholder="Nama Produk" value={this.state.editProduct.productName} onChange={(e) =>this.inputFormHandler(e,"productName","editProduct")}/>
                        <input type="text" placeholder="Harga Produk" value={this.state.editProduct.price} onChange={(e)=> this.inputFormHandler(e,"price","editProduct")}/>
                        <img style={{width:"100px"}} src={this.state.editProduct.imageProduct} alt=""/>
                        <input type="file" onChange={this.fileChangeHandler} />
                        <input type="button" value="Save" onClick={this.editProduct}/>
                        </>
                    ): null
                }
            </div>
        )
    }
}

export default Product