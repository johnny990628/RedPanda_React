import { Input, Descriptions, Select, Button, Slider } from 'antd'
import React, { useState, useEffect } from 'react'
import RESOURCES from '../../Resources.config.json'
import { GET, getSetting, init } from '../../httpRequest'

const { Option } = Select

type QueryData = {
    URL: string
    serverURL: string
    resourceType: string
    id: string
    token: string
    sortBy: string
    pageCount: number
}

const SelectBefore = (
    <Select defaultValue="GET">
        <Option value="GET">GET</Option>
        <Option value="POST">POST</Option>
        <Option value="PUT">PUT</Option>
        <Option value="DELETE">DELETE</Option>
    </Select>
)

const SortBySelector = ({
    options,
    value,
    valueOnChange,
}: {
    options: string[] | undefined
    value: string
    valueOnChange: (type: string, value: string) => void
}) => {
    return (
        <Select
            showSearch
            placeholder="Select a sortBy"
            optionFilterProp="children"
            onChange={value => valueOnChange('sortBy', value)}
            value={value}
            style={{ width: '100%' }}
            filterOption={(input, option) => (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
        >
            {options?.map(col => (
                <Option value={col} key={col}>
                    {col}
                </Option>
            ))}
        </Select>
    )
}

const ResourceTypeSelector = ({ value, valueOnChange }: { value: string; valueOnChange: (type: string, value: string) => void }) => {
    return (
        <Select value={value} showSearch style={{ width: '100%' }} onChange={e => valueOnChange('resourceType', e)}>
            {RESOURCES.map(({ type }) => (
                <Option value={type} key={type}>
                    {type}
                </Option>
            ))}
        </Select>
    )
}

const QueryUI = () => {
    const initialData: QueryData = {
        URL: 'https://',
        serverURL: 'https://',
        resourceType: RESOURCES[0].type,
        id: '',
        token: '',
        sortBy: 'id',
        pageCount: 20,
    }
    const [data, setData] = useState<QueryData>(initialData)

    const sendRequest = () => {
        init({ server: data.serverURL, token: data.token })
        GET(data.resourceType).then(res => console.log(res))
    }

    const valueOnChange = (columnName: string, value: string | number): void => {
        const serverURL = columnName === 'serverURL' ? value : data.serverURL
        const resourceType = columnName === 'resourceType' ? value : data.resourceType
        const id = columnName === 'id' ? value : data.id
        const URL = `${serverURL}/${resourceType}/${id}`

        const sortBy = columnName === 'resourceType' ? 'id' : data.sortBy
        setData({
            ...data,
            URL,
            sortBy,
            [columnName]: value,
        })
    }

    const onReset = () => {
        setData(initialData)
    }

    return (
        <Descriptions title="RedPanda" bordered>
            <Descriptions.Item label="URL" span={3}>
                <Input.Group>
                    <Input addonBefore={SelectBefore} style={{ width: '80%', marginRight: '1rem' }} value={data.URL} readOnly />
                    <Button type="primary" style={{ marginRight: '1rem' }} onClick={sendRequest}>
                        Send
                    </Button>
                    <Button type="primary" danger onClick={onReset}>
                        Reset
                    </Button>
                </Input.Group>
            </Descriptions.Item>
            <Descriptions.Item label="Server URL">
                <Input value={data.serverURL} onChange={e => valueOnChange('serverURL', e.target.value)} />
            </Descriptions.Item>
            <Descriptions.Item label="Resource Type">
                <ResourceTypeSelector value={data.resourceType} valueOnChange={valueOnChange} />
            </Descriptions.Item>
            <Descriptions.Item label="ID">
                <Input onChange={e => valueOnChange('id', e.target.value)} />
            </Descriptions.Item>
            <Descriptions.Item label="Token">
                <Input onChange={e => valueOnChange('token', e.target.value)} />
            </Descriptions.Item>
            <Descriptions.Item label="Sort By">
                <SortBySelector
                    options={RESOURCES.find(r => r.type === data.resourceType)?.cols}
                    value={data.sortBy}
                    valueOnChange={valueOnChange}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Page Count">
                <Slider value={data.pageCount} min={5} max={200} step={5} onChange={value => valueOnChange('pageCount', value)} />
            </Descriptions.Item>
        </Descriptions>
    )
}

export default QueryUI
