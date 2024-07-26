import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidateExeption } from "src/exeptions/validation.exeption";

@Injectable()
export class Validation implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);
        

        if(errors.length) {
            console.log(errors)
            let messages = errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })

            throw new ValidateExeption(messages);
        }
        return value;
    }
    
}