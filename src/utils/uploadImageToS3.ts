import axios from 'axios';
import { API_BASE_URL } from '../config';

const bucketName = 'ktb-test';
const AWSBucketDomain =
  'https://' + bucketName + '.s3.ap-northeast-2.amazonaws.com/';

const getPresignedUrl = async (fileName: string): Promise<string> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/aws/pre-signed-url/${fileName}`,
    );
    return response.data;
  } catch (error) {
    console.error(
      'preSigned URL을 발급하는 과정에서 오류가 발생했습니다. ',
      error,
    );
    throw error;
  }
};

const uploadToS3 = async (
  presignedUrl: string,
  file: File,
): Promise<boolean> => {
  try {
    const response = await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error(
      '파일을 S3에 업로드하는 과정에서 오류가 발생했습니다. ',
      error,
    );
    throw error;
  }
};

export const uploadImageToS3 = async (file: File): Promise<string | null> => {
  try {
    const fileName = file.name;
    const presignedUrl = await getPresignedUrl(fileName);
    const success = await uploadToS3(presignedUrl, file);
    if (success) {
      return `${AWSBucketDomain}${fileName}`;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
