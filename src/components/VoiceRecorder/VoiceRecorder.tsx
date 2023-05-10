import React from 'react';
import MediaRecorder from 'audio-recorder-polyfill';
import IconVoice from '../Icons/IconVoice';
import './VoiceRecorder.less';
import { message } from 'antd';

export type VoiceRecorder = {
  folderName: string;
  size?: 'sm' | 'md' | 'lg' | 'xxs' | 'xl' | 'xs';
  onUpload: (item: any) => Promise<any>;
  handleSuccess?: (file: File, item: any) => void;
  handleError?: (error: any) => void;
  disabled?: boolean;
};

const TVoiceRecorder: React.FC<VoiceRecorder> = ({
  folderName = 'voiceRecorder',
  size,
  onUpload,
  handleSuccess = (file: File, item: any) => {
    console.log(file, '< ITEM');
  },
  handleError = (err) => {
    console.log(err, '< ERROR');
    message.error(err.message);
  },
  disabled,
}) => {
  const [recording, setRecording] = React.useState(false);
  const recorder = React.useRef(null as any);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      recorder.current = new MediaRecorder(stream);
      recorder.current.start();
      recorder.current.addEventListener('dataavailable', (item) =>
        saveRecord(item),
      );
    });
    setRecording(true);
  };

  const saveRecord = (e) => {
    const file = new File([e.data], 'file', {
      type: e.data.type,
      lastModified: Date.now(),
    });

    const uploadOptions = {
      fileList: [file],
      file,
      folder: folderName,
      type: file.type.split('/').pop(),
      filename: file.name,
      headers: {
        'X-Requested-With': null,
      },
      withCredentials: true,
    };

    onUpload(uploadOptions)
      .then((item) => {
        handleSuccess(file, item);
      })
      .catch((err) => handleError(err));
  };

  const stopRecording = () => {
    if (!recorder.current) {
      setRecording(false);
      return null;
    }
    recorder.current.stop();
    const [track] = recorder.current.stream.getTracks();
    if (!track) {
      setRecording(false);
      return null;
    }
    track.stop();
    setRecording(false);
  };

  return (
    <div
      className={[
        't-voice-recorder-container',
        disabled ? 't-voice-recorder-disabled' : '',
      ].join(' ')}
    >
      <div
        className={[
          't-voice-recorder-wrapper',
          MediaRecorder.notSupported
            ? 'disabled'
            : recording
            ? 'active'
            : 'stopped',
        ].join(' ')}
      >
        <IconVoice
          size={size}
          onClick={() =>
            !disabled && (recording ? stopRecording() : startRecording())
          }
        />
      </div>
    </div>
  );
};

export default TVoiceRecorder;
