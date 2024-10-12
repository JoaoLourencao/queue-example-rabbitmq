import { Button, Form, Input, Modal, notification } from "antd";
import MaskedInput from "antd-mask-input";
import axios from "axios";
import { useState } from "react";

type CardForm = {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  amount: number;
}

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  handleCancel: () => void;
  form: any;
};

export default function PaymentModal({
  isModalVisible,
  setIsModalVisible,
  handleCancel,
  form,
}: Props) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: CardForm) => {
    setLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_API_BASE_URL + '/pay', values);

      notification.success({
        message: 'Payment Sent',
        description: response.data.message,
      });
      form.resetFields();
    } catch (error) {
      notification.error({ message: 'Error sending payment. Please try again.' });
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <Modal title="Complete Purchase" open={isModalVisible} onCancel={handleCancel} footer={null}>
      <Form onFinish={onSubmit} form={form} layout="vertical">
        <Form.Item
          name="cardHolderName"
          label="Cardholder Name"
          rules={[{ required: true, message: 'Please enter the cardholder name' }]}
        >
          <Input disabled={loading} />
        </Form.Item>
        <Form.Item
          name="cardNumber"
          label="Card Number"
          rules={[{ required: true, message: 'Please enter the card number' }]}
        >
          <MaskedInput
            disabled={loading}
            mask={
              '0000 0000 0000 0000'
            }
          />
        </Form.Item>
        <Form.Item
          name="expiryDate"
          label="Expiration Date (MM/YY)"
          rules={[{ required: true, message: 'Please enter the expiration date' }]}
        >
          <MaskedInput
            disabled={loading}
            mask={
              '00/00'
            }
          />
        </Form.Item>
        <Form.Item
          name="cvv"
          label="CVV"
          rules={[{ required: true, message: 'Please enter the CVV' }]}
        >
          <MaskedInput
            disabled={loading}
            mask={
              '000'
            }
          />
        </Form.Item>
        <Form.Item name="amount" label="Purchase Amount" initialValue={299.99}>
          <Input type="number" disabled />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? 'Processing...' : 'Process Payment'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
};
