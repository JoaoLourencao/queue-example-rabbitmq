import { Button, Col, Form, Rate, Row } from 'antd';
import { useState } from 'react';
import PaymentModal from './components/PaymentModal';

const LandingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-gray-100 h-screen w-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 m-10 lg:m-52">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={10} className='content-center'>
            <div className='flex justify-center items-center'>
              <img
                src="https://m.media-amazon.com/images/I/51mtlUsJ3rL._AC_SX522_.jpg"
                alt="Product"
              />
            </div>
          </Col>

          <Col xs={24} md={14}>
            <div className="p-4">
              <h1 className="text-lg lg:text-xl font-bold mb-2 text-gray-700">Galaxy Book2 Intel® Core™ i5-1235U, Windows 11 Home, 8GB, 256GB SSD, Intel Iris Xe, 15.6'' Full HD LED, 1.81kg*.</h1>
              <p className="text-xl text-gray-700 mb-2">$299.99</p>
              <Rate allowHalf defaultValue={4.5} />
              <p className="mt-2 text-gray-500">
                This is an amazing product that will help you in many situations. Made with high-quality materials and guaranteed satisfaction.
              </p>
              <Button type="primary" className="mt-6 w-full" onClick={showModal}>
                Buy Now
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <PaymentModal
        form={form}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default LandingPage;
