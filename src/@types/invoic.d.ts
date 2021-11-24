import { Maybe, Exact, InvTypeEnum, InvStatusEnum } from '@/@types'

export declare namespace Invoic {
    export type AsObject = {
        invId?: Maybe<number>
        userId?: Maybe<number>
        invFrom?: Maybe<string>
        targetid?: Maybe<number>
        target?: Maybe<string>
        invType?: Maybe<InvTypeEnum>
        invNo?: Maybe<string>
        invPayee?: Maybe<string>
        invContent?: Maybe<string>
        invPayeeNumber?: Maybe<number>
        companyAddress?: Maybe<string>
        tel?: Maybe<number>
        blank?: Maybe<string>
        blankNo?: Maybe<string>
        tax?: Maybe<string>
        addressId?: Maybe<string>
        invoiceInfo?: Maybe<string>
        isPaper?: Maybe<string>
        status?: Maybe<InvStatusEnum>
        applyTime?: Maybe<string>
        addTime?: Maybe<string>
    }
    // 新增发票信息
    export type AddQuery = {
        address?: Maybe<string>
        // 收货地址
        bank?: Maybe<string>
        // 开户行
        bankNo?: Maybe<string>
        // 银行账号
        companyAddress?: Maybe<string>
        // 公司地址
        consignee?: Maybe<string>
        // 收货人
        contact?: Maybe<string>
        // 联系方式
        invContent?: Maybe<string>
        // 发票内容
        invId?: Maybe<number>
        // 发票id
        invPayee?: Maybe<string>
        // 发票抬头
        invPayeeNumber?: Maybe<string>
        // 纳税人识别号
        invType?: Maybe<InvTypeEnum>
        // 发票类型1：增值税普通发票2：增值税专用发票3：电子发票
        orderSn?: Maybe<string>
        // 开票订单编号：多个","分隔
        tel?: Maybe<string>
        // 电话
        zipcode?: Maybe<string>
        // 邮编
    }
}
