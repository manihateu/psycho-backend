"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAudioFileInterceptor = exports.CoursesCreateFilesFieldsInterceptor = exports.ImagesFilesInterceptor = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
exports.ImagesFilesInterceptor = (0, platform_express_1.FileInterceptor)('file', {
    storage: (0, multer_1.diskStorage)({
        destination: './public/images',
        filename: (req, file, callback) => {
            const uniqueName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
            callback(null, uniqueName);
        },
    }),
});
exports.CoursesCreateFilesFieldsInterceptor = (0, platform_express_1.FileFieldsInterceptor)([
    { name: 'cardLogoUrl', maxCount: 1 },
    { name: 'cardBgUrl', maxCount: 1 },
], {
    storage: (0, multer_1.diskStorage)({
        destination: './public/images',
        filename: (req, file, callback) => {
            const uniqueName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
            callback(null, uniqueName);
        },
    }),
});
exports.AddAudioFileInterceptor = (0, platform_express_1.FileFieldsInterceptor)([
    { name: 'audio', maxCount: 1 },
], {
    storage: (0, multer_1.diskStorage)({
        destination: './public/audio',
        filename: (req, file, callback) => {
            const uniqueName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
            callback(null, uniqueName);
        },
    }),
});
//# sourceMappingURL=file.images.interceptor.js.map