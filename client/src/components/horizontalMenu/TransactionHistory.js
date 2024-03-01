import React, {useEffect, useState} from 'react';
import Store from "../store";
import axios from "axios";
import {BASE_URL} from "../store/Enums";
import DataTable, {Alignment, Direction, Media} from 'react-data-table-component';
import {Button, Input} from "@mui/material";
import {ArrowDownward} from "@mui/icons-material";

const currentUser = Store.getState().user;

const TransactionHistory = () => {

    const [items, setItems] = useState({});

    const simpleColumns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        }, {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            hide: Media.SM
        }, {
            name: 'Age',
            selector: row => row.age,
            sortable: true
        }
    ];

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            left: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            center: true
        },
        {
            name: 'Ages',
            selector: row => row.age,
            sortable: true,
            right: true,
            conditionalCellStyles: [
                {
                    when: row => row.age < 10,
                    style: {
                        backgroundColor: 'rgba(63, 195, 128, 0.9)',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
                {
                    when: row => row.age >= 10 && row.age < 20,
                    style: {
                        backgroundColor: 'rgba(248, 148, 6, 0.9)',
                        color: 'white',
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                },
                {
                    when: row => row.age >= 20,
                    style: {
                        backgroundColor: 'rgba(242, 38, 19, 0.9)',
                        color: 'white',
                        '&:hover': {
                            cursor: 'not-allowed',
                        },
                    },
                }
            ],
        },
        {
            name: 'CRUD',
            cell: () => <Button>Download</Button>
        },
        {
            name: 'Person Link',
            button: true,
            cell: row => (
                <a href={row.name} target="_blank" rel="noopener noreferrer">
                    Show
                </a>
            ),
            style: {
                backgroundColor: 'orange',
                color: 'white',
                '&:hover': {
                    cursor: 'not-allowed',
                },
            }
        }
    ];



    function callTransactionHistory() {
        return axios.post(
            BASE_URL + `/transaction/getAllTransactionsByUsername/${currentUser?.username}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + currentUser?.token,
                }
            }
        ).then(res => {
            console.log(res)
            setItems(res)
        }).catch(err=>console.log(err));
    }

    useEffect(() => {
        callTransactionHistory();
    }, []);

    return (
        <div className="example">
            <Input type="text" placeholder="SearchByName" onChange={handleFilter}/>
            <DataTable
                columns={simpleColumns}
                data={items}
                title="Persons"
                /*expandableRows*/
                /*expandableRowsComponent={ExpandedComponent}*/
                /*fixedHeader*/
                selectableRows
                pagination
                sortIcon={<ArrowDownward/>}
                customStyles={customStyles}
                /*theme="solarized"*/
                theme="dark"
                direction={Direction.AUTO}
                subHeaderAlign={Alignment.LEFT}
            />
        </div>
    );
};

export default TransactionHistory;