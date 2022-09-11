import { Input, Descriptions, Select, Button, Slider } from 'antd'
import React, { useState, useEffect } from 'react'
import headers from '../../ResourcesConfig.json';

const { Option } = Select

type QueryData = {
    URL: string; serverURL: string; ResourceType: string; id: string; token: string; sortBy: string; pageCount: number
}

const SelectBefore = (
    <Select defaultValue="GET">
        <Option value="GET">GET</Option>
        <Option value="POST">POST</Option>
        <Option value="PUT">PUT</Option>
        <Option value="DELETE">DELETE</Option>
    </Select>
)

const SortBySelect = (props: { data: QueryData, setData: any }) => {
    const onChange = (value: string) => {
        props.setData({ ...props.data, sortBy: value })
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
            defaultValue={headers.Resources['Patient'][0]}
            style={{ width: '100%' }}
            filterOption={(input, option) => (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
        >
            {Object.entries(headers.Resources).map((item: any) => {
                if (item[0] === props.data.ResourceType) {
                    return (item[1].map((item2: string) => {
                        return <Option value={item2} key={item2}>{item2}</Option>
                    }))
                }
            })}
        </Select>
    )
}

const ResourceType = (props: { data: QueryData, setData: any }) => {
    //Object.entries(headers.Resources) -->[Array(2), Array(2).......-->['Patient', Array(5)]
    return (
        <Select defaultValue={Object.entries(headers.Resources)[0][0]} showSearch style={{ width: "100%" }} onChange={(e) => props.setData({ ...props.data, ResourceType: e })}>
            {Object.entries(headers.Resources).map((item) => {
                return <Option value={item[0]} key={item[0]}>{item[0]}</Option>
            })}
        </Select>
    )
}

const QueryUI = () => {
    const [data, setData] = useState<QueryData>({
        URL: "",
        serverURL: "",
        ResourceType: Object.entries(headers.Resources)[0][0],
        id: "",
        token: "",
        sortBy: Object.entries(headers.Resources)[0][1][0],
        pageCount: 20
    });

    useEffect(() => {
        if(data.id) setData({ ...data, URL: `${data.serverURL}/${data.ResourceType}/${data.id}` })
        else setData({ ...data, URL: `${data.serverURL}/${data.ResourceType}` })
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
                <Input defaultValue="https://" onChange={(e) => setData({ ...data, serverURL: e.target.value })} />
            </Descriptions.Item>
            <Descriptions.Item label="Resource Type">
                <ResourceType data={data} setData={setData} />
            </Descriptions.Item>
            <Descriptions.Item label="ID">
                <Input onChange={(e) => setData({ ...data, id: e.target.value })} />
            </Descriptions.Item>
            <Descriptions.Item label="Token">
                <Input onChange={(e) => setData({ ...data, token: e.target.value })} />
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
