import { Dispatch, SetStateAction } from "react";

export interface FetchDataProps<T> {
  url: string;
  setState: Dispatch<SetStateAction<T>>;
  error_feedback: string;
}

export interface FormData {
  name: string;
  bid: number;
  fund: number;
  status: string;
  radius: number;
  city: string;
  keyword: string;
  productId: number | string;
}

export interface Field {
  label: string;
  name: keyof FormData;
  type: string;
}
