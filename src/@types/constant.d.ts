export type Maybe<T> = T | null

export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}

export enum OrderTypeEnum {
    ORDER_RECHARGE = 1,
    ORDER_PACKAGE = 2,
}

export enum OrderStstusEnum {
    ORDER_NOT_CONFIRM = 0,
    ORDER_CONFIRM = 1,
    ORDER_CANCEL = 2,
    ORDER_INVAILD = 3,
    ORDER_RETURN = 4,
    ORDER_FINISH = 5,
    ORDER_DELETE = 6,
}
export enum PayStatusEnum {
    ORDER_UNPAID = 0,
    ORDER_PAYING = 1,
    ORDER_ALREADY_PAID = 2,
    ORDER_ALREADY_REFUND = 3,
    ORDER_DO_REFUND = 4,
    ORDER_REFUND_FAILD = 5,
    ORDER_ALREADY_CANCEL = 6,
    ORDER_SOME_REFUND = 7,
}
//发票类型1：增值税普通发票\r\n2：增值税专用发票 3 电子发票
export enum InvTypeEnum {
    NORMAL_INV = 1,
    SPECIAL_INV = 2,
    ELECTRONIC_INV = 3,
}
// 发票状态0：待开发票\r\n1：已开发票
export enum InvStatusEnum {
    READY = 0,
    ALREADY = 1,
}
