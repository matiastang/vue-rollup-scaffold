import { Maybe, Exact, OrderTypeEnum, OrderStstusEnum, PayStatusEnum, Invoic } from '@/@types'

export declare namespace Order {
    export type AsObject = {
        orderId?: Number
        orderSn?: Maybe<String>
        userId?: Number
        OrderType?: OrderTypeEnum
        orderStatus?: OrderStstusEnum
        payStatus?: PayStatusEnum
        payId?: Maybe<Number>
        payName?: Maybe<String>
        orderAmount?: Maybe<Number>
        goodsAmount?: Maybe<Number>
        discountAmount?: Maybe<Number>
        payFee?: Maybe<Number>
        invId?: Maybe<Number>
        addressId?: Maybe<Number>
        payVoucher?: Maybe<String>
        postscript?: Maybe<String>
        toBuyer?: Maybe<String>
        channel?: Maybe<String>
        addTime?: Maybe<String>
        confirmTime?: Maybe<String>
        payTime?: Maybe<String>
        finishTime?: Maybe<String>
        modifyTime?: Maybe<String>
        beginTime?: Maybe<String>
        beginTime?: Maybe<String>
    }
    export type QueryList = {
        beginTime?: Maybe<String>
        endTime?: Maybe<String>
        orderSn?: Maybe<String>
        orderStatus?: Maybe<OrderStstusEnum>
        payId?: Maybe<Number>
        PayStatus?: Maybe<PayStatusEnum>
        userName?: Maybe<String>
        pageNum?: Maybe<String>
        pageSize?: Maybe<String>
    }
    export type OrderResponse = {
        total?: Maybe<Number>
        rows?: Array<Maybe<AsObject>>
    }
    export type CancelQuery = {
        orderId?: Maybe<Number>
    }
}
export type Pagination = {
    page: Maybe<number>
    limit: Maybe<number>
}
