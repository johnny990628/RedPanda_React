import React, { useState } from 'react'
import { Button, TableColumnsType, Tooltip } from 'antd'
import { Table, Badge, Menu, Dropdown, Space, Row } from 'antd'
import DATA from './data.json'
import Resourcesconfigjson from "../../Configs/Resources.config.json"
import { capitalizeFirstLetter } from './../../Utils/string.converter'
import { PatientCols } from '../ColsType/PatientCols'
import { ConditionCols } from '../ColsType/ConditionCols'
import { MedicationCols } from '../ColsType/MedicationCols'
import { DiagnosticReportCols } from '../ColsType/DiagnosticReportCols'
import { EncounterCols } from '../ColsType/EncounterCols'
import { ProcedureCols } from '../ColsType/ProcedureCols'
import { PractitionerCols } from '../ColsType/PractitionerCols'
import { OrganizationCols } from '../ColsType/OrganizationCols'
import { MedicationRequestCols } from '../ColsType/MedicationRequestCols'
import { ObservationCols } from '../ColsType/ObservationCols'


const JSONTable = ({ openModal, changeJSONData, fetchJson, querys }: { openModal: () => void; changeJSONData: (data: [] | {}) => void; fetchJson: any; querys: string }) => {
    const [expendedIndex, setExpendedIndex] = useState<number>(-1)
    const [expendedColName, setExpendedColName] = useState<string>('')
    const [expendedData, setExpendedData] = useState<{}[]>([])

    const columnsJSON: any = {
        Patient: PatientCols,
        Condition: ConditionCols,
        Medication: MedicationCols,
        DiagnosticReport: DiagnosticReportCols,
        Encounter: EncounterCols,
        Procedure: ProcedureCols,
        Practitioner: PractitionerCols,
        Organization: OrganizationCols,
        MedicationRequest: MedicationRequestCols,
        Observation: ObservationCols
    }


    type ColType = {
        label: string
        name: string
        type: string
        childrens?: any[]
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
                                {index === expendedIndex && expendedColName === name ? 'Close' : 'More Details'}
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
        ...columnsJSON[querys].map((col: ColType) => typeSwitch(col)),
        {
            title: 'JSON',
            key: 'operation',
            fixed: 'right',
            render: (e: ColType) => <Button onClick={() => handleClick(e)}>JSON</Button>,
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
            dataSource={fetchJson.map((d: { resource: object }, i: number) => ({ key: i, ...d.resource }))}
            pagination={false}
        />
    )
}

export default JSONTable
//handleClick(fetchJson)