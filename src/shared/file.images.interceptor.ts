import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const ImagesFilesInterceptor = FileInterceptor('file', {
  storage: diskStorage({
    destination: './public/images',
    filename: (req, file, callback) => {
      const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
      callback(null, uniqueName);
    },
  }),
});

export const CoursesCreateFilesFieldsInterceptor = FileFieldsInterceptor(
  [
    { name: 'cardLogoUrl', maxCount: 1 },
    { name: 'cardBgUrl', maxCount: 1 },
  ],
  {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, callback) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueName);
      },
    }),
  },
);

export const AddAudioFileInterceptor = FileFieldsInterceptor(
  [
    { name: 'audio', maxCount: 1 }, // Аудиофайл
  ],
  {
    storage: diskStorage({
      destination: './public/audio', // Папка для аудиофайлов
      filename: (req, file, callback) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueName);
      },
    }),
  },
);
