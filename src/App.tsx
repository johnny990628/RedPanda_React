import React, { useState } from 'react'
import QueryUI from './Components/QueryUI/index'
import { QueryType, ColumnType, ResourceType, ParameterType, HTTP } from './Types'
import { GET, init } from './httpRequest'
import RESOURCES from './Configs/Resources.config.json'
import JSONTable from './Components/JSONTable'

function App() {
    const initialQuerys: QueryType = {
        HTTP: HTTP.GET,
        URL: 'https://',
        serverURL: 'https://',
        resourceType: RESOURCES[0].type,
        id: '',
        token: '',
        sortBy: 'id',
        pageCount: 20,
        parameters: [],
    }
    const [querys, setQuerys] = useState<QueryType>(initialQuerys)
    const [FHIRData, setFHIRData] = useState<object[]>([])

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
        GET(querys.resourceType).then(res => console.log(res.data))
    }
    return (
        <div style={{ padding: '1rem' }}>
            <QueryUI querys={querys} valueOnChange={valueOnChange} onReset={onReset} sendRequest={sendRequest} />
            <JSONTable />
        </div>
    )
}

export default App
