import { Input, Descriptions, Select, Button, Slider } from 'antd'
import React, { useState, useEffect } from 'react'
import RESOURCES from '../../Resources.config.json'

const { Option } = Select

type QueryData = {
    URL: string
    serverURL: string
    ResourceType: string
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

const SortBySelect = ({ data, setData }: { data: QueryData; setData: any }) => {
    const onChange = (value: string) => {
        setData({ ...data, sortBy: value })
    }
    const onSearch = (value: string) => {
        console.log('search:', value)
    }

    return (
        <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            defaultValue={RESOURCES[0].cols[0]}
            style={{ width: '100%' }}
            filterOption={(input, option) => (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
        >
            {RESOURCES.map(
                ({ type, cols }) =>
                    type === data.ResourceType &&
                    cols.map(col => (
                        <Option value={col} key={col}>
                            {col}
                        </Option>
                    ))
            )}
        </Select>
    )
}

const ResourceType = ({ data, setData }: { data: QueryData; setData: any }) => {
    return (
        <Select defaultValue={RESOURCES[0].type} showSearch style={{ width: '100%' }} onChange={e => setData({ ...data, ResourceType: e })}>
            {RESOURCES.map(({ type }) => (
                <Option value={type} key={type}>
                    {type}
                </Option>
            ))}
        </Select>
    )
}

const QueryUI = () => {
    const [data, setData] = useState<QueryData>({
        URL: '',
        serverURL: '',
        ResourceType: RESOURCES[0].type,
        id: '',
        token: '',
        sortBy: 'id',
        pageCount: 20,
    })

    useEffect(() => {
        const newData = data.id
            ? { ...data, URL: `${data.serverURL}/${data.ResourceType}/${data.id}` }
            : { ...data, URL: `${data.serverURL}/${data.ResourceType}` }
        setData(newData)
    }, [data.serverURL, data.ResourceType, data.sortBy, data.pageCount, data.id])

    return (
        <Descriptions title="RedPanda" bordered>
            <Descriptions.Item label="URL" span={3}>
                <Input.Group>
                    <Input addonBefore={SelectBefore} style={{ width: '80%', marginRight: '1rem' }} value={data.URL} disabled />
                    <Button type="primary" style={{ marginRight: '1rem' }}>
                        Send
                    </Button>
                    <Button type="primary" danger>
                        Reset
                    </Button>
                </Input.Group>
            </Descriptions.Item>
            <Descriptions.Item label="Server URL">
                <Input defaultValue="https://" onChange={e => setData({ ...data, serverURL: e.target.value })} />
            </Descriptions.Item>
            <Descriptions.Item label="Resource Type">
                <ResourceType data={data} setData={setData} />
            </Descriptions.Item>
            <Descriptions.Item label="ID">
                <Input onChange={e => setData({ ...data, id: e.target.value })} />
            </Descriptions.Item>
            <Descriptions.Item label="Token">
                <Input onChange={e => setData({ ...data, token: e.target.value })} />
            </Descriptions.Item>
            <Descriptions.Item label="Sort By">
                <SortBySelect data={data} setData={setData} />
            </Descriptions.Item>
            <Descriptions.Item label="Page Count">
                <Slider defaultValue={20} min={5} max={200} step={5} />
            </Descriptions.Item>
        </Descriptions>
    )
}

export default QueryUI
