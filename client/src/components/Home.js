import React, {useEffect, useState} from 'react';
import {Button, Input} from "@mui/material";
import Store from "../store";
import axios from "axios";
import {BASE_URL, Operation} from "../store/Enums";
import "../App.css"

const Home = () => {

    const currentUser = Store.getState().user;

    const [items, setItems] = useState(null);
    const [searchKey, setSearchKey] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [editID, setEditID] = useState(null);

    const [formData, setFormData] = useState({
        accountId: '',
        username: currentUser?.username,
        number: '',
        name: '',
        amount: ''
    });
    const [formUpdateData, setFormUpdateData] = useState({
        accountId: '',
        username: currentUser?.username,
        number: '',
        name: '',
        amount: ''
    });
    const [formTransaction, setFormTransaction] = useState({
        operationType: '',
        fromAccountNumber: '',
        amount: '',
        toAccountNumber: ""
    });

    useEffect(() => {
        getAccountsByUsername();
    }, []);

    function getAccountsByUsername() {
        return axios.post(
            BASE_URL + '/account/getAllAccounts',
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
            setItems(res.data)
        }).catch(err => console.log(err));
    }

    function save(e) {
        e.preventDefault();

        if(formData.number==='' ||
            formData.name==='' ||
            formData.amount=== ''){
            alert("Alanların hepsi dolu olmalı")
            return ;
        }
        return axios.post(
            BASE_URL + '/account/save',
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
            window.location.reload();
        }).catch(err => console.log(err));
    }

    function deleteAccountByNumber(e) {
        e.preventDefault();
        return axios.delete(
            BASE_URL + `/account/deleteAccountByNumber/${deleteItem}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
            window.location.reload();
        }).catch(err => alert("Transaction Kaydı Olan Account Silinemez"));
    }

    function updateAccount(e) {
        e.preventDefault();
        formUpdateData.accountId = editID;

        if(formUpdateData.number ==='' || formUpdateData.name===''){
            alert("AccountNumber ve AccountName Boş olmamalı");
            return;
        }

        if(items.filter(i => i.number === formUpdateData.number || i.name === formUpdateData.name).length > 0) {
            alert("AccountNumber ve AccountName Öncekilerden farklı olmalı");
            return;
        }

        return axios.put(
            BASE_URL + '/account/updateAccount',
            formUpdateData,
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
            window.location.reload();
        }).catch(err => console.log(err));
    }

    const handleInsert = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        const {name, value} = e.target;
        setFormUpdateData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formUpdateData)
    };

    const handleTransaction = (e) => {
        const {name, value} = e.target;
        setFormTransaction(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function beginTransaction(e) {
        e.preventDefault()

        if(formTransaction.operationType===''){
            alert("Operasyon Tipi Seçiniz!")
            return ;
        }else if(formTransaction.operationType !== "WITHDRAWAL" &&
            formTransaction.operationType !== "DEPOSIT" &&
            formTransaction.toAccountNumber===''){
            alert("Alıcı Bilgisini Seçiniz!")
            return ;
        }

        if(formTransaction.fromAccountNumber===''){
            alert("Gönderici Bilgisini Seçiniz!")
            return ;
        }

        if(formTransaction.amount===''){
            alert("Ücret Bilgisi Girilmedi!")
            return ;
        }

        if(formTransaction.fromAccountNumber===formTransaction.toAccountNumber){
            alert("Aynı Accountlar ile Transaction Yapılamaz!")
            return ;
        }

        return axios.post(
            BASE_URL + '/transaction/save',
            formTransaction,
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
            window.location.reload();
        }).catch(err => console.log(err));
    }

    return (
        <div className="example">
            <Input type="text" placeholder="SearchByName..."
                   onChange={(e) => setSearchKey(e.target.value.toLowerCase())}/>
            <table id="table1">
                <thead>
                <tr>
                    <th></th>
                    <th>number</th>
                    <th>name</th>
                    <th>balance</th>
                    <th>createdAt</th>
                    <th>updatedAt</th>
                    <th>ADD & DELETE</th>
                    <th>UPDATE</th>
                </tr>
                </thead>
                <tbody>
                {items?.filter(r => r.username.includes(currentUser?.username))
                    .filter(i => !searchKey || i.name.includes(searchKey)).map((item, index) => {
                        return (editID === item.accountId ?
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            type="number"
                                            name="number"
                                            value={formUpdateData.number}
                                            onChange={handleUpdate}
                                            placeholder="Number"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formUpdateData.name}
                                            onChange={handleUpdate}
                                            placeholder="Name"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formUpdateData.amount}
                                            onChange={handleUpdate}
                                            placeholder="Balance"
                                        />
                                    </td>
                                    {item.createdAt ?
                                        <td>{item.createdAt[2].length === 1 ? item.createdAt[2] : "0" + item.createdAt[2]}
                                            .{item.createdAt[1].length === 1 ? item.createdAt[1] : "0" + item.createdAt[1]}
                                            .{item.createdAt[0]}
                                        </td> :
                                        <td/>
                                    }
                                    {item.updatedAt ?
                                        <td>{item.updatedAt[2].length === 1 ? item.updatedAt[2] : "0" + item.updatedAt[2]}
                                            .{item.updatedAt[1].length === 1 ? item.updatedAt[1] : "0" + item.updatedAt[1]}
                                            .{item.updatedAt[0]}
                                        </td> :
                                        <td/>
                                    }
                                    <td>
                                        <Button onClick={() => setEditID(null)}>CANCEL</Button>
                                    </td>
                                    <td>
                                        <Button onClick={updateAccount}>SUBMIT</Button>
                                    </td>
                                </tr>
                                :
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.number}</td>
                                    <td>{item.name}</td>
                                    <td>{item.balance}</td>
                                    {item.createdAt ?
                                        <td>{item.createdAt[2].length === 1 ? item.createdAt[2] : "0" + item.createdAt[2]}
                                            .{item.createdAt[1].length === 1 ? item.createdAt[1] : "0" + item.createdAt[1]}
                                            .{item.createdAt[0]}
                                        </td> :
                                        <td/>
                                    }
                                    {item.updatedAt ?
                                        <td>{item.updatedAt[2].length === 1 ? item.updatedAt[2] : "0" + item.updatedAt[2]}
                                            .{item.updatedAt[1].length === 1 ? item.updatedAt[1] : "0" + item.updatedAt[1]}
                                            .{item.updatedAt[0]}
                                        </td> :
                                        <td/>
                                    }
                                    <td>
                                        <Button onMouseUp={() => setDeleteItem(item.number)}
                                                onClick={deleteAccountByNumber}>DELETE</Button>
                                    </td>
                                    <td>
                                        <Button onClick={() => setEditID(item.accountId)}>APDATE</Button>
                                    </td>
                                </tr>
                        )
                    })}
                <tr>
                    <td>{!items ? 1 : items.length + 1}</td>
                    <td>
                        <input
                            type="number"
                            name="number"
                            value={formData.number}
                            onChange={handleInsert}
                            placeholder="Number"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInsert}
                            placeholder="Name"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInsert}
                            placeholder="Balance"
                        />
                    </td>
                    <td/>
                    <td/>
                    <td>
                        <Button type={"submit"} onClick={save}>ADD</Button>
                    </td>
                    <td/>
                </tr>
                </tbody>

            </table>

            <form onSubmit={beginTransaction}>
                <table id="table2">
                    <thead>
                    <tr>
                        <th>operationType</th>
                        <th>fromAccount</th>
                        <th>toAccount</th>
                        <th>amount</th>
                        <th>Transaction</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <select name="operationType" value={formTransaction.operationType}
                                    onChange={handleTransaction}>
                                <option value="">Operayon Type</option>
                                {Object.keys(Operation).map(key => Operation[key]).map(operationType => (
                                    <option key={operationType}
                                            value={operationType}>{operationType}</option>
                                ))}
                            </select>
                        </td>

                        <td>
                            <select name="fromAccountNumber" value={formTransaction.fromAccountNumber}
                                    onChange={handleTransaction}>
                                <option>Select Account</option>
                                {items?.filter(r => r.username.includes(currentUser?.username)).map(les => (
                                    <option key={les.number}
                                            value={les.number}>{les.username} - {les.number} - {les.name}</option>
                                ))}
                            </select>
                        </td>

                        {(formTransaction.operationType === '' ||
                                formTransaction.operationType === "WITHDRAWAL" ||
                                formTransaction.operationType === "DEPOSIT") &&
                            <td/>}

                        {formTransaction.operationType === "TRANSFER" &&
                            <td>
                                <select name="toAccountNumber" value={formTransaction.toAccountNumber}
                                        onChange={handleTransaction}>
                                    <option value="">Select Account</option>
                                    {items?.filter(r => r.username.includes(currentUser?.username)).map(les => (
                                        <option key={les.number}
                                                value={les.number}>{les.username} - {les.number} - {les.name}</option>
                                    ))}
                                </select>
                            </td>}

                        {formTransaction.operationType === "PAYMENT" &&
                            <td>
                                <select name="toAccountNumber" value={formTransaction.toAccountNumber}
                                        onChange={handleTransaction}>
                                    <option value="">Select Account</option>
                                    {items?.filter(r => !r.username.includes(currentUser?.username)).map(les => (
                                        <option key={les.number}
                                                value={les.number}>{les.username} - {les.number} - {les.name}</option>
                                    ))}
                                </select>
                            </td>}
                        <td>
                            <input
                                type="number"
                                name="amount"
                                value={formTransaction.amount}
                                onChange={handleTransaction}
                                placeholder="Amount"
                            />
                        </td>
                        <td>
                            <Button type="submit">Begin Transaction</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Home;