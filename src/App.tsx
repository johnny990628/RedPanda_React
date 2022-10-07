import React, { useState, useEffect } from 'react'
import QueryUI from './Components/QueryUI/index'
import { QueryType, ColumnType, ResourceType, ParameterType, HTTP } from './Types/Query'
import { GET, init, POST, PUT, DELETE } from './httpRequest'
import RESOURCES from './Configs/Resources.config.json'
import JSONTable from './Components/JSONTable'
import { Button, notification, Tag } from 'antd'
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
    const [fetchJson, setFetchJson] = useState<[] | {}>([])//存取response的json
    const [fetchJsonParameters, setFetchJsonParameters] = useState<[] | {}>({})//提供給httpRequest的參數專用
    const [fetchJsonHeader, setFetchJsonHeader] = useState<[] | {}>({})//提供給httpRequest的Header參數專用
    const [inputJson, setInputJson] = useState<string>("")
    console.log(querys)
    //修改resourceType，使用useEffect是因為title 會更新
    useEffect(() => {
        sendRequest()
    }, [querys.resourceType])

    //修改parameters參數
    useEffect(() => {
        const obj: any = {}
        const headers: any = {}
        //若是帶入ID 則不可帶入參數
        if (querys.id.length > 0) {
            obj._id = querys.id
        } else {
            obj._count = querys.pageCount //每頁顯示幾筆
            querys.parameters.map((item: { parameter: string, value: string }) => {
                if (item.value !== "") obj[item.parameter] = item.value  //若value為空則不帶入參數
            })
        }
        if (querys.headers.length > 0) {
            querys.headers.map((item: { header: string, value: string }) => {
                if (item.header) headers[item.header] = item.value || ""
            })
        }
        setFetchJsonParameters(obj)
        setFetchJsonHeader(headers)
    }, [querys.parameters, querys.pageCount, querys.id, querys.headers])

    const openNotification = (title: number, value: string) => {
        const colorType = () => {
            if (title >= 200 && title < 300) {
                return "blue"
            } else { return "red" }
        }
        notification.open({
            message: <>Server response：<Tag color={colorType()}>{title}</Tag></>,
            description: value,
        });
    };

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
        init({ server: querys.serverURL, token: querys.token, resourceType: querys.resourceType })
        switch (querys.HTTP) {
            case "GET":
                GET(querys.resourceType, fetchJsonParameters, fetchJsonHeader).then(res => {
                    const data = (res.data.entry) ? res.data.entry : []
                    setFetchJson(data)
                })
                break;
            case "POST":
                POST(querys.resourceType, inputJson).then((res: { status: number, text: string }) => {
                    openNotification(res.status, res.text)
                })
                break;
            case "PUT":
                PUT(querys.resourceType, inputJson).then((res: { status: number, text: string }) => {
                    openNotification(res.status, res.text)
                })
                break;
            case "DELETE":
                DELETE(querys.resourceType, querys.id).then((res: { status: number, text: string }) => {
                    openNotification(res.status, res.text)
                })
                break;

        }
    }

    const inputJsonChange = (value: string): void => {
        console.log(value)
        setInputJson(value)
    }


    return (
        <div style={{ padding: '1rem' }}>
            <QueryUI querys={querys} valueOnChange={valueOnChange} onReset={onReset} sendRequest={sendRequest} inputJsonChange={inputJsonChange} inputJson={inputJson} />

            {/* 只有GET顯示下方Table*/}
            {querys.HTTP === "GET" ? <><JSONTable openModal={openModal} querys={querys.resourceType} changeJSONData={changeJSONData} fetchJson={fetchJson} />
                <JSONModal json={JSONData} isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} /></> : <></>}
        </div>
    )
}

export default App
