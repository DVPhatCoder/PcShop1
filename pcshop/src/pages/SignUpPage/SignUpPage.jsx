import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrappTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/loginin.png'
import { Image } from 'antd'
import * as UserServices from '../../services/UserServices'
import {
    EyeOutlined,
    EyeInvisibleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as Message from '../../components/Message/Message'

const SignUpPage = () => {
    const mutation = useMutationHooks(
        data => UserServices.signUpUser(data)
    )
    const { data, isPending, isSuccess, isError } = mutation
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowconfirmPassword, setIsShowconfirmPassword] = useState(false)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    useEffect(() => {
        if (isSuccess) {
            Message.success('Tạo tài khoản thành công');  // Hiển thị thông báo thành công
            handleNavigateLogin();
        } else if (isError) {
            Message.error('lỗi tạo tài khoản!');  // Hiển thị thông báo lỗi
        }
    }, [isSuccess, isError]);
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }
    const handleOnchangeconfirmPassword = (value) => {
        setconfirmPassword(value)
    }
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleSignUp = () => {
        mutation.mutate({ email, password, confirmPassword })
    }
    return (
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', background: '#ccc', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex', margin: 'auto' }}>
                <WrapperContainerLeft >
                    <h1>Xin Chào</h1>
                    <p>Đăng Nhập Và Tạo Tài Khoản</p>
                    <InputForm style={{ margin: '0 0 10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{ zIndex: 10, position: 'absolute', fontSize: '16px', top: '7px', right: '8px' }}
                        >
                            {
                                isShowPassword ? (
                                    <EyeOutlined />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                        </span>
                        <InputForm placeholder="Mật Khẩu" style={{ margin: '0 0 10px' }} type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnchangePassword} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowconfirmPassword(!isShowconfirmPassword)}
                            style={{ zIndex: 10, position: 'absolute', fontSize: '16px', top: '7px', right: '8px' }}
                        >
                            {
                                isShowconfirmPassword ? (
                                    <EyeOutlined />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                        </span>
                        <InputForm placeholder="Xác nhận lại mật khẩu" style={{ margin: '0 0 10px' }} type={isShowconfirmPassword ? "text" : "password"} value={confirmPassword} onChange={handleOnchangeconfirmPassword} />
                    </div>
                    {data?.status === 'Lỗi' && <span style={{ color: 'red', fontSize: '10px', textAlign: 'center' }}> {data?.message}</span>}
                    <Loading isPending={isPending}>
                        <ButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length}
                            onClick={handleSignUp}

                            size={40}
                            styleButton={{
                                background: 'rgb( 255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px',


                            }}
                            textButton={'Đăng Ký'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700', }}
                        ></ButtonComponent>
                    </Loading>
                    <p> Bạn đã có tài khoản? <WrappTextLight onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>Đăng Nhập</WrappTextLight></p>
                </WrapperContainerLeft>

                <WrapperContainerRight style={{}} >
                    <Image src={imageLogo} preview={false} alt="imageLogo" height="203px" width="203px" />
                    <h4>Mua sắm tại PC Shop</h4>
                </WrapperContainerRight>
            </div>
        </div >
    )
}

export default SignUpPage