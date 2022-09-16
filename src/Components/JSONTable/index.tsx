import React, { useState } from 'react'
import type { TableColumnsType } from 'antd'
import { Table, Badge, Menu, Dropdown, Space, Row } from 'antd'
import DATA from './data.json'

function JSONTable() {
    const [expendedIndex, setExpendedIndex] = useState<number>(-1)
    const [expendedColName, setExpendedColName] = useState<string>('')
    const [expendedData, setExpendedData] = useState<{}[]>([])

    const expend = (index: number, columnName: string, record: {}[]) => {
        const expendIndex = expendedIndex === index ? -1 : index
        const expendColName = expendedIndex === index ? '' : columnName
        setExpendedData(record)
        setExpendedIndex(expendIndex)
        setExpendedColName(expendColName)
    }

    const expandedRowRender = () => {
        const columns = expendedData?.length > 0 ? Object.keys(expendedData[0]).map(key => ({ title: key, dataIndex: key, key: key })) : []

        return <Table columns={columns} dataSource={expendedData} pagination={false} />
    }

    type PatientResourceType = {
        id: string
        text: { status: string; div: string }
        identifier: { system: string }[]
        name: { family: string; given: string[] }[]
        gender: string
        birthDate: string
        address: { use: string; line: string[]; city: string; country: string; state: string; postalCode: string }[]
        search: { mode: string }
    }

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: 'Identifier',
            key: 'identifier',
            dataIndex: 'identifier',
            render: (record: {}[], row: object, index: number) => {
                return (
                    <a onClick={() => expend(index, 'identifier', record)}>
                        {index === expendedIndex && expendedColName === 'identifier' ? 'Close Details' : 'More Details'}
                    </a>
                )
            },
        },
        {
            title: 'Address',
            key: 'address',
            dataIndex: 'address',
            render: (record: {}[], row: object, index: number) => {
                return (
                    <a onClick={() => expend(index, 'address', record)}>
                        {index === expendedIndex && expendedColName === 'address' ? 'Close Details' : 'More Details'}
                    </a>
                )
            },
        },

        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        { title: 'BirthDate', dataIndex: 'birthDate', key: 'birthDate' },
        // { title: 'Address', dataIndex: 'address', key: 'address' },
    ]

    return (
        <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{
                expandedRowRender,
                expandIcon: () => <></>,
            }}
            expandedRowKeys={[expendedIndex]}
            dataSource={DATA.map((d, i) => ({ key: i, ...d.resource }))}
        />
    )
}

export default JSONTable
