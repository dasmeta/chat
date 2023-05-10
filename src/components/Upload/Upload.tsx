import React, { ReactNode, useState } from 'react';
import { message, Upload, Spin } from 'antd';
import './Upload.less';

export type uploadType = {
  children?: ReactNode;
  folderName: string;
  onUpload: (item: any) => Promise<any>;
  handleSuccess?: (file: File, item: any) => void;
  handleError?: (error: any) => void;
  disabled?: boolean;
};

const TUpload: React.FC<uploadType> = ({
  children,
  folderName = 'fileUpload',
  onUpload,
  handleSuccess = (file: File, item: any) => {
    console.log(file, '< ITEM');
  },
  handleError = (err) => {
    message.error(err.message);
  },
  disabled,
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = (data) => {
    const { file, fileList } = data;

    setLoading(true);
    const uploadData = {
      fileList,
      file,
      folder: folderName,
      type: file.type.split('/').pop(),
      filename: 'file',
    };
    onUpload(uploadData)
      .then((item) => {
        const url = item.url || item.path;
        handleSuccess(file, item);
        setLoading(false);
      })
      .catch((err) => {
        handleError(err);
        setLoading(false);
      });
  };

  const uploadProps = {
    multiple: false,
    showUploadList: false,
    headers: {
      'X-Requested-With': null,
    },
    withCredentials: true,
    customRequest: handleUpload,
    // onChange: handleUpload,
  };

  return (
    <div
      className={[
        't-upload-container',
        disabled ? 't-upload-disabled' : '',
      ].join(' ')}
    >
      <Upload disabled={disabled || loading} {...uploadProps}>
        {loading ? <Spin size="default" spinning /> : children}
      </Upload>
    </div>
  );
};

export default TUpload;
