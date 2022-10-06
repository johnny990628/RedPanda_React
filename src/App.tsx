import React, { useState } from 'react'
import QueryUI from './Components/QueryUI/index'
import { QueryType, ColumnType, ResourceType, ParameterType, HTTP } from './Types/Query'
import { GET, init } from './httpRequest'
import RESOURCES from './Configs/Resources.config.json'
import JSONTable from './Components/JSONTable'
import { Modal } from 'antd'
import JSONModal from './Components/JSONModal'

function App() {
    const initialQuerys: QueryType = {
        HTTP: HTTP.GET,
        URL: 'https://',
        serverURL: 'https://',
        resourceType: RESOURCES[0].type,
        id: '',
        token: '',
        sortBy: '_id',
        pageCount: 20,
        parameters: [],
        headers: [],
    }
    const [querys, setQuerys] = useState<QueryType>(initialQuerys)
    const [JSONData, setJSONData] = useState<[] | {}>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fetchJson,setFetchJson] = useState<[] | {}>([])
    console.log(querys)

    const changeJSONData = (data: {} | []) => {
        setJSONData(data)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const valueOnChange = (columnName: string, value: string | number | ParameterType[]): void => {
        const serverURL = columnName === 'serverURL' ? value : querys.serverURL
        const resourceType = columnName === 'resourceType' ? value : querys.resourceType
        const id = columnName === 'id' ? value : querys.id
        const parameters =
            columnName === 'parameters'
                ? Array.isArray(value)
                    ? value?.map(({ parameter, value }) => `${parameter}=${value || ''}`)
                    : []
                : querys.parameters?.map(({ parameter, value }) => `${parameter}=${value || ''}`)

        const sortBy = columnName === 'sortBy' ? value : querys.sortBy
        const pageCount = columnName === 'pageCount' ? value : querys.pageCount

        const params = `?${`_sort=${sortBy}`}&${`_count=${pageCount}`}${parameters?.length ? '&' : ''}${parameters?.join('&')}`

        const URL = `${serverURL}/${resourceType}${id ? `/${id}` : ''}${params}`

        setQuerys({
            ...querys,
            URL,
            [columnName]: value,
        })
    }

    const onReset = () => {
        setQuerys(initialQuerys)
    }

    const sendRequest = () => {
        init({ server: querys.serverURL, token: querys.token })
        GET(querys.resourceType).then(res => setFetchJson(res.data.entry))
    }

    return (
        <div style={{ padding: '1rem' }}>
            <QueryUI querys={querys} valueOnChange={valueOnChange} onReset={onReset} sendRequest={sendRequest} />
            <JSONTable openModal={openModal} querys={querys.resourceType} changeJSONData={changeJSONData} fetchJson={fetchJson}/>
            <JSONModal json={JSONData} isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
        </div>
    )
}

export default App
