import { ClassSerializerInterceptor, PlainLiteralObject } from '@nestjs/common';
// StreamableFile
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
// import { isArray, isNil, isObject } from 'lodash';

// 默认的序列化拦截器是无法对分页数据进行处理的,
// 所以自定义的全局序列化拦截器类重写serialize方法,
// 以便对分页数据进行拦截并序列化
/**
 * 全局拦截器,用于序列化数据
 */
export class AppIntercepter extends ClassSerializerInterceptor {
    serialize(
        response: PlainLiteralObject | Array<PlainLiteralObject>,
        options: ClassTransformOptions,
    ): PlainLiteralObject | PlainLiteralObject[] {
        return response;
        // if ((!isObject(response) && !isArray(response)) || response instanceof StreamableFile) {
        //     return response;
        // }

        // // 如果是响应数据是数组,则遍历对每一项进行序列化
        // if (isArray(response)) {
        //     return (response as PlainLiteralObject[]).map((item) =>
        //         !isObject(item) ? item : this.transformToPlain(item, options),
        //     );
        // }
        // // 如果是分页数据,则对items中的每一项进行序列化
        // if ('meta' in response && 'items' in response) {
        //     const items = !isNil(response.items) && isArray(response.items) ? response.items : [];
        //     return {
        //         ...response,
        //         items: (items as PlainLiteralObject[]).map((item) => {
        //             return !isObject(item) ? item : this.transformToPlain(item, options);
        //         }),
        //     };
        // }
        // // 如果响应是个对象则直接序列化
        // return this.transformToPlain(response, options);
    }
}
