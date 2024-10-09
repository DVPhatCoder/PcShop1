import { Modal } from 'antd';
import React from 'react';

export const ModalComponent = ({ title = "title", isOpen = false, children, ...rests }) => {
    return (
        <Modal title={title} open={isOpen} {...rests}>
            {children}
        </Modal>
    );
}
