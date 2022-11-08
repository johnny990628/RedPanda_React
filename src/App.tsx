import React, { useState, useEffect } from 'react'
import QueryUI from './Components/QueryUI/index'
import { QueryType, ColumnType, ResourceType, ParameterType, HTTP } from './Types/Query'
import { GET, init, POST, PUT, DELETE } from './httpRequest'
import RESOURCES from './Configs/Resources.config.json'
import JSONTable from './Components/JSONTable'
import { message, Space, notification, Tag } from 'antd'
import JSONModal from './Components/JSONModal'

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
        headers: [],
    }
    const [querys, setQuerys] = useState<QueryType>(initialQuerys)
    const [JSONData, setJSONData] = useState<[] | {}>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fetchJson, setFetchJson] = useState<[] | {}>([]) //存取response的json

    const [inputJson, setInputJson] = useState<string>('')
    //修改resourceType，使用useEffect是因為title 會更新
    useEffect(() => {
        sendRequest()
    }, [querys.resourceType])

    const openNotification = ({ statusCode, message, color }: { statusCode: number; message: string; color: string }) => {
        notification.open({
            message: (
                <>
                    Server response：<Tag color={color}>{statusCode}</Tag>
                </>
            ),
            description: `${message}`,
        })
    }

    const responseHandler = (res: any) => {
        const message = res.data.msg ? res.data.msg : res?.issue?.map((i: any) => i.diagnostics).toString()

        if (res.status >= 200 && res.status < 300)
            openNotification({
                statusCode: res.status,
                message: `Successful`,
                color: 'blue',
            })
        else openNotification({ statusCode: res.status, message, color: 'red' })
    }

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

        const URL = `${serverURL}/${resourceType}${id ? `/${id}` : ''}${id ? '' : params}`

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
        init({ server: querys.serverURL, token: querys.token, resourceType: querys.resourceType })
        switch (querys.HTTP) {
            case 'GET':
                GET(querys.URL)
                    .then(res => {
                        let data = []
                        if (querys.id) data = [{ resource: res.data }]
                        else data = res.data.entry?.length > 0 ? res.data.entry : []
                        setFetchJson(data)
                        responseHandler(res)
                    })
                    .catch(err => {
                        console.log(err)
                        openNotification({ statusCode: 404, message: 'Bad Request', color: 'red' })
                    })
                break
            case 'POST':
                POST(querys.resourceType, inputJson)
                    .then(res => {
                        responseHandler(res)
                    })
                    .catch(err => openNotification({ statusCode: 404, message: 'Bad Request', color: 'red' }))
                break
            case 'PUT':
                PUT(querys.resourceType + '/' + querys.id, inputJson)
                    .then(res => {
                        responseHandler(res)
                    })
                    .catch(err => openNotification({ statusCode: 404, message: 'Bad Request', color: 'red' }))
                break
            case 'DELETE':
                DELETE(querys.resourceType + '/' + querys.id)
                    .then(res => {
                        responseHandler(res)
                    })
                    .catch(err => openNotification({ statusCode: 404, message: 'Bad Request', color: 'red' }))
                break
        }
    }

    const inputJsonChange = (value: string): void => {
        setInputJson(value)
    }

    return (
        <div style={{ padding: '1rem' }}>
            <QueryUI
                querys={querys}
                valueOnChange={valueOnChange}
                onReset={onReset}
                sendRequest={sendRequest}
                inputJsonChange={inputJsonChange}
                inputJson={inputJson}
            />

            {/* 只有GET顯示下方Table*/}
            {querys.HTTP === 'GET' ? (
                <>
                    <JSONTable openModal={openModal} querys={querys.resourceType} changeJSONData={changeJSONData} fetchJson={fetchJson} />
                    <JSONModal json={JSONData} isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default App
