import React from 'react';
import { Layout, Row, Col } from 'antd';
import { FacebookFilled, InstagramFilled, TwitchFilled } from '@ant-design/icons';
const { Footer } = Layout;

const FooterComponent = () => {
    return (
        <Footer style={{ backgroundColor: '#001529', color: '#fff', padding: '20px 50px', height: '214px' }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <h3 style={{ color: '#fff' }}>PC Shop</h3>
                    <p>Cung cấp các sản phẩm máy tính và laptop chính hãng.</p>
                    <p>Email: dinosarus2002@gmail.com</p>
                    <p>Hotline: 1900 1234</p>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <h3 style={{ color: '#fff' }}>Thông Tin</h3>
                    <ul style={{ listStyle: 'none', padding: 0, lineHeight: '28px' }}>
                        <li><a href="/about" style={{ color: '#ccc', textDecoration: 'none' }}>Giới thiệu</a></li>
                        <li><a href="/policy" style={{ color: '#ccc', textDecoration: 'none' }}>Chính sách</a></li>
                        <li><a href="/contact" style={{ color: '#ccc', textDecoration: 'none' }}>Liên hệ</a></li>
                    </ul>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <h3 style={{ color: '#fff' }}>Kết Nối Với Chúng Tôi</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <a href="https://www.facebook.com/dinosaurscute?locale=vi_VN" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc' }}>
                            <FacebookFilled /> Facebook
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc' }}>
                            <InstagramFilled /> Instagram
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc' }}>
                            <TwitchFilled /> Twitter
                        </a>
                    </div>
                </Col>
            </Row>
            <div style={{ textAlign: 'center', marginTop: '20px', color: '#ccc' }}>
                © 2024 PC Shop. All rights reserved.
            </div>
        </Footer>
    );
};

export default FooterComponent;
