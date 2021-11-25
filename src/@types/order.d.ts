import { Maybe, Exact, OrderTypeEnum, OrderStstusEnum, PayStatusEnum, Invoic } from '@/@types'

export declare namespace Order {
    export type AsObject = {
        orderId?: number
        orderSn?: Maybe<string>
        userId?: number
        OrderType?: OrderTypeEnum
        orderStatus?: OrderStstusEnum
        payStatus?: PayStatusEnum
        payId?: Maybe<number>
        payName?: Maybe<string>
        orderAmount?: Maybe<number>
        goodsAmount?: Maybe<number>
        discountAmount?: Maybe<number>
        payFee?: Maybe<number>
        invId?: Maybe<number>
        addressId?: Maybe<number>
        payVoucher?: Maybe<string>
        postscript?: Maybe<string>
        toBuyer?: Maybe<string>
        channel?: Maybe<string>
        addTime?: Maybe<string>
        confirmTime?: Maybe<string>
        payTime?: Maybe<string>
        finishTime?: Maybe<string>
        modifyTime?: Maybe<string>
        beginTime?: Maybe<string>
        beginTime?: Maybe<string>
    }
    export type QueryList = {
        beginTime?: Maybe<string>
        endTime?: Maybe<string>
        orderSn?: Maybe<string>
        orderStatus?: Maybe<OrderStstusEnum>
        payId?: Maybe<number>
        PayStatus?: Maybe<PayStatusEnum>
        userName?: Maybe<string>
        pageNum?: Maybe<number>
        pageSize?: Maybe<number>
    }
    export type OrderResponse = {
        total?: Maybe<number>
        rows?: Array<Maybe<AsObject>>
    }
    export type CancelQuery = {
        orderId?: Maybe<number>
    }
    export type Pagination = {
        page: Maybe<number>
        limit: Maybe<number>
    }
    export type Voucher = {
        orderId: Maybe<number>
        payVoucher: Maybe<string>
    }
}
