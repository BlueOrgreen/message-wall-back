import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';
import validator from 'validator';

/**
 * 必须是"区域号.手机号"的形式
 *
 * @description 手机号验证规则
 * @export
 * @param {*} value
 * @param {validator.MobilePhoneLocale} [locale]
 * @param {validator.IsMobilePhoneOptions} [options]
 * @returns {*}  {boolean}
 */
export function isMatchPhone(
    value: any,
    locale?: validator.MobilePhoneLocale,
    options?: validator.IsMobilePhoneOptions,
): boolean {
    if (!value) return false;
    const phoneArr: string[] = value.split('.');
    if (phoneArr.length !== 2) return false;
    return validator.isMobilePhone(phoneArr.join(''), locale, options);
}

export function IsMatchPhone(
    locales?: validator.MobilePhoneLocale | validator.MobilePhoneLocale[],
    options?: validator.IsMobilePhoneOptions,
    validationOptions?: ValidationOptions,
) {
    return (object: Record<string, any>, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [locales || 'any', options],
            validator: {
                validate: (value: any, args: ValidationArguments): boolean =>
                    isMatchPhone(
                        value,
                        args.constraints[0],
                        args.constraints[1],
                    ),
                defaultMessage: (_args: ValidationArguments) =>
                    '$property must be a phone number,eg: +86.12345678901',
            },
        });
    };
}
