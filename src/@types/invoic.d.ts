import { Maybe, Exact, InvTypeEnum, InvStatusEnum } from '@/@types'

export declare namespace Invoic {
    export type AsObject = {
        invId?: Maybe<Number>
        userId?: Maybe<Number>
        invFrom?: Maybe<String>
        targetid?: Maybe<Number>
        target?: Maybe<String>
        invType?: Maybe<InvTypeEnum>
        invNo?: Maybe<String>
        invPayee?: Maybe<String>
        invContent?: Maybe<String>
        invPayeeNumber?: Maybe<Number>
        companyAddress?: Maybe<String>
        tel?: Maybe<Number>
        blank?: Maybe<String>
        blankNo?: Maybe<String>
        tax?: Maybe<String>
        addressId?: Maybe<String>
        invoiceInfo?: Maybe<String>
        isPaper?: Maybe<String>
        status?: Maybe<InvStatusEnum>
        applyTime?: Maybe<String>
        addTime?: Maybe<String>
    }
}
