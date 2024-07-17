import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';


const { Header, Content, Footer } = Layout;

const items = [{key: String(1), label: <Link to='/'>Recipe book</Link>}, {key: String(2), label: <Link to='/recept-toevoegen'>Upload recipe</Link>}, {key: String(3), label: <Link to='/profiel'>Profile</Link>}]

const ContainerHeight = window.innerHeight - 64 - 64.5;
{/* 32 because two times the padding set in Canvas */}

const Canvas: React.FC = () => {

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          
        }}
      >
        <div className="demo-logo" />
        
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{ flex: 1, justifyContent: 'flex-end',minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '16px', height: ContainerHeight }}> {/* If padding changes, change ContainerHeight in Feed.tsx*/}
      <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} 
      </Footer>
    </Layout>
  );
};

export default Canvas;