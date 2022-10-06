import { Modal } from 'antd'
import React, { useState } from 'react'
import ReactJson from 'react-json-view'
import { Table, Badge, Menu, Dropdown, Space, Row } from 'antd'
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const JSONModal = ({
    json,
    isModalOpen,
    openModal,
    closeModal,
}: {
    json: {} | []
    isModalOpen: boolean
    openModal: () => void
    closeModal: () => void
}) => {
    return (
        <Modal open={isModalOpen} onOk={closeModal} onCancel={closeModal} footer={null} width={1000}>
            <ReactJson src={json} />
            <DownloadJson json={json} />
        </Modal>
    )
}

const DownloadJson = ({ json }: { json: {} | [] }) => {
    const [size, setSize] = useState<SizeType>('large');

    const onClick = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(json, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";

        link.click();
    }

    return (
        <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={() => onClick()} size={size} >
            Download JSON
        </Button >
    )
}

export default JSONModal
