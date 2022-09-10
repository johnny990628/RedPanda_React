import { Input, Descriptions, Select, Button, Slider, Space } from 'antd'
import React from 'react'

const { Option, OptGroup } = Select

const SelectBefore = (
    <Select defaultValue="GET">
        <Option value="GET">GET</Option>
        <Option value="POST">POST</Option>
        <Option value="PUT">PUT</Option>
        <Option value="DELETE">DELETE</Option>
    </Select>
)

const SortBySelect = () => {
    const onChange = (value: string) => {
        console.log(`selected ${value}`)
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
            defaultValue="lucy"
            style={{ width: '100%' }}
            filterOption={(input, option) => (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
        >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
        </Select>
    )
}

const QueryUI = () => {
    return (
        <Descriptions title="RedPanda" bordered>
            <Descriptions.Item label="URL" span={3}>
                <Input.Group>
                    <Input addonBefore={SelectBefore} style={{ width: '80%', marginRight: '1rem' }} />
                    <Button type="primary" style={{ marginRight: '1rem' }}>
                        Send
                    </Button>
                    <Button type="primary" danger>
                        Reset
                    </Button>
                </Input.Group>
            </Descriptions.Item>
            <Descriptions.Item label="Server URL">
                <Input defaultValue="https://" />
            </Descriptions.Item>
            <Descriptions.Item label="Resource Type">
                <Input defaultValue="Patient" />
            </Descriptions.Item>
            <Descriptions.Item label="ID">
                <Input />
            </Descriptions.Item>
            <Descriptions.Item label="Token">
                <Input />
            </Descriptions.Item>
            <Descriptions.Item label="Sort By">
                <SortBySelect />
            </Descriptions.Item>
            <Descriptions.Item label="Page Count">
                <Slider defaultValue={20} min={5} max={200} step={5} />
            </Descriptions.Item>
        </Descriptions>
    )
}

export default QueryUI
