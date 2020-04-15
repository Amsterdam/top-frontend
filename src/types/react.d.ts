declare type SetState = Dispatch<SetStateAction<never[]>>
declare type Input = [string, OnChangeHandler, SetState]
declare type Inputs = Input[]

type Element = HTMLInputElement | HTMLTextAreaElement
declare type ChangeEventInput = ChangeEvent<Element>
declare type OnChangeHandler = (a: ChangeEventInput) => void

type Value = string | ReactNode
declare type KeyValueDetail = Value | [string, Value]
declare type KeyValueDetails = KeyValueDetail[]

declare type ClassName = string
