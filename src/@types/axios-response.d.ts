import { AxiosResponse, AxiosError } from 'axios'
import { Maybe, Exact } from '@/@types'

export declare namespace Response {
    export type AxiosResponse = typeof AxiosResponse
    export type AxiosError = typeof AxiosError
    export type data = {
        data: Maybe<AxiosResponse.data.Exact<T>>
        code: Maybe<Number>
        msg: Maybe<String>
    }
}
