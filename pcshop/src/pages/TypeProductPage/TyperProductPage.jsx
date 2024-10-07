import React, { Fragment } from 'react'
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Row, Pagination, Col } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'

const TyperProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{ width: '100%', backgroundColor: '#efefef' }}>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', }}>
                    <WrapperNavbar span={4} >
                        <NavBarComponent />
                    </WrapperNavbar>
                    <Col span={20}>
                        <WrapperProducts>
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                            <CardComponent />
                        </WrapperProducts>
                        <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{ textAlign: 'center', justifyContent: 'center', paddingTop: '10px' }} />
                    </Col>
                </Row>
            </div>
        </div>

    )
}

export default TyperProductPage