import { Drawer } from 'antd';

export const DrawComponent = ({ title = 'Drawer', isOpen = false, children, ...rests }) => {


  return (
    <>
      <Drawer title={title} open={isOpen} {...rests}>
        {children}
      </Drawer>
    </>
  );
};
