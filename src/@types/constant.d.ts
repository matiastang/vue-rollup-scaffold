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
