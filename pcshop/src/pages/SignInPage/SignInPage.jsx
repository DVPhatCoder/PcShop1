import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrappTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image, } from 'antd'
import imageLogo from '../../assets/images/loginin.png'
import {
    EyeOutlined,
    EyeInvisibleOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserServices from '../../services/UserServices'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as Message from '../../components/Message/Message'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/useSlide'

const SignInPage = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const mutation = useMutationHooks(
        data => UserServices.loginUser(data)
    )
    const { data, isPending, isSuccess, isError } = mutation

    const handleSignIn = () => {
        mutation.mutate({ email, password })
    }
    const [isShowPassword, setIsShowPassword] = useState(false)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (isSuccess && data?.status !== 'Lỗi') {
            navigate(location?.state || '/');
            Message.success();
            localStorage.setItem('access_token', JSON.stringify(data?.access_token));
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token);
                }
            }
        } else if (isError) {
            Message.error();
        }
    }, [isSuccess, isError, data, navigate, location]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserServices.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }
    return (
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', background: '#ccc', height: '100vh' }}>
            <div style={{ width: '800px', height: '443px', borderRadius: '10px', backgroundColor: '#fff', display: 'flex', margin: 'auto' }}>
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
                        <InputForm placeholder="Mật Khẩu" type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnchangePassword} />
                    </div>
                    {data?.status === 'Lỗi' && <span style={{ color: 'red', fontSize: '10px', textAlign: 'center' }}> {data?.message}</span>}
                    <Loading isPending={isPending}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            size={40}
                            styleButton={{
                                background: 'rgb( 255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px',


                            }}
                            textButton={'Đăng Nhập'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700', }}

                        ></ButtonComponent>
                    </Loading>
                    <p> <WrappTextLight>Quên mật khẩu ?</WrappTextLight></p>
                    <p> Chưa có tài khoản? <WrappTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrappTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight style={{}} >
                    <Image src={imageLogo} preview={false} alt="imageLogo" height="203px" width="203px" />
                    <h4>Mua sắm tại PC Shop</h4>
                </WrapperContainerRight>
            </div>
        </div >
    )
}

export default SignInPage