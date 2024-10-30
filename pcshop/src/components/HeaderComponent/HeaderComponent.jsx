import { Badge, Col, Flex, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup, } from './style'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserServices from '../../services/UserServices'
import { resetUser } from '../../redux/slides/useSlide'
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from '../../redux/slides/productSlide';

export const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const [search, setSearch] = useState('')
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const handleLogOut = async () => {
        setLoading(true);
        await UserServices.logOutUser();
        localStorage.removeItem('access_token');
        dispatch(resetUser());
        navigate('/');
        setLoading(false);
    };
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // Nếu có token, set thông tin người dùng từ Redux hoặc API
            setUserName(user?.name);
            setUserAvatar(user?.avatar);
        } else {
            // Nếu không có token, reset thông tin người dùng
            setUserName(' ');
            setUserAvatar(' ');
            dispatch(resetUser());  // Đảm bảo Redux state cũng được reset
        }
        setLoading(false);
    }, [user?.name, user?.avatar, dispatch]);

    const content = (
        <div>

            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={handleLogOut}>Đăng xuất</WrapperContentPopup>
        </div>
    );
    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value));
    }
    return (
        <div style={{ width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center', }}>
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <WrapperTextHeader onClick={() => navigate('/')}> PCSHOP </WrapperTextHeader >
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size="large"
                            textButton="Tìm Kiếm"
                            placeholder="Tìm Kiếm"
                            onChange={onSearch}
                        />
                    </Col>
                )}

                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center', }}>
                    <Loading isPending={loading}>
                        <WrapperHeaderAccount>
                            {user?.access_token ? (
                                <>
                                    <img src={userAvatar} alt='avatar' style={{
                                        height: '40px',
                                        width: '40px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                    }} />
                                    <Flex>
                                        <Popover content={content}>
                                            <div style={{ cursor: 'pointer', padding: '0 5px', }}>{userName?.length ? userName : user?.email}</div>
                                        </Popover>
                                    </Flex>
                                </>
                            ) : (
                                <>
                                    <UserOutlined style={{ fontSize: '30px' }} />
                                    <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                        <span>Đăng Nhập/Đăng Ký</span>
                                        <div>
                                            <span>Tài Khoản</span>
                                            <CaretDownOutlined />
                                        </div>
                                    </div>
                                </>
                            )}
                        </WrapperHeaderAccount>
                    </Loading>
                    {!isHiddenCart && (
                        <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                            <Badge count={4} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall> Giỏ Hàng </WrapperTextHeaderSmall>
                        </div>
                    )}

                </Col>
            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent