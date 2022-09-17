import React, { useState } from 'react'
import { Button, TableColumnsType, Tooltip } from 'antd'
import { Table, Badge, Menu, Dropdown, Space, Row } from 'antd'
import DATA from './data.json'
import { capitalizeFirstLetter } from './../../Utils/string.converter'
import { PatientCols } from './PatientCols'

const JSONTable = ({ openModal, changeJSONData }: { openModal: () => void; changeJSONData: (data: [] | {}) => void }) => {
    const [expendedIndex, setExpendedIndex] = useState<number>(-1)
    const [expendedColName, setExpendedColName] = useState<string>('')
    const [expendedData, setExpendedData] = useState<{}[]>([])

    type ColType = {
        label: string
        name: string
        type: string
        display?: string
        childrens?: {
            label: string
            name: string
            type: string
            childrens?: any
        }[]
    }

    const expend = (index: number, columnName: string, record: {}[]) => {
        const expendIndex = expendedIndex === index ? -1 : index
        const expendColName = expendedIndex === index ? '' : columnName
        setExpendedData(record)
        setExpendedIndex(expendIndex)
        setExpendedColName(expendColName)
    }

    const handleClick = (data: {} | []) => {
        changeJSONData(data)
        openModal()
    }

    const expandedRowRender = () => {
        const children =
            expendedData?.length > 0
                ? Object.entries(expendedData[0]).map(([key, value]) =>
                      typeof value === 'object'
                          ? {
                                title: capitalizeFirstLetter(key),
                                dataIndex: key,
                                key: key,
                                render: (record: {} | [], row: object, index: number) => {
                                    return <Button onClick={() => handleClick(record)}>JSON</Button>
                                },
                            }
                          : { title: capitalizeFirstLetter(key), dataIndex: key, key: key, ellipsis: true }
                  )
                : []
        const columns = [{ title: capitalizeFirstLetter(expendedColName), children }]

        return <Table size="small" bordered columns={columns} dataSource={expendedData} pagination={false} />
    }

    const typeSwitch = ({ type, label, name, childrens }: ColType): {} => {
        switch (type) {
            case 'string':
                return name === 'id'
                    ? { title: label, dataIndex: name, key: name, ellipsis: true, fixed: true }
                    : { title: label, dataIndex: name, key: name, ellipsis: true }
            case 'object':
                return {
                    title: label,
                    dataIndex: name,
                    key: name,
                    render: (record: {} | [], row: object, index: number) => {
                        return <Button onClick={() => handleClick(record)}>JSON</Button>
                    },
                }
            case 'array':
                return {
                    title: label,
                    key: name,
                    dataIndex: name,
                    render: (record: {}[], row: object, index: number) => {
                        return (
                            <a onClick={() => expend(index, name, record)}>
                                {index === expendedIndex && expendedColName === name ? 'Close Details' : 'More Details'}
                            </a>
                        )
                    },
                }
            case 'array_string':
                return {
                    title: label,
                    key: name,
                    dataIndex: name,
                    render: (record: string[], row: object, index: number) => {
                        return <span>{record.join(',')}</span>
                    },
                }
            case 'boolean':
                return {
                    title: label,
                    key: name,
                    dataIndex: name,
                    render: (record: boolean, row: object, index: number) => {
                        return <span>{record ? 'yes' : 'no'}</span>
                    },
                }
            default:
                return {}
        }
    }

    const columns = [
        ...PatientCols.map(col => typeSwitch(col)),
        {
            title: 'JSON',
            key: 'operation',
            fixed: 'right',
            render: () => <Button onClick={() => handleClick(DATA)}>JSON</Button>,
        },
    ]

    return (
        <Table
            columns={columns}
            expandable={{
                expandedRowRender,
                expandIcon: () => <></>,
            }}
            expandedRowKeys={[expendedIndex]}
            dataSource={DATA.map((d, i) => ({ key: i, ...d }))}
            pagination={false}
        />
    )
}

export default JSONTable
