"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerCreateCourseDto = exports.FilesOnCreateCourseDto = exports.CreateCourseDto = exports.AuidioDataDto = exports.FindOneCourseParams = exports.CourseTypes = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var CourseTypes;
(function (CourseTypes) {
    CourseTypes["\u041A\u0423\u0420\u0421"] = "\u041A\u0423\u0420\u0421";
    CourseTypes["\u041C\u0415\u0414\u0418\u0422\u0410\u0426\u0418\u042F"] = "\u041C\u0415\u0414\u0418\u0422\u0410\u0426\u0418\u042F";
})(CourseTypes || (exports.CourseTypes = CourseTypes = {}));
class FindOneCourseParams {
}
exports.FindOneCourseParams = FindOneCourseParams;
__decorate([
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], FindOneCourseParams.prototype, "courseId", void 0);
class AuidioDataDto {
}
exports.AuidioDataDto = AuidioDataDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(30),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuidioDataDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AuidioDataDto.prototype, "duration", void 0);
class CreateCourseDto {
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CourseTypes),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "timeFrom", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "timeTo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(7, 7),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "cardLogoBgColor", void 0);
class FilesOnCreateCourseDto {
}
exports.FilesOnCreateCourseDto = FilesOnCreateCourseDto;
class SwaggerCreateCourseDto extends (0, swagger_1.PartialType)(CreateCourseDto) {
}
exports.SwaggerCreateCourseDto = SwaggerCreateCourseDto;
//# sourceMappingURL=courses.dto.js.map