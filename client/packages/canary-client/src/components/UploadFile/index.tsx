import React, { useRef } from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import { Text, Label, Link, useField } from 'bonde-components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Image from './Image';
import UploadImageIcon from './UploadImageIcon';

const UploadField = styled.div`
  display: flex;
  padding: 0 0 24px;

  button {
    margin-right: 30px;
    
    &:focus {
      outline: none;
      border: none;
    }
  }

  input[type='file'] {
    display: none;
  }

  .detail > * {
    margin: 10px 0;
  }
`

type Props = {
  label?: string;
  name: string;
};

const Upload = ({ label, name }: Props) => {
  const uploadInput: any = useRef(null);
  // const [image, setImage] = useState<string>('');
  const { input } = useField(name);
  const { t } = useTranslation('app');

  const onProgress = (args: any) => {
    console.log('onProgress', { args });
  }
  const onError = (args: any) => {
    console.log('onError', { args });
  }
  const onFinish = ({ signedUrl }: any) => {
    const imageUrl: string = signedUrl.substring(0, signedUrl.indexOf('?'));
    console.log('onFinish', { imageUrl });
    input.onChange(imageUrl);
  }

  const handleClick = (event: any) => {
    event?.preventDefault();
    uploadInput?.current.click();
  }

  return (
    <UploadField>
      <button onClick={handleClick} title={t('upload.button')}>
        {input.value
          ? <Image src={input.value} alt={label} />
          : <UploadImageIcon />
        }
      </button>
      <div className='detail'>
        {label && <Label>{label}</Label>}
        <Text>{t('upload.information')}</Text>
        <ReactS3Uploader
          signingUrl={process.env.REACT_APP_UPLOADS_URL}
          accept="image/*"
          onProgress={onProgress}
          onError={onError}
          onFinish={onFinish}
          inputRef={uploadInput}
          style={{ display: 'none' }}
        />
        {input.value && (
          <Link component='button' type='button' onClick={() => input.onChange(null)}>
            Remover
          </Link>
        )}
      </div>
    </UploadField>
  );
}

export default Upload;