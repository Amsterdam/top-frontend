declare type ClassName = string

declare type SetState = Dispatch<SetStateAction<never[]>>
declare type Input = [string, OnChangeHandler, SetState]
declare type Inputs = Input[]

type Element = HTMLInputElement | HTMLTextAreaElement
declare type ChangeEventInput = ChangeEvent<Element>
declare type OnChangeHandler = (a: ChangeEventInput) => void
declare type OnChangeHandlerHOF = (option: string) => OnChangeHandler

type Value = string | ReactNode
declare type KeyValueDetail = Value | [string, Value]
declare type KeyValueDetails = KeyValueDetail[]
