import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperLabel, WrapperInput, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useSelector } from 'react-redux'
import * as UserServices from '../../services/UserServices'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as Message from '../../components/Message/Message'
import { Button } from 'antd'
import {
    UploadOutlined

} from '@ant-design/icons';
import { getBase64 } from '../../util'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rest } = data
            UserServices.updateUser(id, rest, access_token)
        }
    )
    const { data, isPending, isSuccess, isError } = mutation
    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
        setCity(user?.city)
    }, [user])
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeCity = (value) => {
        setCity(value)
    }
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    }
    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, city, access_token: user?.access_token })
        if (isSuccess) {
            Message.success('Cập nhập thành công')
        } else if (isError) {
            Message.error('Lỗi cập nhập')
        }
    }

    return (
        <div style={{ width: '1270px', margin: '0 auto' }}>
            <WrapperHeader>Thông tin người dùng  </WrapperHeader>
            <Loading isPending={isPending}>
                <WrapperContentProfile style={{}}>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Name</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="name" value={name} placeholder="Nhập tên của bạn" onChange={handleOnchangeName} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: '60px',
                                border: '1 px solid rgb(26, 148, 255)',
                                borderRadius: '4px',
                            }}
                            textbutton={'Cập Nhập'}
                            styletextbutton={{ color: 'rgb(26, 148, 255)', fontSize: '12px', fontWeight: '600', }}

                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="email" value={email} placeholder="Nhập tên Email" onChange={handleOnchangeEmail} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: '60px',
                                border: '1 px solid rgb(26, 148, 255)',
                                borderRadius: '4px',
                            }}
                            textbutton={'Cập Nhập'}
                            styletextbutton={{ color: 'rgb(26, 148, 255)', fontSize: '12px', fontWeight: '600', }}

                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="phone" value={phone} placeholder="Nhập số điện thoại" onChange={handleOnchangePhone} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: '60px',
                                border: '1 px solid rgb(26, 148, 255)',
                                borderRadius: '4px',
                            }}
                            textbutton={'Cập Nhập'}
                            styletextbutton={{ color: 'rgb(26, 148, 255)', fontSize: '12px', fontWeight: '600', }}

                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Address</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="address" value={address} placeholder="Nhập địa chỉ" onChange={handleOnchangeAddress} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: '60px',
                                border: '1 px solid rgb(26, 148, 255)',
                                borderRadius: '4px',
                            }}
                            textbutton={'Cập Nhập'}
                            styletextbutton={{ color: 'rgb(26, 148, 255)', fontSize: '12px', fontWeight: '600', }}

                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="city">City</WrapperLabel>
                        <InputForm style={{ width: '300px' }} id="city" value={city} placeholder="Nhập thành phố" onChange={handleOnchangeCity} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: '60px',
                                border: '1 px solid rgb(26, 148, 255)',
                                borderRadius: '4px',
                            }}
                            textbutton={'Cập Nhập'}
                            styletextbutton={{ color: 'rgb(26, 148, 255)', fontSize: '12px', fontWeight: '600', }}

                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                            }} alt="avatar" />
                        )}
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: '60px',
                                border: '1 px solid rgb(26, 148, 255)',
                                borderRadius: '4px',
                            }}
                            textbutton={'Cập Nhập'}
                            styletextbutton={{ color: 'rgb(26, 148, 255)', fontSize: '12px', fontWeight: '600', }}
                        ></ButtonComponent>
                    </WrapperInput>

                </WrapperContentProfile>
            </Loading>

        </div>
    )
}

export default ProfilePage