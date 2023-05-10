import React from 'react';
import { Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import '../TextInput/TextInput.less';


export type FormProps = {
  className?: string;
  form?: FormInstance;
  children?: React.ReactNode;
  onSuccess?: (values: { [key: string]: any }) => void;
  onError?: ({
    values,
    errorFields,
    outOfDate,
  }: {
    values?: any;
    errorFields?: any;
    outOfDate?: any;
  }) => void;
};

const TForm: React.FC<FormProps> = ({ onSuccess, onError, ...props }) => {
  return (
    <Form onFinish={onSuccess} onFinishFailed={onError} {...props}>
      {props.children}
    </Form>
  );
};

export default TForm;
