import React, {useEffect, useState} from 'react';
import Store from "../store";
import {Input} from "@mui/material";
import "../App.css"
import TransactionService from "../services/TransactionService";

const TransactionHistory = () => {

    const currentUser = Store.getState().user;

    const [items, setItems] = useState(null);
    const [searchKey, setSearchKey] = useState(null);

    useEffect(() => {
        TransactionService.callTransactionHistory((responseData) => setItems(responseData))
    }, []);

    return (
        <div className="example">
            <Input type="text" placeholder="SearchBytoUsername..."
                   onChange={(e) => setSearchKey(e.target.value.toLowerCase())}/>
            <table id="table1">
                <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>fromUsername</th>
                    <th>fromAccountNumber</th>
                    <th>operationType</th>
                    <th>amount</th>
                    <th>toUsername</th>
                    <th>toAccountNumber</th>
                    <th>transactionDate</th>
                    <th>transactionStatus</th>
                </tr>
                </thead>
                <tbody>
                {items?.filter(r => r.fromUsername.includes(currentUser?.username) || r.toUsername.includes(currentUser?.username))
                    .filter(i => !searchKey || i.toUsername.includes(searchKey)).map((item, index) => {
                        return (<tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.transactionId}</td>
                            <td>{item.fromUsername}</td>
                            <td>{item.fromAccountNumber}</td>
                            <td>{item.operationType}</td>
                            <td>{item.amount}</td>
                            <td>{item.toUsername}</td>
                            <td>{item.toAccountNumber}</td>
                            {item.transactionDate ?
                                <td>{item.transactionDate[2]}
                                    .{item.transactionDate[1]}
                                    .{item.transactionDate[0]}
                                </td> : <td/>
                            }
                            <td>{item.transactionStatus}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;