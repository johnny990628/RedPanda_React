import { Modal } from 'antd'
import React, { useState } from 'react'
import ReactJson from 'react-json-view'

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
        </Modal>
    )
}

export default JSONModal
